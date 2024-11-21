import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5173",
  "https://my-portfolio-most-recent-2024.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// app.use(
//   cors({
//     // origin: "http://localhost:3000", // Replace with your frontend URL
//     origin: "https://my-portfolio-most-recent-2024.vercel.app",
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type",
//   })
// );

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/api/contact", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ error: "Email and Message are required." });
    }
    const newContact = new Contact({ email, message });
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error(error);
    console.error("Error in /api/contact route:", error.message);
    res.status(500).json({ error: "Server error. Please try again later" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
