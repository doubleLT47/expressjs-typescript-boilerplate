import { IShop } from "@interfaces/models/shop";
import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

export const MShop = model<IShop>(
  DOCUMENT_NAME,
  new Schema<IShop>(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      msisdn: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
      verify: {
        type: Schema.Types.Boolean,
        default: false,
      },
      roles: {
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
