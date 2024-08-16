import { getFormEntries } from "@/lib/actionsFormEntry";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import FormEntryItem from "./FormEntryItem";

export default async function AllFormEntry() {
  const fetchedFormEntries: FormEntryWithMongoId[] = await getFormEntries();

  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">Entries</h2>
      <ul className="space-y-4">
        {fetchedFormEntries.map((entry) => (
          <FormEntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </>
  );
}
