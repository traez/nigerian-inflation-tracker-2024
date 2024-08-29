import { Metadata } from "next";
import TableData from "@/components/TableData";
import { User, columns } from "./columns";
import { DataTable } from "./DataTable";

export const metadata: Metadata = {
  title: "Table Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users'
  )
  const data = await res.json()
  return data
}

export default async function TablePage() {
  const data = await getUsers();

  return (
    <div className="min-h-screen p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

/*
 return (
    <div className="flex min-h-screen flex-col justify-start gap-4 sm:gap-8 p-4">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
        Table
      </h1>
      <TableData />
    </div>
  );
*/