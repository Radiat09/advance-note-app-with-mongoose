import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserModel,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const addressSchema = new Schema<IAddress>(
  {
    city: String,
    street: String,
    zip: Number,
    counrty: String,
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserModel, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [
        3,
        "Firstname must be at least 3 characters long. got {VALUE}",
      ],
      maxlength: 12,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Basur a age boro how tarpor ekhane asho, tumi kebol {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      required: true,
      unique: [
        true,
        "Email has been used by another account, please choose another one",
      ],
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      //   },
      //   message: function (props) {
      //     return `${props.value} is not a valid email`;
      //   },
      // },
      validate: [
        validator.isEmail,
        "{VALUE} is not a valid email. Please enter a valid email!",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "{VALUE} is not supported.",
      },
      default: "USER",
    },
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.method(
  "hashPasswordSecond",
  async function hashPasswordSecond(pass: string) {
    const password = await bcrypt.hash(pass, 10);
    this.password = password;
    await this.save();
  }
);

userSchema.methods.hashPassword = async function hashPassword(pass: string) {
  const password = await bcrypt.hash(pass, 10);
  this.password = password;
  await this.save();
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
