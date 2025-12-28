export interface User {
  _id: string;
  name: string;
  slug: string;
  email: string;
  role: UserRoles;
  isDeleted: boolean;
  wishlist: [];
  addresses: [];
  createdAt: string;
  updatedAt: string;
  phone?: string;
}

export type UserRoles = "admin" | "user" | "manager";
