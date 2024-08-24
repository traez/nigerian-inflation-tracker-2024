"use client";
import UserFormEntry from "@/components/UserFormEntry";
import { useState, useEffect } from "react";
import { getUserEmails } from "@/lib/actionsFormEntry";

const UserListFormEntry = () => {
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
      <UserFormEntry userEmails={userEmails} />
    </>
  );
};

export default UserListFormEntry;
