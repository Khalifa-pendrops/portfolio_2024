import express from "express";
import cors from "cors";
import submissionRoute from "./routes/formRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

if (!process.env.GNEWS_API_KEY) {
  console.error("GNEWS_API_KEY is not defined in .env");
  process.exit(1);
}

if (!process.env.NEWS_DATA_KEY) {
  console.error("NEWS_DATA_KEY is not defined");
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/", submissionRoute);

app.get("/api/top-headlines", async (req, res) => {
  try {
    const { category, lang, country, max } = req.query;

    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        apikey: process.env.GNEWS_API_KEY,
        category: category || "general",
        lang: lang || "en",
        country: country || "us",
        max: max || 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch gNews";

    res.status(status).json({
      error: message,
      details: error.message,
    });
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const { category, language, country } = req.query;

    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: process.env.NEWS_DATA_KEY,
        q: "artificial intelligence",
        language: language || "en",
        country: country || "us",
        category: category || "technology",
        page_size: 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch AI news";

    res.status(status).json({
      error: message,
      details: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("This portfolio Backend is running! 🎉");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => {
    console.error("Error connecting to MongoDB ⛔: ", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
