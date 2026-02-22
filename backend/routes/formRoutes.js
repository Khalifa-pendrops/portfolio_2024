import express from "express";
import Form from "../models/FormSchema.js";
import { sendMail } from "../config/mail.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 3000;

router.post("/contact", async (req, res) => {
  const email = (req.body?.email || "").trim();
  const message = (req.body?.message || "").trim();

  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and message are required.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
    });
  }

  try {
    const newForm = new Form({
      email,
      message,
    });
    await newForm.save();

    const subject = "New Form Submission";
    const text = `A new form has been submitted by a visitor:\n\nEmail: ${email}\nMessage: ${message}`;

    try {
      const adminEmail = process.env.CONTACT_ADMIN_EMAIL || "chikezie270@gmail.com";
      await sendMail(adminEmail, subject, text);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send admin notification. Please try again later.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

export default router;
