export const Categories = [
  "Select Category",
  "Housing & Utilities",
  "Food & Beverages",
  "Transportation",
  "Healthcare",
  "Household Essentials",
  "Personal Care",
  "Childcare & Education",
  "Clothing & Footwear",
  "Entertainment",
] as const;

export type Category = (typeof Categories)[number];
