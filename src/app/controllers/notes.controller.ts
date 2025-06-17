import express, { Request, Response } from "express";
import Note from "../models/notes.model";

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  //* Approch one
  // const myNote = new Note({
  //   title: "Learning mongoose",
  //   content: "I am learning mongoose",
  // tags: {
  //   label: "database",
  // },
  // });

  // await myNote.save();

  //* second approch
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created succesfully",
    note: note,
  });
});

notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");
  res.status(201).json({
    success: true,
    message: "All notes here",
    note: notes,
  });
});

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // const note = await Note.findOne({ _id: noteId });
  // const note = await Note.findOne({ title: "Learning express" });
  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Your note is here",
    note: note,
  });
});

notesRoutes.patch("/update/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const noteBody = req.body;

  // const note = await Note.updateOne({ _id: noteId }, noteBody, { new: true });
  // const note = await Note.findOneAndUpdate({ _id: noteId }, noteBody, {
  //   new: true,
  // });
  const note = await Note.findByIdAndUpdate(noteId, noteBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Your note has been updated",
    note: note,
  });
});

notesRoutes.delete("/delete/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  // const note = await Note.deleteOne({ _id: noteId });
  await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    success: true,
    message: "Your note has been deleted",
  });
});
