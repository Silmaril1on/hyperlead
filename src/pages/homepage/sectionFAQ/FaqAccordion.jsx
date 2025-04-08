"use client";
import { useToggleLocal } from "@/hooks/useToggleLocal";
import { GoPlus } from "react-icons/go";
import faq from "@/localDB/faqData";
import Paragraph from "@/components/Paragraph";
import SubTitle from "@/components/SubTitle";

const FaqAccordion = () => {
  const { isOpen, toggleState } = useToggleLocal();

  return (
    <div className="space-y-3 w-full max-w-lg mx-auto px-3">
      {faq.map((item, index) => (
        <div key={index} className="border-b border-neutral-200 py-2">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => toggleState(index)}
          >
            <GoPlus
              size={25}
              className={`text-neutral-400 transition-transform duration-300 ${
                isOpen === index ? "rotate-45" : ""
              }`}
            />
            <SubTitle>{item.q}</SubTitle>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isOpen === index ? "max-h-[400px]" : "max-h-0"
            }`}
          >
            <Accordion item={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Accordion = ({ item }) => {
  return (
    <div className="pl-10 pr-5 py-3 ">
      {item.a.split("\n\n").map((paragraph, index) => (
        <Paragraph className="mb-2" key={index}>
          {paragraph}
        </Paragraph>
      ))}
    </div>
  );
};

export default FaqAccordion;
