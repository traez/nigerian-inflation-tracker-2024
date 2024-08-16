import { getFormEntries } from "@/lib/actionsFormEntry";
import { FormEntry } from "@/lib/typeFormEntry";
import FormEntryItem from "./FormEntryItem";

export default async function AllFormEntry() {
  const fetchedFormEntries = await getFormEntries();
  const fetchedFormEntries2: (FormEntry & { mongoId: string })[] = JSON.parse(
    JSON.stringify(fetchedFormEntries)
  );

  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">Entries</h2>
      <ul className="space-y-4">
        {fetchedFormEntries2.map((entry) => (
          <FormEntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </>
  );
}
