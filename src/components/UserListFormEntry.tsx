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

  useEffect(() => {
    const fetchUserEmails = async () => {
      const emails = await getUserEmails();
      setUserEmails(emails);
    };

    fetchUserEmails();
  }, []);

  return (
    <>
      <UserFormEntry userEmails={userEmails} user={user}/>
    </>
  );
};

export default UserListFormEntry;
