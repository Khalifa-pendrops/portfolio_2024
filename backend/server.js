import express from "express";
import cors from "cors";
import submissionRoute from "./routes/formRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/", submissionRoute);
app.get("/api/tech-news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error! 🚫");
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ⛔: ", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
