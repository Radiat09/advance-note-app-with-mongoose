import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
  counrty: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: IAddress;
}

export interface UserInstanceMethods {
  hashPasswordSecond(pass: string): Promise<void>;
}

export interface UserStaticMethods {
  hashPassword(pass: string): string;
}

export type UserModel = Model<IUser, {}, UserInstanceMethods> &
  UserStaticMethods;
