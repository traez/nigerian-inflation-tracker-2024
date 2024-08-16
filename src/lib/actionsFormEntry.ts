"use server";
import FormEntry from "@/lib/modelForm";
import { FormEntry as FormEntryType } from "@/lib/typeFormEntry";

export const addFormEntry = async (entry: FormEntryType) => {
  try {
    const newEntry = new FormEntry(entry);
    const savedEntry = await newEntry.save();
    const { _id, __v, ...plainEntry } = savedEntry.toObject();
    return plainEntry; 
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
      return plainEntry;
    });
    return plainEntries;
  } catch (error) {
    console.error("Error fetching form entries:", error);
    throw new Error("Failed to fetch form entries");
  }
};