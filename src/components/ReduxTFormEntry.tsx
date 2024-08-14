"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  addFormEntry,
  deleteFormEntry,
  editFormEntry,
  selectFormEntries,
  FormEntry,
} from "@/redux/formEntrySlice";
import { Categories, Category } from "@/redux/categories";
import { StatesNg, StateNg } from "@/redux/statesng";

const formSchema = z.object({
  datePurchased: z
    .string()
    .min(1, "Date Purchased is required")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date Purchased must be in YYYY-MM-DD format"
    ),
  dateReported: z.string(),
  category: z
    .string()
    .refine(
      (value): value is Category =>
        Categories.includes(value as Category) && value !== "Select Category",
      {
        message: "Please select a valid category",
      }
    ),
  item: z.string().min(1, "Item is required"),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Price must be a valid number greater than 0"
    )
    .transform((val) => parseFloat(val)),
  quantity: z
    .string()
    .refine(
      (val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
      "Quantity must be a valid number greater than 0"
    )
    .transform((val) => parseInt(val, 10)),
  state: z
    .string()
    .refine(
      (value): value is StateNg =>
        StatesNg.includes(value as StateNg) && value !== "Select State",
      {
        message: "Please select a valid state",
      }
    ),
  notes: z
    .string()
    .min(1, "Notes must contain at least 1 character")
    .max(100, "Notes cannot exceed 100 characters"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ReduxTFormEntry = () => {
  const dispatch = useAppDispatch();
  const formEntries = useAppSelector(selectFormEntries);
  const [editingId, setEditingId] = useState<string>("");
  console.log(formEntries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const dateReportedFormat = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    const [year, month, day] = data.datePurchased.split("-");
    const formattedDatePurchased = `${day}/${month}/${year}`;

    const formattedData = {
      ...data,
      datePurchased: formattedDatePurchased,
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString(), 10),
      id: uuidv4(),
    };

    dispatch(addFormEntry(formattedData));
    reset();
  };

  const onEdit = (data: FormSchemaType) => {
    const [year, month, day] = data.datePurchased.split("-");
    const formattedDatePurchased = `${day}/${month}/${year}`;

    const formattedData = {
      ...data,
      datePurchased: formattedDatePurchased,
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString(), 10),
      id: editingId,
    };

    dispatch(editFormEntry(formattedData));
    reset();
    setEditingId("");
  };

  const handleEditClick = (entry: FormEntry) => {
    const [day, month, year] = entry.datePurchased.split("/");
    const formattedDatePurchased = `${year}-${month}-${day}`;

    setValue("datePurchased", formattedDatePurchased);
    setValue("dateReported", entry.dateReported);
    setValue("category", entry.category);
    setValue("item", entry.item);
    setValue("price", entry.price);
    setValue("quantity", entry.quantity);
    setValue("state", entry.state);
    setValue("notes", entry.notes);
    setEditingId(entry.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Entry</h2>

      <form
        onSubmit={handleSubmit(editingId ? onEdit : onSubmit)}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Purchased
          </label>
          <input
            type="date"
            {...register("datePurchased")}
            onChange={(e) => {
              setValue("datePurchased", e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:cursor-pointer"
          />
          {errors.datePurchased && (
            <p className="text-red-600 text-sm">
              {errors.datePurchased.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Reported
          </label>
          <input
            type="text"
            value={dateReportedFormat}
            {...register("dateReported")}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-700 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Item
          </label>
          <input
            type="text"
            {...register("item")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
            placeholder="Enter item purchased"
          />
          {errors.item && (
            <p className="text-red-600 text-sm">{errors.item.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
            placeholder="Enter cost price of purchase"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
            placeholder="Enter quantity purchased"
          />
          {errors.quantity && (
            <p className="text-red-600 text-sm">{errors.quantity.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            {...register("state")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {StatesNg.map((stateng) => (
              <option key={stateng} value={stateng}>
                {stateng}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            {...register("notes")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
            placeholder="Enter a short note of 100 characters max"
            maxLength={100}
          />
          {errors.notes && (
            <p className="text-red-600 text-sm">{errors.notes.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingId ? "Save Changes" : "Add Entry"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Entries</h2>
      <ul className="space-y-4">
        {formEntries.map((entry) => (
          <li key={entry.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500">
                Date Purchased: {entry.datePurchased}
              </p>
              <p className="text-sm text-gray-500">
                Date Reported: {entry.dateReported}
              </p>
              <p className="text-sm text-gray-500">
                Category: {entry.category}
              </p>
              <p className="text-sm text-gray-500">Item: {entry.item}</p>
              <p className="text-sm text-gray-500">
                Price: ${entry.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {entry.quantity}
              </p>
              <p className="text-sm text-gray-500">State: {entry.state}</p>
              <p className="text-sm text-gray-500">Notes: {entry.notes}</p>
            </div>
            <button
              onClick={() => handleEditClick(entry)}
              className="text-blue-600 hover:text-blue-800 mt-2 mr-2"
            >
              Edit
            </button>
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
