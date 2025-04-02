import supabase from "../config/supabaseClient";
import handleAuthError from "./handleAuthErrors";

export const signUp = async ({ email, password }) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) {
      throw authError;
    }
    const { error: userError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    if (userError) {
      await supabase.auth.signOut();
      throw userError;
    }
    return { data: authData, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    let errorMessage = "Invalid email or password";
    if (error.message.includes("Invalid login credentials")) {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error.message.includes("Email not confirmed")) {
      errorMessage = "Please verify your email address before signing in.";
    }
    return { data: null, error: errorMessage };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return { error: null };
  } catch (error) {
    return { error: "Failed to sign out. Please try again." };
  }
};
