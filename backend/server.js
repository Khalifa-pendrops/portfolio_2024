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

app.use("/api/tech-news", async (req, res) => {
  // const { q = "tech", max = 10 } = req.query;
  res.json({ status: "healthy" });
  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("News API error:", err);
    if (err.response) {
      res.status(err.response.status).json({ error: "Error fetching news" });
    } else {
      res.status(500).json({ error: "Server error! ⛔" });
    }
  }
});

if (!process.env.API_KEY) {
  console.warn("API_KEY is not defined - news feature might not work");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ⛔: ", err));

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
