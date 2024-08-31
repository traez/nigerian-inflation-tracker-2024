"use client";
import UserFormEntry from "@/components/UserFormEntry";
import { useState, useEffect } from "react";
import { getUserEmails } from "@/lib/actionsFormEntry";
import { User } from "@/lib/typeGetSession";

interface UserListFormEntryProps {
  user: User | null;
}

const UserListFormEntry: React.FC<UserListFormEntryProps> = ({ user }) => {
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const emails = await getUserEmails();
        setUserEmails(emails);
      } catch (error) {
        console.error("Error fetching user emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmails();
  }, []);

  if (loading) {
    return <p>Loading user emails...</p>;
  }

  return (
    <>
      <UserFormEntry userEmails={userEmails} user={user} />
    </>
  );
};

export default UserListFormEntry;
