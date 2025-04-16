import FlexBox from "@/components/containers/FlexBox";
import Image from "next/image";

const Author = ({ item }) => {
  const { profiles } = item;
  return (
    <div className="flex flex-col mt-4">
      <FlexBox type="row">
        <Image
          className="w-6 h-6 rounded-full"
          src={profiles?.avatar_url}
          alt="avatar"
          width={50}
          height={50}
        />
        <span className="capitalize">{profiles.userName}</span>
      </FlexBox>
      <span className="text-[12px] italic">{profiles.email}</span>
    </div>
  );
};

export default Author;
