import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = (from, to, subject, text) => {
  return transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
  // const mailOptions = {
  //   from,
  //   to,
  //   subject,
  //   text,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error sending email:", error);
  //   } else {
  //     console.log("Email sent:", info.response);
  //   }
  // });
};
