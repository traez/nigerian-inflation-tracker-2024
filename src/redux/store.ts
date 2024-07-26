import { configureStore } from "@reduxjs/toolkit";
import formEntryReducer from "./formEntrySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      formEntry: formEntryReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

/*
Imports: Brings in necessary functions and reducers.
Store Creation: Defines a function to create and configure the store with the counterReducer.
Type Inference: Uses TypeScript to infer and export types for the store, state, and dispatch functions to ensure type safety throughout the application.
*/
