import mongoose from "mongoose";
import { Categories } from "./typeCategories";
import { StatesNg } from "./typeStatesng";

const formEntrySchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  id: { type: String, required: true },
  datePurchased: { type: String, required: true }, // Format: DD/MM/YYYY
  dateReported: { type: String, required: true }, // Format: DD/MM/YYYY
  category: { type: String, enum: Categories, required: true },
  item: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  state: { type: String, enum: StatesNg, required: true },
  notes: { type: String, required: true, maxlength: 100 },
});

const FormEntry = mongoose.models.FormEntry || mongoose.model("FormEntry", formEntrySchema);

export default FormEntry;
