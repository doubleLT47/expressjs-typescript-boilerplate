import { IUser } from "@interfaces/models/user";

export interface IUserListResponse {
  count: number;
  users: Partial<IUser & { roleName: string }>[];
}
