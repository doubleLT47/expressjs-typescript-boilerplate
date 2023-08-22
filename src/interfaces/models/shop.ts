import { ObjectId } from "mongoose";

export interface IShop {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  msisdn: string;
  status: "active" | "inactive";
  verify: boolean;
  roles: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
