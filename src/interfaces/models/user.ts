import { IPost } from "./post";
import { IRole } from "./role";

export interface IUser {
  id?: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  phone: string;
  email: string;
  password: string;
  roleId: number;
  enable: boolean;
  profile:
    | {
        avatar: string | null;
        dob: Date | null;
        address: string | null;
        password: {
          code: string | null;
          createdAt: Date | null;
        };
        accessToken: string | null;
        refreshToken: string | null;
      }
    | any;
  createdAt?: Date;
  updatedAt?: Date;
  role?: IRole;
  posts?: IPost[];
}
