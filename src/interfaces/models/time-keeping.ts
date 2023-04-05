export interface ITimeKeeping {
  id: number;
  employee_id: number;
  date: Date;
  checkin_time: Date;
  checkout_time?: Date;
  note?: string;
  type: number;
  shift_id?: number;
  start_time?: Date;
  end_time?: Date;
  status: string;
  is_late: number;
  is_early: number;
}
