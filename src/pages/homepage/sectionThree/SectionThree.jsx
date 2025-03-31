import ImageComponent from "@/components/ImageComponent";
import SectionHeadline from "@/components/SectionHeadline";
import ContentList from "./ContentList";

const SectionThree = () => {
  return (
    <section className="center flex-col w-full">
      <SectionHeadline
        className="lg:px-[17%]"
        title="Discover unlimited creative possibilities"
        desc="Your go-to source for quick and accurate responses
and top notch resources base"
      />
      <ImageComponent src="/assets/sectionthree.jpg" alt="section three" />
      <ContentList />
    </section>
  );
};

export default SectionThree;
