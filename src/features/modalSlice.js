import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setToggle } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
