import express from "express";
import Form from "../models/FormSchema.js";
import { sendMail } from "../config/mail.js";
import dotenv from "dotenv";

dotenv.config(); 

const router = express.Router();

router.post("/contact", async (req, res) => {
  console.log("Request Body:", req.body); 
  const { email, message } = req.body;

  if ( !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and message are required.",
    });
  }

  try {
    const newForm = new Form({ email, message });
    await newForm.save();

    const subject = "New Form Submission";
    const text = `Email: ${email}\nMessage: ${message}`;

    try {
      await sendMail(process.env.EMAIL_USER, subject, text);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send email. Please try again later.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error handling form submission: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

export default router;
