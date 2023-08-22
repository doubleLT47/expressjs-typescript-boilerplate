import { IDiscount } from "@interfaces/models/discount";
import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";
export const MShop = model<IDiscount>(
  DOCUMENT_NAME,
  new Schema<IDiscount>(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "fixed_amount", // percentage
      },
      value: {
        type: Number,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      maxUses: {
        type: Number,
        required: true,
      },
      used: {
        type: Number,
        required: true,
      },
      usersUsed: {
        type: Schema.Types.Mixed,
        default: [],
      },
      maxUsesPerUser: {
        type: Number,
        required: true,
      },
      minOrderValue: {
        type: Number,
        required: true,
      },
      shopId: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      appliesTo: {
        type: String,
        required: true,
        enum: ["all", "specific"],
      },
      productIds: {
        type: Schema.Types.Mixed,
        default: [],
      },
    },
    {
      timestamps: true,
      collection: COLLECTION_NAME,
    }
  )
);
