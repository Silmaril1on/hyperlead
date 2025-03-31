import ContentList from "./ContentList";
import SectionHeadline from "@/components/SectionHeadline";

const SectionTwo = () => {
  return (
    <section>
      <SectionHeadline
        className="lg:px-[10%]"
        title="AI-Powered Lead Generation & Outreach All in One Platform"
        desc="Find, qualify, and engage high-intent leads effortlessly with AI-driven automation. Scale your business faster—zero manual work required."
      />
      <ContentList />
    </section>
  );
};

export default SectionTwo;
