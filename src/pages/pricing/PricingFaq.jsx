import Paragraph from "@/components/Paragraph";
import SectionHeadline from "@/components/SectionHeadline";
import Title from "@/components/Title";
import pricingFaqData from "@/localDB/pricingFaqData";

const PricingFaq = () => {
  return (
    <div className="center flex-col px-3 ">
      <SectionHeadline
        title="FAQ"
        desc="Have a different question and can’t find the answer you’re looking for? Reach out to our support team by sending us an email and we’ll get back to you as soon as we can."
      />
      <FaqList />
    </div>
  );
};

const FaqList = () => {
  return (
    <div className="grid md:grid-cols-2 w-full lg:w-2/4 gap-10 px-5">
      {pricingFaqData.map((item, index) => {
        return (
          <div className="primary-border bg-[#f8fafc]" key={index}>
            <Title>{item.title}</Title>
            <Paragraph>{item.desc}</Paragraph>
          </div>
        );
      })}
    </div>
  );
};

export default PricingFaq;
