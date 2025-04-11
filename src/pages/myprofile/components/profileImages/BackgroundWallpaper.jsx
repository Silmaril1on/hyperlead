import Image from "next/image";
import { useState } from "react";
import profileWallpapers from "@/localDB/profileWallpapers";
import { useToggleLocal } from "@/hooks/useToggleLocal";
import WallpapersPalette from "./WallpapersPalette";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import EditWallpaperBtn from "./EditWallpaperBtn";

const BackgroundWallpaper = ({ profile }) => {
  const user = useSelector(selectUser);
  const { isOpen: isModalOpen, toggleState: setIsModalOpen } =
    useToggleLocal(false);
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
      <EditWallpaperBtn setIsModalOpen={setIsModalOpen} />
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
