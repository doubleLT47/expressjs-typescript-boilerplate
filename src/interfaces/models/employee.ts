export interface IEmployee {
  id: number;
  last_name: string;
  first_name: string;
  id_on_sapogo?: string;
  id_on_chatbot?: string;
  id_on_manychat?: string;
  phone_number?: string;
  password?: string;
  dob?: string;
  email?: string;
  address?: string;
  status: number;
  sapogo_active?: number;
  basic_salary?: number;
  basic_number_working_days?: number;
  other_agreement?: string;
  bonus_overtime_percent?: number;
  bonus_holiday_percent?: number;
  reset_password_token?: string;
  role?: string;
  department_id?: number;
  zalo_uid?: string;
  active_at: Date;
}
