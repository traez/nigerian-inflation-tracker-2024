"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  addFormEntry,
  deleteFormEntry,
  selectFormEntries,
} from "@/redux/formEntrySlice";

const formSchema = z.object({
    date: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    item: z.string().min(1, "Item is required"),
    category: z.string().min(1, "Category is required"),
    price: z.string().refine(val => !isNaN(parseFloat(val)), "Price must be a valid number").transform(val => parseFloat(val)),
    state: z.string().min(1, "State is required"),
    quantity: z.string().refine(val => !isNaN(parseInt(val, 10)), "Quantity must be a valid number").transform(val => parseInt(val, 10)),
    notes: z.string().max(100, "Notes cannot exceed 100 characters"),
  });

type FormSchemaType = z.infer<typeof formSchema>;

const ReduxTFormEntry = () => {
  const dispatch = useAppDispatch();
  const formEntries = useAppSelector(selectFormEntries);
  console.log(formEntries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchemaType) => {
    // Convert the price and quantity from strings to numbers
    const formattedData = {
      ...data,
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString(), 10),
      id: uuidv4(),
      date: new Date().toLocaleDateString('en-GB') // Use localeDateString to get DD/MM/YYYY format
    };
  
    dispatch(addFormEntry(formattedData));
    reset();
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Entry</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            {...register("date")}
            placeholder="DD/MM/YYYY"
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item</label>
          <input
            type="text"
            {...register("item")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.item && <p className="text-red-600 text-sm">{errors.item.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            {...register("category")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            {...register("price")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            {...register("state")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register("quantity")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.quantity && <p className="text-red-600 text-sm">{errors.quantity.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            {...register("notes")}
           className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            maxLength={100}
          />
          {errors.notes && <p className="text-red-600 text-sm">{errors.notes.message}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Entry
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Entries</h2>
      <ul className="space-y-4">
        {formEntries.map((entry) => (
          <li key={entry.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Item: {entry.item}
              </p>
              <p className="text-sm text-gray-500">
                Category: {entry.category}
              </p>
              <p className="text-sm text-gray-500">
                Price: ${entry.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Date: {entry.date}</p>
              <p className="text-sm text-gray-500">State: {entry.state}</p>
              <p className="text-sm text-gray-500">
                Quantity: {entry.quantity}
              </p>
              <p className="text-sm text-gray-500">Notes: {entry.notes}</p>
            </div>
            <button
              onClick={() => dispatch(deleteFormEntry(entry.id))}
              className="text-red-600 hover:text-red-800 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReduxTFormEntry;
