import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  error: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.isOpen = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setToggle, setError } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
