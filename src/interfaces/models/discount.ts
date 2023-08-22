import { ObjectId, Document } from "mongoose";

export interface IDiscount extends Document {
  name: string;
  description: string;
  type: "fixed_amount" | "percentage";
  value: number;
  code: string;
  startDate: Date;
  endDate: Date;
  maxUses: number;
  used: number;
  usersUsed: string[];
  maxUsesPerUser: number;
  minOrderValue: number;
  shopId: ObjectId;
  isActive: boolean;
  appliesTo: "all" | "specific";
  productIds: ObjectId[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
