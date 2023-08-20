import { IShop } from "@interfaces/models/shop";

export interface IProduct {
  _id?: string;
  name: string;
  thumb: string;
  description: string;
  slug: string;
  price: number;
  quality: number;
  type: "Electronics" | "Clothing" | "Furniture";
  shop: IShop;
  attributes: any;
  ratingsAverage: number;
  variations: any[];
  isDraft: boolean;
  isPublished: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IElectronicProduct {
  _id?: string;
  manufacturer: string;
  model: string;
  color: string;
  shop: IShop;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IClothingProduct {
  brand: string;
  size: string;
  material: string;
  shop: IShop;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IFurnitureProduct {
  brand: string;
  size: string;
  material: string;
  shop: IShop;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
