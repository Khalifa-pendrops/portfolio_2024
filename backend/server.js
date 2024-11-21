// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import Contact from "./models/Contact.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//   "https://your-production-frontend.com", // Production
//   "http://localhost:5173", // Development
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // This is to handle preflight requests (CORS wahala)
// app.options("*", cors());
// app.use(bodyParser.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// app.post("/api/contact", async (req, res) => {
//   console.log("Request body:", req.body);
//   try {
//     const { email, message } = req.body;
//     if (!email || !message) {
//       return res.status(400).json({ error: "Email and Message are required." });
//     }
//     const newContact = new Contact({ email, message });
//     await newContact.save();
//     res.status(201).json({ message: "Contact form submitted successfully." });
//   } catch (error) {
//     console.error(error);
//     console.error("Error in /api/contact route:", error.message);
//     res.status(500).json({ error: "Server error. Please try again later" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
  "https://your-production-frontend.com", // Production
  "http://localhost:5173", // Development
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

// Handle preflight requests
app.options("*", cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

app.post("/api/contact", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and Message are required." });
    }

    // Save the contact form to the database
    const newContact = new Contact({ email, message });
    await newContact.save();

    // Send an email notification
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address
      to: process.env.NOTIFY_EMAIL, // Your email address to receive notifications
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
