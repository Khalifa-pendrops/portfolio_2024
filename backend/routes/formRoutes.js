import express from "express";
import Form from "../models/Form.js";
import { sendEmail } from "../config/mail.js";

const router = express.Router();

router.post("/api/contact", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and message are required.",
    });
  }

  try {
    const newForm = new Form({ email, message });
    await newForm.save();


    const subject = "New Form Submission";
    const text = `Name: ${name || "N/A"}\nEmail: ${email}\nMessage: ${message}`;

    try {
      await sendEmail(process.env.ADMIN_EMAIL, subject, text);
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
