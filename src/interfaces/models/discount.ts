export interface IDiscount {
  _id?: string;
  name: string;
  description: string;
  type: "fixed_amount" | "percentage";
  value: number;
  code: string;
  startDate: Date;
  endDate: Date;
  maxUses: number;
  used: number;
  usersUsed: string[];
  maxUsesPerUser: number;
  minOrderValue: number;
  shopId: string;
  isActive: boolean;
  appliesTo: "all" | "specific";
  productIds: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
