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
  hashPassword(pass: string): Promise<void>; // Add the method directly to IUser
}

export interface UserInstanceMethods {
  hashPasswordSecond(pass: string): Promise<void>;
}

export type UserModel = Model<IUser, {}, UserInstanceMethods>;
