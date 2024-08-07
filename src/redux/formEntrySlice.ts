import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

export interface FormEntry {
    id: string;
    date: string; // Format: DD/MM/YYYY
    item: string;
    category: string;
    price: number;
    state: string;
    quantity: number;
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
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addFormEntry, deleteFormEntry } = formEntrySlice.actions;

export const selectFormEntries = (state: RootState) => state.formEntry.entries;

export default formEntrySlice.reducer;
