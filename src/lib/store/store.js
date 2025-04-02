import { modalReducer } from "@/features/modalSlice";
import { userReducer } from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});
