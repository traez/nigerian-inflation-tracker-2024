"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFormEntryById, editFormEntry } from "@/lib/actionsFormEntry";
import { Categories, Category } from "@/lib/typeCategories";
import { StatesNg, StateNg } from "@/lib/typeStatesng";

const formSchema = z.object({
  userEmail: z.string(),
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

const EditFormEntry = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        try {
          const fetchedEntry = await getFormEntryById(id);
          const [day, month, year] = fetchedEntry.datePurchased.split("/");
          const formattedDatePurchased = `${year}-${month}-${day}`;
          reset({
            ...fetchedEntry,
            datePurchased: formattedDatePurchased,
            price: fetchedEntry.price.toString(),
            quantity: fetchedEntry.quantity.toString(),
          });
        } catch (error) {
          console.error("Error fetching form entry:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEntry();
  }, [id, reset]);

  const onSubmit = async (data: FormSchemaType) => {
    const [year, month, day] = data.datePurchased.split("-");
    const formattedDatePurchased = `${day}/${month}/${year}`;
    const formattedData = {
      ...data,
      datePurchased: formattedDatePurchased,
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString(), 10),
    };
    try {
      await editFormEntry(id, formattedData);
      router.replace("/?timestamp=" + new Date().getTime());
    } catch (error) {
      console.error("Error editing form entry:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Form Entry</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="userEmail"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <input
            id="userEmail"
            readOnly
            {...register("userEmail")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.userEmail && (
            <span className="text-red-500 text-sm">
              {errors.userEmail.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="datePurchased"
            className="block text-sm font-medium text-gray-700"
          >
            Date Purchased
          </label>
          <input
            id="datePurchased"
            readOnly
            {...register("datePurchased")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.datePurchased && (
            <span className="text-red-500 text-sm">
              {errors.datePurchased.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="item"
            className="block text-sm font-medium text-gray-700"
          >
            Item
          </label>
          <input
            id="item"
            {...register("item")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.item && (
            <span className="text-red-500 text-sm">{errors.item.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register("price")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register("quantity")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">
              {errors.quantity.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            {...register("state")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            {StatesNg.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <span className="text-red-500 text-sm">{errors.state.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.notes && (
            <span className="text-red-500 text-sm">{errors.notes.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFormEntry;
