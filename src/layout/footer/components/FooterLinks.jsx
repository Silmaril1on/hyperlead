import SubTitle from "@/components/SubTitle";
import footerData from "@/lib/localDB/footerData";
import Link from "next/link";

const FooterLinks = () => {
  return (
    <div className="flex space-x-20 justify-center lg:justify-end my-10 lg:my-0">
      {footerData.map((item) => {
        return (
          <div key={item.id}>
            <SubTitle className="capitalize text-center">{item.title}</SubTitle>
            <div className="center flex-col capitalize space-y-1 mt-4">
              {item.links.map((item, index) => {
                return (
                  <Link
                    className="text-neutral-700 hover:text-black text-sm"
                    href={item.link}
                    key={index}
                  >
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterLinks;
