"use server";
import FormEntry from "@/lib/modelForm";
import { FormEntry as FormEntryType } from "@/lib/typeFormEntry";

const addFormEntry = async (entry: FormEntryType) => {
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

const getFormEntries = async () => {
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

const deleteFormEntry = async (mongoId: string) => {
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

const editFormEntry = async (
  mongoId: string,
  updatedData: Partial<FormEntryType>
) => {
  try {
    const updatedEntry = await FormEntry.findByIdAndUpdate(
      mongoId,
      updatedData,
      { new: true }
    );
    if (!updatedEntry) {
      throw new Error("Form entry not found");
    }
    const { _id, __v, ...plainEntry } = updatedEntry.toObject();
    const result = { mongoId: _id.toString(), ...plainEntry };
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error editing form entry:", error.message);
      throw new Error(`Failed to edit form entry: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
      throw new Error("Failed to edit form entry: An unknown error occurred");
    }
  }
};

const getFormEntryById = async (mongoId: string) => {
  try {
    const entry = await FormEntry.findById(mongoId);
    if (!entry) {
      throw new Error("Form entry not found");
    }
    const { _id, __v, ...plainEntry } = entry.toObject();
    const result = { mongoId: _id.toString(), ...plainEntry };
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching form entry by ID:", error.message);
      throw new Error(`Failed to fetch form entry by ID: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
      throw new Error(
        "Failed to fetch form entry by ID: An unknown error occurred"
      );
    }
  }
};

const getFormEntriesByCategory = async (category: string) => {
  try {
    const entries = await FormEntry.find({ category });
    const plainEntries = entries.map((entry) => {
      const { _id, __v, ...plainEntry } = entry.toObject();
      const mongoId = _id.toString();
      return { mongoId, ...plainEntry };
    });
    return plainEntries;
  } catch (error) {
    console.error("Error fetching form entries by category:", error);
    throw new Error("Failed to fetch form entries by category");
  }
};

const getFormEntriesByState = async (state: string) => {
  try {
    const entries = await FormEntry.find({ state });
    const plainEntries = entries.map((entry) => {
      const { _id, __v, ...plainEntry } = entry.toObject();
      const mongoId = _id.toString();
      return { mongoId, ...plainEntry };
    });
    return plainEntries;
  } catch (error) {
    console.error("Error fetching form entries by state:", error);
    throw new Error("Failed to fetch form entries by state");
  }
};

const getUserEmails = async () => {
  try {
    const userEmails = await FormEntry.distinct("userEmail");
    return userEmails;
  } catch (error) {
    console.error("Error fetching user emails:", error);
    throw new Error("Failed to fetch user emails");
  }
};

const getFormEntriesByUserEmail = async (userEmail: string) => {
  try {
    const entries = await FormEntry.find({ userEmail });
    const plainEntries = entries.map((entry) => {
      const { _id, __v, ...plainEntry } = entry.toObject();
      const mongoId = _id.toString();
      return { mongoId, ...plainEntry };
    });
    return plainEntries;
  } catch (error) {
    console.error("Error fetching form entries by userEmail:", error);
    throw new Error("Failed to fetch form entries by userEmail");
  }
};

export {
  addFormEntry,
  getFormEntries,
  deleteFormEntry,
  editFormEntry,
  getFormEntryById,
  getFormEntriesByCategory,
  getFormEntriesByState,
  getUserEmails,
  getFormEntriesByUserEmail,
};
