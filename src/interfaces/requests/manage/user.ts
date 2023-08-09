export interface IListQuery {
  search?: string;
  enable?: boolean;
  roleId?: number;
  page: number;
  limit: number;
}

export interface IDetailParams {
  id: number;
}

export interface ICreateBody {
  lastName: string;
  firstName: string;
  middleName?: string;
  phone: string;
  email: string;
  roleId: number;
}

export interface IUpdateBody {
  lastName: string;
  firstName: string;
  middleName?: string;
  phone: string;
  email: string;
  roleId: number;
}

export interface IUpdateParams {
  id: number;
}

export interface IDeleteParams {
  id: number;
}

export interface IEnableParams {
  id: number;
}

export interface IDisableParams {
  id: number;
}
