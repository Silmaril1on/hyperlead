import LogoSlider from "./LogoSlider";
import SectionFaq from "./sectionFAQ/SectionFaq";
import SectionGlobe from "./sectionGlobe/SectionGlobe";
import SectionOne from "./sectionOne/SectionOne";
import SectionPricing from "./sectionPricing/SectionPricing";
import SectionThree from "./sectionThree/SectionThree";
import SectionTwo from "./sectionTwo/SectionTwo";
import FeedbackSlider from "./userFeedbacks/FeedbackSlider";

const HomePage = () => {
  return (
    <main className="center flex-col space-y-20">
      <SectionOne />
      <FeedbackSlider />
      <LogoSlider />
      <SectionTwo />
      <SectionThree />
      <SectionPricing />
      <SectionFaq />
      <SectionGlobe />
    </main>
  );
};

export default HomePage;
