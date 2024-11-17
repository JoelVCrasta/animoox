'use client'
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState(null); // Track the open item

  const handleToggle = (item:any) => {
    setOpenItem(openItem === item ? null : item); // Toggle item open/close
  };

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {[
          { id: "item-1", question: "What type of digital assets do you offer?", answer: "We provide a wide range of digital assets, including illustrations, icons, Lottie animations, and various design elements." },
          { id: "item-2", question: "How many assets are available for download?", answer: "We provide a wide range of digital assets, including illustrations, icons, Lottie animations, and various design elements." },
          { id: "item-3", question: "Are the assets customizable?", answer: "We provide a wide range of digital assets, including illustrations, icons, Lottie animations, and various design elements." },
          { id: "item-4", question: "How do I download the assets?", answer: "We provide a wide range of digital assets, including illustrations, icons, Lottie animations, and various design elements." },
          { id: "item-5", question: "Can I use these assets for commercial projects?", answer: "We provide a wide range of digital assets, including illustrations, icons, Lottie animations, and various design elements." }
        ].map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-brand border-t-brand border-l-brand border-r-brand"
          >
            <AccordionTrigger
              onClick={() => handleToggle(item.id)}
              className={`flex justify-between items-center font-extralight text-md ${
                openItem === item.id ? "text-black" : "text-secondary-text"
              }`}
            >
              <p className="text-md font-extralight">{item.question}</p>
              {openItem === item.id ? (
                "-"
              ) : (
                "+"
              )}
            </AccordionTrigger>
            <AccordionContent
              className={`text-sm ${
                openItem === item.id ? "text-black" : "text-secondary-text"
              } font-extralight`}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
