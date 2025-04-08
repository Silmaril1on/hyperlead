import Close from "@/components/buttons/Close";
import FlexBox from "@/components/containers/FlexBox";
import FormContainer from "@/components/containers/FormContainer";
import MotionContainer from "@/components/containers/MotionContainer";
import Title from "@/components/Title";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import { updateProfile } from "@/lib/profileActions/profileActions";
import { setError } from "@/features/modalSlice";
import { updateUserProfile } from "@/features/userSlice";
import Paragraph from "@/components/Paragraph";

const WallpapersPalette = ({
  isModalOpen,
  setIsModalOpen,
  profileWallpapers,
  setSelectedWallpaper,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleWallpaperSelect = async (wallpaper) => {
    try {
      const wallpaperSrc =
        typeof wallpaper === "object" ? wallpaper.src : wallpaper;
      const { error } = await updateProfile(user.id, {
        wallpaper_url: wallpaperSrc,
      });
      if (error) {
        dispatch(setError(error));
        return;
      }
      setSelectedWallpaper(wallpaperSrc);
      dispatch(updateUserProfile({ wallpaper_url: wallpaperSrc }));
      dispatch(
        setError({
          type: "success",
          message: "Wallpaper updated successfully!",
        })
      );
      setIsModalOpen(false);
    } catch (error) {
      dispatch(setError("Failed to update wallpaper. Please try again."));
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <MotionContainer
          animation="fade-in"
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
        >
          <FormContainer className="w-full lg:w-[65%]">
            <FlexBox type="row-between" className="w-full">
              <FlexBox type="column-start">
                <Title>Choose Your Wallpaper</Title>
                <Paragraph>
                  Wallpaper palette will be updated overtime
                </Paragraph>
              </FlexBox>
              <Close onClick={() => setIsModalOpen(false)} />
            </FlexBox>
            <div className="w-full grid grid-cols-5 gap-4">
              {profileWallpapers.map((item, index) => {
                return (
                  <div
                    onClick={() => handleWallpaperSelect(item)}
                    className="relative brightness-90 hover:brightness-100 duration-300 aspect-video rounded-lg overflow-hidden cursor-pointer"
                    key={index}
                  >
                    <Image
                      src={item}
                      alt={`Wallpaper ${index + 1}`}
                      className="object-cover w-full h-full"
                      quality={85}
                      width={300}
                      height={300}
                    />
                  </div>
                );
              })}
            </div>
          </FormContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default WallpapersPalette;
