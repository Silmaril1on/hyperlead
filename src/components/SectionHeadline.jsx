import StaggerZoomOut from "./containers/StaggerZoomOut";
import ZoomOut from "./containers/ZoomOut";

const SectionHeadline = ({ title, desc, className, children }) => {
  return (
    <ZoomOut
      className={`${className} space-y-5 center flex-col px-3 py-10 lg:py-20`}
    >
      <StaggerZoomOut className="text-3xl md:text-5xl text-center lg:text-6xl font-bold tracking-tight capitalize">
        {title}
      </StaggerZoomOut>
      <p className="text-base md:text-lg text-center text-gray-600 max-w-3xl mx-auto">
        {desc}
      </p>
      {children}
    </ZoomOut>
  );
};

export default SectionHeadline;
