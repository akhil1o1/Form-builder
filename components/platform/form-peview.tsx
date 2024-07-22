import { useParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import { FormType } from "./create-form";

import {
   Dialog,
   DialogHeader,
   DialogTitle,
   DialogContent,
   DialogDescription,
   DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import DesignerElement from "./builder/designer-element";

interface FormPreviewProps {
   isOpen: boolean;
   onClose: () => void;
}

export default function FormPreview({ isOpen, onClose }: FormPreviewProps) {
   const params = useParams();
   const [forms] = useLocalStorage<FormType[]>("forms", []);

   const currentForm = forms.find((form) => form.id === params.formId);

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-h-[90vh] overflow-y-auto">
            <form>
               <DialogHeader>
                  <DialogTitle>{currentForm?.name}</DialogTitle>
                  <DialogDescription>
                     {currentForm?.description}
                  </DialogDescription>
               </DialogHeader>
               <div className="w-full min-h-[100vh] space-y-2">
                  {currentForm?.elements.map((element) => (
                     <DesignerElement
                        key={element.id}
                        element={element}
                        previewMode={true}
                     />
                  ))}
               </div>
               <DialogFooter>
                  <Button type="submit" className="w-full" onClick={() => {}}>
                     Submit
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
