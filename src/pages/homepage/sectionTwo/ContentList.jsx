import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import Title from "@/components/Title";
import sectionTwoData from "@/localDB/sectionTwoData";
import Image from "next/image";

const ContentList = () => {
  return (
    <MotionContainer
      animation="zoom-out"
      type="in-view"
      className="px-3 md:px-[12%]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MotionChildren
          animation="zoom-out"
          className="md:col-span-2 primary-border bg-[#f8fafc] space-y-5"
        >
          <div className="w-full">
            <Image
              className="w-full h-full"
              src={sectionTwoData[0].image}
              alt={sectionTwoData[0].title}
              width={400}
              height={400}
              quality={85}
            />
          </div>
          <article className="space-y-1">
            <Title>{sectionTwoData[0].title}</Title>
            <p>{sectionTwoData[0].desc}</p>
          </article>
        </MotionChildren>
        <MotionChildren
          animation="zoom-out"
          className="primary-border bg-[#f8fafc] space-y-5"
        >
          <div className="w-full">
            <Image
              src={sectionTwoData[1].image}
              alt={sectionTwoData[1].title}
              width={400}
              height={400}
              quality={85}
            />
          </div>
          <article className="space-y-1">
            <Title>{sectionTwoData[1].title}</Title>
            <p>{sectionTwoData[1].desc}</p>
          </article>
        </MotionChildren>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sectionTwoData.slice(2, 5).map((item) => (
          <MotionChildren
            key={item.id}
            animation="zoom-out"
            className="primary-border bg-[#f8fafc] space-y-5"
          >
            <div className="w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                quality={85}
              />
            </div>
            <article className="space-y-1">
              <Title>{item.title}</Title>
              <p>{item.desc}</p>
            </article>
          </MotionChildren>
        ))}
      </div>
    </MotionContainer>
  );
};

export default ContentList;
