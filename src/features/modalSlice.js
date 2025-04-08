import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  error: "",
  type: "error",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.isOpen = action.payload;
    },
    setError: (state, action) => {
      const { message, type } =
        typeof action.payload === "string"
          ? { message: action.payload, type: "error" }
          : action.payload;

      state.error = message;
      state.type = type || "error";
    },
  },
});

export const { setToggle, setError } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectError = (state) => state.modal.error;
