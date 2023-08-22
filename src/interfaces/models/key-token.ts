import { IShop } from "@interfaces/models/shop";
import { Document } from "mongoose";

export interface IKeyToken extends Document {
  user: IShop["_id"];
  publicKey: string;
  privateKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
