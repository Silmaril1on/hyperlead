"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "@/features/userSlice";
import { getCurrentUser } from "./authActions";
import supabase from "../config/supabaseClient";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (mounted) {
            dispatch(setUser(null));
            dispatch(setLoading(false));
          }
          return;
        }

        const { data, error } = await getCurrentUser();
        if (mounted) {
          if (!error && data) {
            dispatch(setUser(data));
          } else {
            dispatch(setUser(null));
          }
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          dispatch(setUser(null));
          dispatch(setLoading(false));
        }
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && mounted) {
          const currentUser = await getCurrentUser();
          if (currentUser.data && mounted) {
            dispatch(setUser(currentUser.data));
          }
        }
      }
    };

    initializeAuth();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" && session) {
        const { data } = await getCurrentUser();
        if (mounted) {
          dispatch(setUser(data));
        }
      } else if (event === "SIGNED_OUT") {
        if (mounted) {
          dispatch(setUser(null));
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);

  return children;
}
