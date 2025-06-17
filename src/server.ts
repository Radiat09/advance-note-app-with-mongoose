import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://L2FirstUser:OxlI0DauIjd66t0p@cluster0.fgalepw.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to Mongodb using Mongoose!!!");
    server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
