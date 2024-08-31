"use client";
import { useState, useEffect } from "react";
import { getFormEntriesByUserEmail } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import FormEntryItem from "./FormEntryItem";
import { User } from "@/lib/typeGetSession";

interface UserFormEntryProps {
  userEmails: string[];
  user: User | null;
}

const UserFormEntry = ({ userEmails, user }: UserFormEntryProps) => {
  const [selectedEmail, setSelectedEmail] = useState<string>("Select User");
  const [entries, setEntries] = useState<FormEntryWithMongoId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedEmail !== "Select User") {
      setLoading(true); // Start loading
      const fetchEntries = async () => {
        try {
          const fetchedEntries = await getFormEntriesByUserEmail(selectedEmail);
          setEntries(fetchedEntries);
        } catch (error) {
          console.error("Error fetching entries:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchEntries();
    }
  }, [selectedEmail]);

  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">Select User</h2>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="Select User">Select User</option>
        {userEmails.map((email) => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading entries...</p> // Display loading indicator
      ) : selectedEmail !== "Select User" ? (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Entries by {selectedEmail}
          </h2>
          <ul className="space-y-4">
            {entries.map((entry) => (
              <FormEntryItem key={entry.mongoId} entry={entry} user={user} />
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default UserFormEntry;
