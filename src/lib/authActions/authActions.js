import supabase from "../config/supabaseClient";
import handleAuthError from "./handleAuthErrors";

const createOrUpdateProfile = async (user, profile = {}) => {
  try {
    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        userName:
          profile.userName ||
          user.user_metadata?.userName ||
          user.email?.split("@")[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
        returning: "minimal",
      }
    );
    if (upsertError && upsertError.code !== "23505") {
      console.error("Profile creation error:", upsertError);
      throw upsertError;
    }
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .throwOnError();

    if (profileError) throw profileError;
    return profileData;
  } catch (error) {
    console.error("Profile operation error:", error);
    return null;
  }
};

export const signUp = async ({ email, password, userName }) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          userName,
          display_name: userName,
        },
      },
    });
    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        userName,
        display_name: userName,
      },
    });
    if (updateError) throw updateError;
    const profile = await createOrUpdateProfile(authData.user, { userName });
    return {
      data: {
        ...authData,
        user: {
          ...authData.user,
          profile,
        },
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (authError) throw authError;
    const profile = await createOrUpdateProfile(authData.user);
    return {
      data: {
        ...authData,
        user: {
          ...authData.user,
          profile,
        },
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message.includes("Invalid login credentials")
        ? "Invalid email or password. Please try again."
        : handleAuthError(error),
    };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: "Failed to sign out. Please try again." };
  }
};

export const getCurrentUser = async () => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session?.user) return { data: null, error: null };
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    const profile = await createOrUpdateProfile(session.user, {
      userName: user?.user_metadata?.userName,
    });
    return {
      data: {
        ...session.user,
        profile,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return { data: null, error: handleAuthError(error) };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetpassword/update`,
    });
    if (error) throw error;
    return {
      error: null,
      message: "Password reset instructions have been sent to your email.",
    };
  } catch (error) {
    return {
      error: handleAuthError(error),
      message: null,
    };
  }
};

export const updatePassword = async (newPassword) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      if (error.status === 429) {
        return {
          error: "Too many requests. Please wait a moment before trying again.",
          message: null,
        };
      }
      throw error;
    }
    return {
      error: null,
      message: "Password updated successfully.",
    };
  } catch (error) {
    console.error("Password update error:", error);
    if (error.message && error.message.includes("429")) {
      return {
        error: "Too many requests. Please wait a moment before trying again.",
        message: null,
      };
    }
    return {
      error: handleAuthError
        ? handleAuthError(error)
        : "Failed to update password. Please try again.",
      message: null,
    };
  }
};
