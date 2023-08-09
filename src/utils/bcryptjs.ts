import bcryptjs from "bcryptjs";

/**
 *
 * @param password
 * @param hashPassword
 * @returns true/false
 */
export function comparePassword(password: string, hashPassword: string): boolean {
  return bcryptjs.compareSync(password, hashPassword);
}

/**
 *
 * @param password
 * @returns a password has been hashed
 */
export function hashPassword(password: string): string {
  return bcryptjs.hashSync(password, 10);
}
