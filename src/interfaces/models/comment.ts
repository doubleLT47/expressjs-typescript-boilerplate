import { Document, ObjectId } from "mongoose";

export interface IComment extends Document {
  productId: ObjectId;
  userId: ObjectId;
  content: string;
  left: number;
  right: number;
  parentId: ObjectId | null;
  isDeleted: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
