import express from "express";
import cors from 'cors';
import notesRoutrs from "./routs/notesRouts.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleWare/rateLimiter.js"; // FIXED NAME

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
// FIXED

app.use(rateLimiter); 

app.use((req, res, next) => {
  console.log("we got a new request");
  next();
});

app.use("/api/notes", notesRoutrs);

connectDb().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port", PORT);
  });
});




