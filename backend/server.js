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

if (!process.env.GERMINI_API_KEY) {
  console.error("GERMINI_API_KEY is not defined in .env");
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
        lang: req.query.lang || "en",
        country: req.query.country || "us",
        // max: req.query.max || 10,
        max: 9,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("News fetch error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Unknown error fetching news",
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
        language: req.query.language || "en",
        country: req.query.country || "us",
        category: req.query.category || "technology",
        // page_size: req.query.page_size || 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("News fetch error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Unknown error fetching news",
    });
  }
});

app.post("/api/ai", async (req, res) => {
  const prompt = (req.body?.prompt || "").trim();

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const model = process.env.GERMINI_MODEL || "gemini-1.5-flash";
    const apiKey = process.env.GERMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      { timeout: 20000 }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ response: text });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "AI request failed",
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
