export interface Review {
  _id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    image: string;
  };
  product: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
