import supabase from "../config/supabaseClient";

export const updateProfile = async (userId, updates) => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    if (profileError) throw profileError;
    if (updates.userName || updates.phone) {
      const authUpdates = {};
      if (updates.userName) authUpdates.display_name = updates.userName;
      if (updates.phone) authUpdates.phone = updates.phone;
      const { error: authError } = await supabase.auth.updateUser({
        data: authUpdates,
      });
      if (authError) throw authError;
    }
    return { data: profileData, error: null };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { data: null, error: error.message };
  }
};

export const uploadAvatar = async (userId, file) => {
  try {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();
    if (existingProfile?.avatar_url) {
      const oldPath = existingProfile.avatar_url.split("/").pop();
      await supabase.storage.from("avatars").remove([`${userId}/${oldPath}`]);
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (uploadError) throw uploadError;
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);
    if (updateError) throw updateError;
    return { success: true, avatar_url: publicUrl };
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return { success: false, error: error.message };
  }
};

export const updateWallpaper = async (userId, wallpaperUrl) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ wallpaper_url: wallpaperUrl })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating wallpaper:", error);
    return { success: false, error: error.message };
  }
};
