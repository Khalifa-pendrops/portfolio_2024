import express from "express";
import cors from "cors";
import submissionRoute from "./routes/formRoutes.js";
import mongoose from "mongoose";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const warnMissingEnv = (name, feature) => {
  if (!process.env[name]) {
    console.warn(`${name} is not defined. ${feature} will be unavailable.`);
  }
};

warnMissingEnv("GNEWS_API_KEY", "Top headlines");
warnMissingEnv("NEWS_DATA_KEY", "AI news");
warnMissingEnv("GERMINI_API_KEY", "AI assistant");
warnMissingEnv("MONGODB_URI", "Contact form storage");

const app = express();
const PORT = process.env.PORT || 5000;
app.locals.dbReady = false;

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /^https?:\/\/localhost(?::\d+)?$/.test(origin) ||
      /^https?:\/\/127\.0\.0\.1(?::\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/", submissionRoute);

app.get("/api/top-headlines", async (req, res) => {
  if (!process.env.GNEWS_API_KEY) {
    return res.status(503).json({
      error: "GNEWS_API_KEY is not configured.",
    });
  }

  try {
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
  if (!process.env.NEWS_DATA_KEY) {
    return res.status(503).json({
      error: "NEWS_DATA_KEY is not configured.",
    });
  }

  try {
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
  if (!process.env.GERMINI_API_KEY) {
    return res.status(503).json({
      error: "GERMINI_API_KEY is not configured.",
    });
  }

  const prompt = (req.body?.prompt || "").trim();
  const ip = req.ip || req.socket.remoteAddress || "unknown";

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  if (prompt.length > 1500) {
    return res.status(400).json({ error: "Prompt too long." });
  }

  const now = Date.now();
  if (!global.__aiRateLimitStore) {
    global.__aiRateLimitStore = new Map();
  }
  const bucket = global.__aiRateLimitStore.get(ip) || [];
  const recent = bucket.filter((ts) => now - ts < 60_000);
  if (recent.length >= 15) {
    return res.status(429).json({
      error: "Rate limit exceeded. Please wait a minute and try again.",
    });
  }
  recent.push(now);
  global.__aiRateLimitStore.set(ip, recent);

  try {
    const model = process.env.GERMINI_MODEL || "gemini-1.5-flash";
    const apiKey = process.env.GERMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

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
      error:
        error.response?.data?.error?.message ||
        "AI request failed. Try a different model.",
    });
  }
});

app.get("/api/ai/models", async (req, res) => {
  if (!process.env.GERMINI_API_KEY) {
    return res.status(503).json({
      error: "GERMINI_API_KEY is not configured.",
    });
  }

  try {
    const apiKey = process.env.GERMINI_API_KEY;
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
      { timeout: 15000 }
    );
    res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "Failed to list models",
    });
  }
});

app.get("/", (req, res) => {
  res.send("This portfolio Backend is running! 🎉");
});

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      app.locals.dbReady = true;
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB: ", err);
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
