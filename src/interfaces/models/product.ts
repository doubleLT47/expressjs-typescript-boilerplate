import { IShop } from "@interfaces/models/shop";
import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  name: string;
  thumb: string;
  description: string;
  slug: string;
  price: number;
  quality: number;
  type: "Electronics" | "Clothing" | "Furniture";
  shop: IShop["_id"];
  attributes: any;
  ratingsAverage: number;
  variations: any[];
  isDraft: boolean;
  isPublished: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IElectronicProduct extends Document {
  manufacturer: string;
  model: string;
  color: string;
  shop: IShop["_id"];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IClothingProduct extends Document {
  brand: string;
  size: string;
  material: string;
  shop: IShop["_id"];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IFurnitureProduct extends Document {
  brand: string;
  size: string;
  material: string;
  shop: IShop["_id"];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
