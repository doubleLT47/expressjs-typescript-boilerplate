export interface IComment {
  _id: string;
  productId: string;
  userId: string;
  content: string;
  left: number;
  right: number;
  parentId: string;
  isDeleted: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
