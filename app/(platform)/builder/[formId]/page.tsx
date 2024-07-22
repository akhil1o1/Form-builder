"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { ScanEye } from "lucide-react";
import { FormType } from "@/components/platform/create-form";
import { Button } from "@/components/ui/button";
import FormBuilder from "@/components/platform/builder/form-builder";
import FormPreview from "@/components/platform/form-peview";

export default function BuilderPage({
   params,
}: {
   params: { formId: string };
}) {
   const [isMounted, setIsMounted] = useState(false);
   const [showPreview, setShowPreview] = useState(false);
   const [forms] = useLocalStorage<FormType[]>("forms", []);
   const { formId } = params;

   const currentForm = forms.find((form) => form.id === formId);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return (
      <div
         className="w-full min-h-[100vh]"
         style={{ backgroundImage: `url(/assets/bg-grid.svg)` }}
      >
         <div className="flex justify-between items-center p-4 bg-white w-full border-b">
            <p>Form : {currentForm?.name}</p>
            <Button variant={"ghost"} size={"sm"} onClick={() => setShowPreview(true)}>
               <ScanEye className="mr-2 w-5 h-5" /> Preview
            </Button>
         </div>
         <FormBuilder/>
         <FormPreview isOpen={showPreview} onClose={() => setShowPreview(false)}/>
      </div>
   );
}
