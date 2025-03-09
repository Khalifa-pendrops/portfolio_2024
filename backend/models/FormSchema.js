import mongoose from "mongoose";
// import { Timestamp } from "./../../node_modules/bson/src/timestamp";

const FormSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    _id: false,
  }
);

const Contact = mongoose.model("Form", FormSchema);

export default Contact;
