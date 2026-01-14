import { PAYMENT_METHODS } from "@/constants/Payments";

export * from "./Product";
export * from "./categories";
export * from "./subcategories";
export * from "./pagination";
export * from "./coupons";
export * from "./brands";
export * from "./Users";
export * from "./api";

export type PAYMENT_METHODS_Type = (typeof PAYMENT_METHODS)[number];
