import express from "express";
import cors from "cors";
import submissionRoute from "./routes/formRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import rateLimit from "express-rate-limit";

dotenv.config();


if (!process.env.GNEWS_API_KEY) {
  console.error("GNEWS_API_KEY is not defined in .env");
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later",
});

app.use(cors());
app.use(express.json());
app.use(limiter);


app.use("/api/", submissionRoute);


app.get("/api/top-headlines", async (req, res) => {
  try {
    const { category, lang, country, max } = req.query;

    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        category: category || "general",
        lang: lang || "en",
        country: country || "us",
        max: max || 10,
        apikey: process.env.GNEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Failed to fetch news";
    res.status(status).json({
      error: message,
      details: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => {
    console.error("Error connecting to MongoDB ⛔: ", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
