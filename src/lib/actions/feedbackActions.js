import supabase from "../config/supabaseClient";

export const submitFeedback = async (feedbackData) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          user_id: user.id,
          rating: feedbackData.rating,
          header: feedbackData.header,
          review: feedbackData.review,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getFeedback = async () => {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .select(
        `
        *,
        profiles:user_id (
        userName, 
          email,
          avatar_url
        )
      `
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    const transformedData = data.map((feedback) => ({
      ...feedback,
      profiles: feedback.profiles || {
        userName: "Anonymous User",
        email: null,
        avatar_url: null,
      },
    }));
    return { data: transformedData, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
