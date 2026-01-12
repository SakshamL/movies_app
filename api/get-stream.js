// api/get-stream.js
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "No Video ID provided" });

  try {
    // 1. Fetch the provider's page with a fake User-Agent
    const response = await axios.get(`https://vidfast.pro/movie/${id}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://vidfast.pro/",
      },
    });

    const html = response.data;

    // 2. Extract the stream URL using Regex
    // Vidfast typically stores the source in a script tag inside a "file:" or "sources:" variable
    const m3u8Regex = /file\s*:\s*"(https:\/\/.*?\.m3u8.*?)"/;
    const match = html.match(m3u8Regex);

    if (match && match[1]) {
      return res.status(200).json({
        success: true,
        streamUrl: match[1],
      });
    }

    // Fallback: If Regex fails, try Cheerio to look at script tags
    const $ = cheerio.load(html);
    let foundUrl = null;
    $("script").each((i, script) => {
      const content = $(script).html();
      if (content.includes(".m3u8")) {
        const fallbackMatch = content.match(/(https:\/\/.*?\.m3u8.*?)"/);
        if (fallbackMatch) foundUrl = fallbackMatch[1];
      }
    });

    if (foundUrl)
      return res.status(200).json({ success: true, streamUrl: foundUrl });

    res.status(404).json({ error: "Could not find raw stream" });
  } catch (error) {
    res.status(500).json({ error: "Server error during extraction" });
  }
}
