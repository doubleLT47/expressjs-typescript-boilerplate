export interface IOnLeave {
  id: number;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  reason: string;
  status: string;
  note: string;
}
