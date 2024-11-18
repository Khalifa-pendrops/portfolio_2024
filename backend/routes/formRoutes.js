// import express from "express";
// import Form from "../models/Form.js";
// import { sendEmail } from "../config/mail.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { email, message } = req.body;
//   try {
//     const newForm = new Form({ email, message });
//     await newForm.save();

//     const subject = "New Form Submission";
//     const text = "Name: ${name}\nEmail: ${email}\nMessage: ${message}";
//     await sendEmail(process.env.ADMIN_EMAIL, subject, text);

//     res
//       .status(201)
//       .json({ success: true, message: "Form submitted successfully" });
//   } catch (error) {
//     console.error("Error handling form submission: ", error);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// });

// export default router;

import express from "express";
import Form from "../models/Form.js";
import { sendEmail } from "../config/mail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, message, name } = req.body;

  // Validate the input
  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and message are required.",
    });
  }

  try {
    // Save form data to the database
    const newForm = new Form({ email, message });
    await newForm.save();

    // Send email notification
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

    // Respond to the frontend
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
