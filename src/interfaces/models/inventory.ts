export interface IReservation {
  cardId: string;
  stock: number;
  createdOn: Date;
}

export interface IInventory {
  _id: string;
  productId: string;
  location: string;
  stock: number;
  shopId: string;
  reservations: IReservation[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
