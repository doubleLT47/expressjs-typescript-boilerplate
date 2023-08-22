import { IKeyToken } from "@interfaces/models/key-token";
import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

export const MShop = model<IKeyToken>(
  DOCUMENT_NAME,
  new Schema<IKeyToken>(
    {
      user: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: "Shop",
      },
      publicKey: {
        type: String,
        trim: true,
      },
      privateKey: {
        type: String,
        trim: true,
      },
      refreshTokensUsed: {
        type: Schema.Types.Mixed,
        default: [],
      },
      refreshToken: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      collection: COLLECTION_NAME,
    }
  )
);
