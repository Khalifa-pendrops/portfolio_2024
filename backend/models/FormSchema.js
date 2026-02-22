import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Form", FormSchema);

export default Contact;
