import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Category } from "./categories";
import { StateNg } from "./statesng";

/*
user or name property to be created in FormEntry to differentiate poster
*/

export interface FormEntry {
  id: string;
  datePurchased: string; // Format: DD/MM/YYYY
  dateReported: string; // Format: DD/MM/YYYY
  category: Category;
  item: string;
  price: number;
  quantity: number;
  state: StateNg;
  notes: string; // Max 100 characters
}

export interface FormState {
  entries: FormEntry[];
}

const initialState: FormState = {
  entries: [],
};

export const formEntrySlice = createSlice({
  name: "formEntry",
  initialState,
  reducers: {
    addFormEntry: (state, action: PayloadAction<FormEntry>) => {
      state.entries.push(action.payload);
    },
    deleteFormEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
    },
    editFormEntry: (state, action: PayloadAction<FormEntry>) => {
      const index = state.entries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...action.payload };
      }
    },
  },
});

export const { addFormEntry, deleteFormEntry, editFormEntry } = formEntrySlice.actions;

export const selectFormEntries = (state: RootState) => state.formEntry.entries;

export default formEntrySlice.reducer;
