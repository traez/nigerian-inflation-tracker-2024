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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEntries = async () => {
      if (category !== "Select Category") {
        setLoading(true);
        try {
          const fetchedEntries = await getFormEntriesByCategory(category);
          setEntries(fetchedEntries);
        } catch (error) {
          console.error("Failed to fetch entries:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEntries();
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
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        category !== "Select Category" && (
          <>
            {entries.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Entries in {category}
                </h2>
                <ul className="space-y-4">
                  {entries.map((entry) => (
                    <FormEntryItem
                      key={entry.mongoId}
                      entry={entry}
                      user={user}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p>No entries found for {category}</p>
            )}
          </>
        )
      )}
    </>
  );
};

export default CategoryFormEntry;
