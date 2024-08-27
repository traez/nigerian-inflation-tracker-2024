"use client";
import { useState, useEffect } from "react";
import { getFormEntriesByCategory } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import { Categories, Category } from "@/lib/typeCategories";
import FormEntryItem from "./FormEntryItem";
import { User } from "@/lib/typeGetSession";

interface CategoryFormEntryProps {
  user: User | null;
}

const CategoryFormEntry: React.FC<CategoryFormEntryProps> = ({ user }) => {
  const [category, setCategory] = useState<Category>("Select Category");
  const [entries, setEntries] = useState<FormEntryWithMongoId[]>([]);

  useEffect(() => {
    if (category !== "Select Category") {
      const fetchEntries = async () => {
        const fetchedEntries = await getFormEntriesByCategory(category);
        setEntries(fetchedEntries);
      };

      fetchEntries();
    }
  }, [category]);

  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">Select Category</h2>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="p-2 border rounded"
      >
        {Categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {category !== "Select Category" && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Entries in {category}
          </h2>
          <ul className="space-y-4">
            {entries.map((entry) => (
              <FormEntryItem key={entry.mongoId} entry={entry} user={user}/>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CategoryFormEntry;
