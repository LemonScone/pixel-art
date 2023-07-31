import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../types/Modal";

const initialState = {
  modalType: "" as ModalType,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
