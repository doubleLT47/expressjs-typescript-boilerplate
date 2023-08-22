import { IInventory } from "@interfaces/models/inventory";
import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

export const MShop = model<IInventory>(
  DOCUMENT_NAME,
  new Schema<IInventory>(
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      location: {
        type: String,
        default: "unKnow",
      },
      stock: {
        type: Number,
        required: true,
      },
      shopId: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
      reservations: {
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
