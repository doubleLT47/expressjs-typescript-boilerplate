import { ObjectId, Document } from "mongoose";

type ApiPermissionType = "0000" | "1111" | "2222";

export interface IApiKey extends Document {
  key: string;
  status: boolean;
  permission: ApiPermissionType[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
