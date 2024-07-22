import { Draggable } from "@hello-pangea/dnd";

import {
   Type,
   ArrowUp01,
   Text,
   Check,
   TextSelect,
   CalendarDays,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const elements = [
   { type: "text", title: "Text Field", icon: <Type /> },
   { type: "number", title: "Number Field", icon: <ArrowUp01 /> },
   { type: "textarea", title: "TextArea Field", icon: <Text /> },
   { type: "checkbox", title: "Check Box", icon: <Check /> },
   { type: "select", title: "Select Field", icon: <TextSelect /> },
   { type: "date", title: "Date Field", icon: <CalendarDays /> },
];

export default function FormElements() {
   return (
      <div>
         <p>Drag and drop elements</p>
         <Separator className="my-2" />
         <p className="text-sm">Form elements</p>
         <div className="flex flex-wrap gap-2 mt-4">
            {elements.map((element, index) => (
               <Draggable
                  key={element.title}
                  draggableId={element.type}
                  index={index}
               >
                  {(provided) => (
                     <div
                        className="w-[40%] h-20 border-2 rounded-sm flex flex-col justify-center items-center text-xs bg-white"
                        {...provided.draggableProps}
                         {...provided.dragHandleProps}
                        ref={provided.innerRef}
                     >
                        {element.icon}
                        {element.title}
                     </div>
                  )}
               </Draggable>
            ))}
         </div>
      </div>
   );
}
