import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://your-production-frontend.com",
  "http://localhost:5173",
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Enable CORS for all routes
// This should handle preflight requests
app.options("*", cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and Message are required." });
    }

    const newContact = new Contact({ email, message });
    await newContact.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "New Contact Form Submission",
      text: `You have a new contact form submission:
      
      Email: ${email}
      Message: ${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error in /api/contact route:", error.message);
    res.status(500).json({ error: "Server error. Please try again later" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
