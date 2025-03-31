import ImageComponent from "@/components/ImageComponent";
import Hero from "./Hero";

const SectionOne = () => {
  return (
    <section className="center flex-col">
      <Hero />
      <ImageComponent src="/assets/img1.jpg" alt="img" />
    </section>
  );
};

export default SectionOne;
