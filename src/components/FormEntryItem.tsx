"use client";
import { FormEntry } from "@/lib/typeFormEntry";

interface FormEntryItemProps {
  entry: FormEntry;
}

const FormEntryItem: React.FC<FormEntryItemProps> = ({ entry }) => {
  return (
    <li key={entry.id} className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-500">User Email: {entry.userEmail}</p>
        <p className="text-sm text-gray-500">Date Purchased: {entry.datePurchased}</p>
        <p className="text-sm text-gray-500">Date Reported: {entry.dateReported}</p>
        <p className="text-sm text-gray-500">Category: {entry.category}</p>
        <p className="text-sm text-gray-500">Item: {entry.item}</p>
        <p className="text-sm text-gray-500">Price: ${entry.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Quantity: {entry.quantity}</p>
        <p className="text-sm text-gray-500">State: {entry.state}</p>
        <p className="text-sm text-gray-500">Notes: {entry.notes}</p>
      </div>
      <button onClick={() => console.log("edit")} className="text-blue-600 hover:text-blue-800 mt-2 mr-2">
        Edit
      </button>
      <button onClick={() => console.log("delete")} className="text-red-600 hover:text-red-800 mt-2">
        Delete
      </button>
    </li>
  );
};

export default FormEntryItem;
