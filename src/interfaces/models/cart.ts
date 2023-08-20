export interface ICartProduct {
  productId: string;
  shopId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface ICart {
  _id?: string;
  state: string;
  products: ICartProduct[];
  countProduct: number;
  userId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
