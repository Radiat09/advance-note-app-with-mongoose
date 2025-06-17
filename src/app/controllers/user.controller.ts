import express, { Request, Response } from "express";
import User from "../models/user.model";
import { z } from "zod";

export const userRoutes = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await createUserZodSchema.parseAsync(req.body);
    const body = req.body;
    // const passoword = await bcrypt.hash(body?.passoword, 10);
    // console.log("Password from user controller", passoword);

    // * Instance method
    // const user = new User(body);
    // await user.hashPasswordSecond(body.passoword);

    // * static method
    const hashedPass = await User.hashPassword(body.password);

    console.log(hashedPass);
    body.password = hashedPass;

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User has been created!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All users here!",
    users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "Your user is here!",
    user,
  });
});

userRoutes.patch("/update/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userBody = req.body;

  const user = await User.findByIdAndUpdate(userId, userBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Your user has been updated",
    user,
  });
});

userRoutes.delete("/delete/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  // const note = await Note.deleteOne({ _id: noteId });
  await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "Your note has been deleted",
  });
});
