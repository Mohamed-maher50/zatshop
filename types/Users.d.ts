export interface User {
  _id: string;
  name: string;
  slug: string;
  email: string;
  role: UserRoles;
  isDeleted: boolean;
  wishlist: [];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  phone?: string;
  image?: string;
}
export interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  governorate: string;
  city: string;
  phone: string;
}

export type UserRoles = "admin" | "user" | "manager";
