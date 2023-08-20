import { IShop } from "@interfaces/models/shop";

export interface IKeyToken {
  user: IShop;
  publicKey: string;
  privateKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
