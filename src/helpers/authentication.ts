import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const comparePasswords = (
  passwordInput: string,
  userPassword: string
) => {
  return compareSync(passwordInput, userPassword);
};
