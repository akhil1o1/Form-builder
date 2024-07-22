import { useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { nanoid } from "nanoid";

import {
   Dialog,
   DialogHeader,
   DialogTitle,
   DialogContent,
   DialogDescription,
   DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface CreateFormProps {
   isOpen: boolean;
   onClose: () => void;
}

export type FormType = {
   name : string,
   id : string,
   description : string,
   elements : any[]
}

export default function CreateForm({
   isOpen,
   onClose,
}: CreateFormProps) {
   const router = useRouter();
   const [forms, setForms] = useLocalStorage<FormType[]>("forms", []);
   const nameRef = useRef<ElementRef<"input">>(null);
   const descRef = useRef<ElementRef<"textarea">>(null);

   function handleClick() {
      const name = nameRef.current?.value;
      const description = descRef.current?.value;
      console.log(name, description);

      if (!name || !description) {
         return;
      }

      const newForm = {
         id: nanoid(), // Generate a unique ID for the form
         name,
         description,
         elements: [],
      };

      // Save the new form to local storage
      const updatedForms = [...forms, newForm];
      setForms(updatedForms);

      router.push(`/builder/${newForm.id}`);
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Create form</DialogTitle>
               <DialogDescription>
                  Create a new form to start collecting responses
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-1">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input
                     id="name"
                     className="col-span-3"
                     name="name"
                     placeholder="enter form name"
                     ref={nameRef}
                  />
               </div>
               <div className="space-y-1">
                  <Label htmlFor="username" className="text-right">
                     Description
                  </Label>
                  <Textarea
                     id="description"
                     className="col-span-3"
                     name="description"
                     placeholder="enter form description"
                     ref={descRef}
                  />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit" className="w-full" onClick={handleClick}>
                  Save
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
