import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.YT_API_KEY; // stored secretly in Render

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) return res.status(500).json({ error: data.error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from YouTube" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("✅ Server running on port", port));
