import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

interface DesignerSelectProps {
   placeholder?: string;
   label: string;
   options?: string[];
}

export function DesignerSelect({
   placeholder,
   label,
   options,
}: DesignerSelectProps) {
   return (
      <Select>
         <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder || "Select"} />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectLabel>{label}</SelectLabel>
               {(options||["abc", "bga", "gfh", "gfh"]).map((option) => (
                  <SelectItem key={option} value={option}>
                     {option}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
