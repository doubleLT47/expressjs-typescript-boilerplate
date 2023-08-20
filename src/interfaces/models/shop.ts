export interface IShop {
  _id: string;
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
