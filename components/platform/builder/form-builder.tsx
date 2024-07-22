import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";

import { FormType } from "../create-form";
import { FormElement } from "./designer";
import Designer from "./designer";
import FormElementsPane from "./form-elements-pane";


export default function FormBuilder() {
   const [forms, setForms] = useLocalStorage<FormType[]>("forms", []);
   const [editElement, setEditElement] = useState<Record<string, any>>();
   const params = useParams();

   const currentForm = forms.find((form) => form.id === params.formId);
   console.log(currentForm);

   if (!currentForm) {
      return notFound();
   }

   console.log("editElement", editElement);

   const onDragEnd = (result: DropResult) => {
      const { source, destination, draggableId } = result;
      console.log({ source, destination, draggableId });

      // Dropped outside the drop zone
      if (!destination) return;

      // Dropped in the same place
      if (
         source.droppableId === destination.droppableId &&
         source.index === destination.index
      ) {
         return;
      } else if (source.droppableId !== destination.droppableId) {
         // element dropped from elements pane to designer
         // Create a new element based on the draggableId
         const newElement: FormElement = {
            type: draggableId,
            id: nanoid(),
            label: `${draggableId} field`,
         };

         // Add the new element to the form
         const updatedElements = [...currentForm.elements];
         updatedElements.splice(destination.index, 0, newElement);

         const updatedForm = { ...currentForm, elements: updatedElements };

         const updatedForms = forms.map((form) =>
            form.id === currentForm.id ? updatedForm : form
         );

         setForms(updatedForms);
      } else if (
         source.droppableId === destination.droppableId &&
         source.droppableId === "form-drop-zone"
      ) {
         // Designer element rearranged
         const updatedElements = [...currentForm.elements];
         const [movedElement] = updatedElements.splice(source.index, 1);
         updatedElements.splice(destination.index, 0, movedElement);

         const updatedForm = { ...currentForm, elements: updatedElements };

         const updatedForms = forms.map((form) =>
            form.id === currentForm.id ? updatedForm : form
         );

         setForms(updatedForms);
      }
   };

   return (
      <>
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex min-h-[90vh] overflow-x-hidden">
               <Droppable
                  droppableId="form-drop-zone"
                  type="element"
                  direction="vertical"
               >
                  {(provided) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 py-5"
                     >
                        <Designer
                           elements={currentForm.elements}
                           setEditElement={setEditElement}
                        />
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
               <Droppable
                  droppableId="form-elements"
                  type="element"
                  direction="vertical"
               >
                  {(provided) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="w-80"
                     >
                        <FormElementsPane />
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </div>
         </DragDropContext>
      </>
   );
}
