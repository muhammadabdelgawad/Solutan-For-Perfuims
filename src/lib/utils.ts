import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AR_CATEGORY: Record<Category, string> = {
  perfumes: "عطور",
  makeup: "مكياج",
  skincare: "عناية بالبشرة",
};

export function formatPriceEgp(amount: number): string {
  return `${amount.toLocaleString("ar-EG")} ج.م`;
}

export function orderStatusAr(status: string): string {
  const map: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
  };
  return map[status] ?? status;
}
