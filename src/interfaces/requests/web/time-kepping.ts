import { CTimeKeepingStatus } from "../../../constants/time-keeping";

export interface IListQuery {
  month?: Date;
  status?: CTimeKeepingStatus;
}

export interface IListParams {
  zalo_id: string;
}
