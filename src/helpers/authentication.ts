import { hashSync } from "bcrypt";

export const hashPassword = (password: string): string => {
  return hashSync(password, 16);
};
