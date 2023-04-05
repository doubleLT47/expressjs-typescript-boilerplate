export interface ITimeKeeping {
  id: number;
  employee_id: number;
  date: string;
  checkin_time: string;
  checkout_time: string;
  type: number;
  notes: string;
  status: string;
  shift_id: number;
  late: number;
  early: number;
  created_at: string;
}
