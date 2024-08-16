import { Categories } from "./typeCategories";
import { StatesNg } from "./typeStatesng";

// TypeScript interface representing the structure of formEntrySchema
export interface FormEntry {
  userEmail: string;
  id: string;
  datePurchased: string; // Format: DD/MM/YYYY
  dateReported: string; // Format: DD/MM/YYYY
  category: (typeof Categories)[number];
  item: string;
  price: number;
  quantity: number;
  state: (typeof StatesNg)[number];
  notes: string;
}

export type FormEntryWithMongoId = FormEntry & { mongoId: string };