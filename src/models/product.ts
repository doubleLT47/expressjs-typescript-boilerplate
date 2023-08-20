import { IClothingProduct, IElectronicProduct, IProduct } from "@interfaces/models/product";
import generateSlug from "@utils/generate-slug";
import { model, Schema } from "mongoose";
import { generate } from "randomstring";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const DOCUMENT_CLOTHING_NAME = "Clothings";
const COLLECTION_CLOTHING_NAME = "Clothings";
const DOCUMENT_ELECTRON_NAME = "Electron";
const COLLECTION_ELECTRON_NAME = "Electrons";
const DOCUMENT_FURNITURE_NAME = "Furniture";
const COLLECTION_FURNITURE_NAME = "Furnitures";

export const MProduct = model<IProduct>(
  DOCUMENT_NAME,
  new Schema<IProduct>(
    {
      name: {
        type: String,
        trim: true,
        maxLength: 150,
      },
      thumb: {
        type: String,
        unique: true,
        trim: true,
      },
      description: {
        type: String,
      },
      slug: String,
      price: {
        type: Number,
        required: true,
      },
      quality: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["Electronics", "Clothing", "Furniture"],
      },
      shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
      attributes: {
        type: Schema.Types.Mixed,
        required: true,
      },
      ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be above 5.0"],
        set: (val: number) => Math.round(val * 10) / 10,
      },
      variations: {
        type: Schema.Types.Mixed,
        default: [],
      },
      isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false,
      },
      isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false,
      },
    },
    {
      timestamps: true,
      collection: COLLECTION_NAME,
    }
  )
    .index({
      name: "text",
      description: "text",
    })
    .pre("save", function (next) {
      this.slug = generateSlug(this.name);
    })
);

export const MElectronic = model<IProduct>(
  DOCUMENT_ELECTRON_NAME,
  new Schema<IElectronicProduct>(
    {
      manufacturer: { type: String, required: true },
      model: String,
      color: String,
      shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
    },
    {
      collection: COLLECTION_ELECTRON_NAME,
      timestamps: true,
    }
  )
);

export const MClothing = model<IProduct>(
  DOCUMENT_CLOTHING_NAME,
  new Schema<IClothingProduct>(
    {
      brand: { type: String, required: true },
      size: String,
      material: String,
      shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
    },
    {
      collection: COLLECTION_CLOTHING_NAME,
      timestamps: true,
    }
  )
);

export const MFurniture = model<IProduct>(
  DOCUMENT_FURNITURE_NAME,
  new Schema<IClothingProduct>(
    {
      brand: { type: String, required: true },
      size: String,
      material: String,
      shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
    },
    {
      collection: COLLECTION_FURNITURE_NAME,
      timestamps: true,
    }
  )
);
