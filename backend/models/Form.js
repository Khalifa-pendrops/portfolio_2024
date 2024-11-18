import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Form = mongoose.model("Form", formSchema);
export default Form;



