import express from "express";
import cors from "cors";
import submissionRoute from "./routes/formRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/", submissionRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ⛔: ", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
