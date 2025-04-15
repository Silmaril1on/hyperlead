import supabase from "../config/supabaseClient";

export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    if (updates.userName) {
      const { error: authError } = await supabase.auth.updateUser({
        data: { userName: updates.userName },
      });
      if (authError) throw authError;
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const uploadAvatar = async (userId, file) => {
  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please upload an image file");
    }
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 1MB");
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { data: oldFiles } = await supabase.storage.from("avatars").list("", {
      limit: 1,
      search: userId,
    });
    if (oldFiles?.length > 0) {
      await supabase.storage.from("avatars").remove([oldFiles[0].name]);
    }
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    if (uploadError) throw uploadError;
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const timestamp = Date.now();
    const urlWithTimestamp = `${publicUrl}?v=${timestamp}`;
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: urlWithTimestamp,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();
    if (updateError) throw updateError;
    return { success: true, avatar_url: urlWithTimestamp };
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return { data: null, error: error.message };
  }
};
