import { Dispatch, SetStateAction } from "react";
import { Draggable } from "@hello-pangea/dnd";
import DesignerElement from "./designer-element";

interface DesignerProps {
   elements: FormElement[];
   setEditElement : Dispatch<SetStateAction<Record<string, any> | undefined>>;
 }

export interface FormElement {
   id: string;
   type: string;
   label: string;
   placeholder?: string;
   required?: boolean;
   options?: string[];
   [key: string]: string | boolean | undefined | string[]; // Additional properties
}

export default function Designer({ elements, setEditElement }: DesignerProps) {

   function handleClick(element : FormElement) {
      setEditElement(element);
   }


   return (
      <div className="w-full min-h-[100vh] md:w-[80%] mx-auto bg-white rounded-lg p-4 space-y-2">
         {elements.map((element, index) => (
            <Draggable draggableId={element.id} key={element.id} index={index}>
               {(provided) => (
                  <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     onClick={() => handleClick(element)}
                     
                  >
                     <DesignerElement element={element} />
                  </div>
               )}
            </Draggable>
         ))}
      </div>
   );
}
