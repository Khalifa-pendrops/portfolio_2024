// config/mail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    // from: process.env.EMAIL_USER, // Sender address
    to: process.env.EMAIL_USER, // Recipient address (admin email)
    subject, // Email subject
    text, // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
