import { Document, ObjectId } from "mongoose";

export interface IReservation {
  cardId: ObjectId;
  stock: number;
  createdOn: Date;
}

export interface IInventory extends Document {
  productId: ObjectId;
  location: string;
  stock: number;
  shopId: ObjectId;
  reservations: IReservation[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
