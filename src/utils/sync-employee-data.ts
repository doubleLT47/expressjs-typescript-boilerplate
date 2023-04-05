import { MEmployee } from "../models/employee";
import DB from "../config/db";
export default async () => {
  try {
    const [results, metadata] = await DB.sequelize.query("select * from hr.employees");
    const employees: any[] = getEmployees(results);
    await MEmployee.bulkCreate(employees);
  } catch (e) {
    console.log(e);
  }
};

const getEmployees = (rows: any[]): any[] =>
  rows.map((row: any) => ({
    id: row.id,
    last_name: row.last_name,
    first_name: row.first_name,
    id_on_sapogo: row.id_on_sapogo,
    id_on_chatbot: row.id_on_chatbot,
    id_on_manychat: row.id_on_manychat,
    phone_number: row.phone_number,
    password: row.password,
    dob: row.dob,
    email: row.email,
    address: row.address,
    status: row.status,
    sapogo_active: row.sapogo_activate,
    basic_salary: row.basic_salary,
    basic_number_working_days: row.basic_number_working_days,
    other_agreement: row.other_agreement,
    bonus_overtime_percent: row.bonus_overtime_percent,
    bonus_holiday_percent: row.bonus_holiday_percent,
    reset_password_token: row.reset_token,
    role: row.role,
    department_id: row.department_id,
    zalo_uid: row.zalo_uid,
    active_at: null,
    created_at: row.created_on,
    updated_at: row.created_on,
  }));
