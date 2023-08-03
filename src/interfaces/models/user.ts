import { IPost } from "./post";
import { IRole } from "./role";

export interface IUser {
  id?: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
  password: string;
  roleId: number | null;
  enable: boolean;
  profile: {
    avatar: string | null;
    dob: Date | null;
    address: string | null;
    email: {
      code: string | null;
      active: false;
      activeAt: Date | null;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
  role?: IRole;
  posts?: IPost[];
}
