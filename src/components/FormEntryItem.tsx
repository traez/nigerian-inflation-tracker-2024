"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";
import { deleteFormEntry } from "@/lib/actionsFormEntry";
import { User } from "@/lib/typeGetSession";

interface FormEntryItemProps {
  entry: FormEntryWithMongoId;
  user: User | null;
}

const FormEntryItem: React.FC<FormEntryItemProps> = ({ entry, user }) => {
  const router = useRouter();

  const successAlert = () => {
    toast("Form entry deleted successfully");
  };

  const failAlert = () => {
    toast("Please log in with GitHub or Google to delete a post");
  };

  const unauthorizedAlert = () => {
    toast("You can only edit or delete posts that you created.");
  };

  const handleDelete = async (mongoId: string) => {
    if (!user) {
      failAlert();
      return;
    }

    const userEmailSplit = user.email.split("@")[0];

    if (entry.userEmail !== userEmailSplit) {
      unauthorizedAlert();
      return;
    }

    try {
      const result = await deleteFormEntry(mongoId);
      if (result.message === "Form entry deleted successfully") {
        successAlert();
        setTimeout(() => {
          router.refresh();
        }, 4100);
      }
    } catch (error) {
      console.error("Failed to delete form entry:", error);
    }
  };

  const handleEdit = () => {
    if (!user) {
      failAlert();
      return;
    }

    const userEmailSplit = user.email.split("@")[0];

    if (entry.userEmail !== userEmailSplit) {
      unauthorizedAlert();
      return;
    }

    router.push(`/edit/${entry.mongoId}`);
  };

  return (
    <li key={entry.id} className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-500">User Email: {entry.userEmail}</p>
        <p className="text-sm text-gray-500">
          Date Purchased: {entry.datePurchased}
        </p>
        <p className="text-sm text-gray-500">
          Date Reported: {entry.dateReported}
        </p>
        <p className="text-sm text-gray-500">Category: {entry.category}</p>
        <p className="text-sm text-gray-500">Item: {entry.item}</p>
        <p className="text-sm text-gray-500">
          Price: <span>&#8358;</span>
          {entry.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">Quantity: {entry.quantity}</p>
        <p className="text-sm text-gray-500">State: {entry.state}</p>
        <p className="text-sm text-gray-500">Notes: {entry.notes}</p>
      </div>
      <button
        onClick={handleEdit}
        className="text-blue-600 hover:text-blue-800 mt-2 mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(entry.mongoId)}
        className="text-red-600 hover:text-red-800 mt-2"
      >
        Delete
      </button>
    </li>
  );
};

export default FormEntryItem;
