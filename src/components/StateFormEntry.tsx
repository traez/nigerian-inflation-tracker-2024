"use client";
import { useState, useEffect } from "react";
import { getFormEntriesByState } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import { StatesNg, StateNg } from "@/lib/typeStatesng";
import FormEntryItem from "./FormEntryItem";
import { User } from "@/lib/typeGetSession";

interface StateFormEntryProps {
  user: User | null;
}

const StateFormEntry: React.FC<StateFormEntryProps> = ({ user }) => {
  const [state, setState] = useState<StateNg>("Select State");
  const [entries, setEntries] = useState<FormEntryWithMongoId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEntries = async () => {
      if (state !== "Select State") {
        setLoading(true);
        try {
          const fetchedEntries = await getFormEntriesByState(state);
          setEntries(fetchedEntries);
        } catch (error) {
          console.error("Failed to fetch entries:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEntries();
  }, [state]);

  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">Select State</h2>
      <select
        value={state}
        onChange={(e) => setState(e.target.value as StateNg)}
        className="p-2 border rounded"
      >
        {StatesNg.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        state !== "Select State" && (
          <>
            {entries.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Entries in {state}
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
              <p>No entries found for {state}</p> 
            )}
          </>
        )
      )}
    </>
  );
};

export default StateFormEntry;
