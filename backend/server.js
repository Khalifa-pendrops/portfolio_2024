import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import formRoutes from "./routes/formRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://my-portfolio-most-recent-2024.vercel.app/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/form", formRoutes);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error.message);
//     process.exit(1);
//   }
// };

// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const contactSchema = new mongoose.Schema({
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", contactSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/message", async (req, res) => {
  const { email, message } = req.body;

  const newMessage = new Message({ email, message });
  try {
    await newMessage.save();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Message from Your Portfolio",
      text: `Email: ${email}\nMessage: ${message}`,
    });
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import path from "path";
console.log("Current directory:", path.resolve("."));
console.log("MongoDB URI:", process.env.MONGO_URI);
