import Image from "next/image";
import { useState } from "react";
import profileWallpapers from "@/localDB/profileWallpapers";
import { useToggleLocal } from "@/hooks/useToggleLocal";
import { IoCameraOutline } from "react-icons/io5";
import FlexBox from "@/components/containers/FlexBox";
import WallpapersPalette from "./WallpapersPalette";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";

const BackgroundWallpaper = ({ profile }) => {
  const { isOpen: isModalOpen, toggleState: setIsModalOpen } =
    useToggleLocal(false);
  const user = useSelector(selectUser);
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    user?.profile?.wallpaper_url ||
      profile?.wallpaper_url ||
      profileWallpapers[0]
  );

  return (
    <div className="relative w-full h-72 rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          fill
          priority
          quality={85}
          src={selectedWallpaper}
          alt="Profile wallpaper"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
      <FlexBox
        onClick={() => setIsModalOpen(true)}
        type="row-1"
        className="bg-blue-700 absolute right-3 bottom-3 rounded-sm px-2 py-1 text-white cursor-pointer hover:bg-blue-800 transition-all"
      >
        <IoCameraOutline size={25} />
        <span>Edit</span>
      </FlexBox>
      <WallpapersPalette
        isModalOpen={isModalOpen}
        profileWallpapers={profileWallpapers}
        setIsModalOpen={setIsModalOpen}
        selectedWallpaper={selectedWallpaper}
        setSelectedWallpaper={setSelectedWallpaper}
      />
    </div>
  );
};

export default BackgroundWallpaper;
