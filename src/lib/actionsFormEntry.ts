"use server";
import FormEntry from "@/lib/modelForm";
import { FormEntry as FormEntryType } from "@/lib/typeFormEntry";

export const addFormEntry = async (entry: FormEntryType) => {
  try {
    const newEntry = new FormEntry(entry);
    const savedEntry = await newEntry.save();
    const mongoId = savedEntry._id.toString();
    const { _id, __v, ...plainEntry } = savedEntry.toObject();
    const result = { mongoId, ...plainEntry }; 
    return result; 
  } catch (error) {
    console.error("Error adding form entry:", error);
    throw new Error("Failed to add form entry");
  }
};

export const getFormEntries = async () => {
  try {
    const entries = await FormEntry.find({});
    const plainEntries = entries.map((entry) => {
      const { _id, __v, ...plainEntry } = entry.toObject();
      const mongoId = _id.toString(); 
      return { mongoId, ...plainEntry }; 
    });
    return plainEntries;
  } catch (error) {
    console.error("Error fetching form entries:", error);
    throw new Error("Failed to fetch form entries");
  }
};

export const deleteFormEntry = async (mongoId: string) => {
  try {
    const deletedEntry = await FormEntry.findByIdAndDelete(mongoId);
    if (!deletedEntry) {
      throw new Error("Form entry not found");
    }
    return { message: "Form entry deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting form entry:", error.message);
      throw new Error(`Failed to delete form entry: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
      throw new Error("Failed to delete form entry: An unknown error occurred");
    }
  }
};
