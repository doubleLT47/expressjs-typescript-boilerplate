import { IUser } from "@interfaces/models/user";

export interface ILoginResponse {
  user: Partial<IUser & { roleName: string }>;
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
