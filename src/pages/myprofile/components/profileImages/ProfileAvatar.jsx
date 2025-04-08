import Image from "next/image";
import Spinner from "@/components/Spinner";
import { IoCameraOutline } from "react-icons/io5";
import { useState, useCallback, memo, useEffect } from "react";
import { setError } from "@/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@/features/userSlice";
import { selectUser } from "@/features/userSlice";
import { uploadAvatar } from "@/lib/profileActions/profileActions";

const ProfileAvatar = memo(({ profile: initialProfile, userId }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [localProfile, setLocalProfile] = useState(initialProfile);
  const user = useSelector(selectUser);

  // Update local profile when Redux state changes
  useEffect(() => {
    if (user?.profile?.avatar_url) {
      setLocalProfile((prev) => ({
        ...prev,
        avatar_url: user.profile.avatar_url,
      }));
    }
  }, [user?.profile?.avatar_url]);

  const handleAvatarChange = useCallback(
    async (e) => {
      try {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const { avatar_url, error } = await uploadAvatar(userId, file);
        if (error) {
          dispatch(setError(error));
          return;
        }
        dispatch(updateUserProfile({ avatar_url }));
        dispatch(
          setError({
            type: "success",
            message: "Profile picture uploaded successfully!",
          })
        );
      } catch (error) {
        dispatch(setError("Something went wrong uploading your avatar."));
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [dispatch, userId]
  );

  return (
    <div className="w-44 h-44 rounded-full absolute p-3 backdrop-blur-3xl -top-28">
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {localProfile?.avatar_url ? (
          <Image
            className="object-cover"
            src={localProfile.avatar_url}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            alt="user-avatar"
          />
        ) : (
          <Image
            className="object-cover"
            src="/assets/noPhoto.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            alt="default-avatar"
          />
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <label className="bg-blue-700 hover:bg-blue-800 transition-all cursor-pointer text-white w-fit rounded-full right-3 bottom-3 absolute center p-2">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={uploading}
        />
        {uploading ? <Spinner /> : <IoCameraOutline size={23} />}
      </label>
    </div>
  );
});

ProfileAvatar.displayName = "ProfileAvatar";

export default ProfileAvatar;
