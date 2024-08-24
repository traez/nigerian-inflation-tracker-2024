"use client";
import { useState, useEffect } from "react";
import { getFormEntriesByUserEmail } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import FormEntryItem from "./FormEntryItem";

interface UserFormEntryProps {
    userEmails: string[];
  }

  const UserFormEntry = ({ userEmails }: UserFormEntryProps) => {
    const [selectedEmail, setSelectedEmail] = useState<string>("Select User");
    const [entries, setEntries] = useState<FormEntryWithMongoId[]>([]);

    useEffect(() => {
        if (selectedEmail !== "Select User") {
          const fetchEntries = async () => {
            const fetchedEntries = await getFormEntriesByUserEmail(selectedEmail);
            setEntries(fetchedEntries);
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
          {selectedEmail !== "Select User" && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Entries by {selectedEmail}</h2>
              <ul className="space-y-4">
                {entries.map((entry) => (
                  <FormEntryItem key={entry.mongoId} entry={entry} />
                ))}
              </ul>
            </>
          )}
        </>
      );
    };
    
    export default UserFormEntry;