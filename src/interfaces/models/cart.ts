import { Document, ObjectId } from "mongoose";

export interface ICartProduct {
  productId: ObjectId;
  shopId: ObjectId;
  quantity: number;
  name: string;
  price: number;
}

export interface ICart extends Document {
  state: string;
  products: ICartProduct[];
  countProduct: number;
  userId: ObjectId;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
