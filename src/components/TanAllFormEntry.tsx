import { getFormEntries } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import { User } from "@/lib/typeGetSession";
import { TanColumns } from "./TanColumns";
import { TanDataTable } from "./TanDataTable";

interface TanAllFormEntryProps {
  user: User | null;
}

export default async function TanAllFormEntry({ user }: TanAllFormEntryProps) {
  const fetchedFormEntries: FormEntryWithMongoId[] = await getFormEntries();

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">Entries</h2>
      <TanDataTable columns={TanColumns} data={fetchedFormEntries} />
    </>
  );
}
