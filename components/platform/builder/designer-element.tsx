import { useParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { FormElement } from "./designer";
import ElementWraper from "./element-wraper";
import { DesignerSelect } from "./designer-select";
import { FormType } from "../create-form";
import { cn } from "@/lib/utils";

interface DesignerElementProps {
   element: FormElement;
   previewMode?: boolean;
}

export default function DesignerElement({
   element,
   previewMode,
}: DesignerElementProps) {
   const params = useParams();

   const [forms, setForms] = useLocalStorage<FormType[]>("forms", []);
   const currentForm = forms.find((form) => form.id === params.formId);

   function handleDelete() {
      if (currentForm) {
         const updatedElements = currentForm.elements.filter(
            //remove the deleted element
            (el) => el.id !== element.id
         );

         // Update the current form's elements
         const updatedForm = { ...currentForm, elements: updatedElements };

         // Update the forms array
         const updatedForms = forms.map((form) =>
            form.id === currentForm.id ? updatedForm : form
         );

         setForms(updatedForms);
      }
   }

   let elementToRender;

   if (element.type === "text" || element.type === "number") {
      elementToRender = (
         <ElementWraper
            id={element.id}
            label={element.label}
            type={element.type}
         >
            <Input
               placeholder={element.placeholder}
               required={element.required}
               type={element.type}
               aria-required={element.required}
            />
         </ElementWraper>
      );
   } else if (element.type === "checkbox") {
      elementToRender = (
         <ElementWraper
            id={element.id}
            label={element.label}
            type={element.type}
         >
            <Checkbox required={element.required} />
         </ElementWraper>
      );
   } else if (element.type === "date") {
      elementToRender = (
         <ElementWraper
            id={element.id}
            label={element.label}
            type={element.type}
         >
            <div>
               <DatePicker />
            </div>
         </ElementWraper>
      );
   } else if (element.type === "textarea") {
      elementToRender = (
         <ElementWraper
            id={element.id}
            label={element.label}
            type={element.type}
         >
            <Textarea
               placeholder={element.placeholder}
               required={element.required}
               aria-required={element.required}
            />
         </ElementWraper>
      );
   } else if (element.type === "select") {
      elementToRender = (
         <ElementWraper
            id={element.id}
            label={element.label}
            type={element.type}
         >
            <DesignerSelect
               label={element.label}
               placeholder={element.placeholder}
               options={element.options}
            />
         </ElementWraper>
      );
   } else {
      elementToRender = <p>Type not matched</p>;
   }

   return (
      <div className="p-5 relative">
         <div className={cn("pointer-events-none", previewMode && "pointer-events-auto" )}>{elementToRender}</div>
         {!previewMode && (
            <>
               <div className="absolute bg-slate-100 hover:bg-slate-200 opacity-35 rounded-sm w-full h-full z-10 top-0 right-0" />
               <Button
                  className="absolute rounded-s-none right-0 top-0 z-20"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={handleDelete}
               >
                  <CircleX className="w-4 h-4 text-muted-foreground" />
               </Button>
            </>
         )}
      </div>
   );
}
