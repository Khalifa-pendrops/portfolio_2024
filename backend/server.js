import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUriParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/api/contact", async (req, res) => {
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
    res.status(500).json({ error: "Server error. Please try again later" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
