import React from "react";
import { Label } from "@/components/ui/label";

interface ElementWraperProps {
   label: string;
   type: string;
   id: string;
   children: React.ReactNode;
}

export default function ElementWraper({
   label,
   id,
   type,
   children,
}: ElementWraperProps) {

   // console.log({label, type, id});
   return (
      <div className="w-full space-y-2">
         {type === "checkbox" && <div className="mr-2 inline-block">{children}</div>}
         <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
         >
            {label}
         </Label>
         {type !== "checkbox" && children}
      </div>
   );
}
