"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { FormType } from "@/components/platform/create-form";

import { FilePlus, CircleX } from "lucide-react";
import CreateForm from "@/components/platform/create-form";
import { Button } from "@/components/ui/button";

export default function Home() {
   const [isOpen, setIsOpen] = useState(false);
   const [forms, setForms] = useLocalStorage<FormType[]>("forms", []);

   console.log(forms);

   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   function handleClick() {
      setIsOpen(true);
   }

   function onClose() {
      setIsOpen(false);
   }

   function onDelete(formId: string, event: React.MouseEvent) {
      event.stopPropagation();
      event.preventDefault();
      const updatedForms = forms.filter((form) => form.id !== formId);
      setForms(updatedForms);
   }

   return (
      <div className="py-10 text-center space-y-10 h-[100vh] w-[100vw] md:max-w-screen-xl mx-auto">
         <h1 className="text-center text-2xl md:text-4xl font-bold text-neutral-700">
            Your forms
         </h1>
         <div className="flex flex-wrap gap-4">
            {forms?.map((form) => (
               <Link
                  key={form.id}
                  href={`builder/${form.id}`}
                  className="h-[190px] w-[300px] relative items-center justify-center flex flex-col border gap-2"
               >
                  <span className="text-lg font-semibold text-neutral-600 text-clip">
                     {form.name}
                  </span>
                  <span className="font-semibold text-muted-foreground text-clip">
                     {form.description}
                  </span>
                  <Button
                     size={"icon"}
                     variant={"ghost"}
                     className="absolute top-0 right-0 z-10"
                     onClick={(e) => onDelete(form.id, e)}
                  >
                     <CircleX className="w-4 h-4" />
                  </Button>
               </Link>
            ))}
            <Button
               className="h-[190px] w-[300px] items-center justify-center flex flex-col border-dashed gap-4"
               variant={"outline"}
               onClick={handleClick}
            >
               <FilePlus className="w-8 h-8" />
               <span>Create new form</span>
            </Button>
         </div>
         <CreateForm isOpen={isOpen} onClose={onClose} />
      </div>
   );
}
