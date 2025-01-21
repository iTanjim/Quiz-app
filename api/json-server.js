import { readFileSync } from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "data", "questions.json");
    const jsonData = readFileSync(filePath, "utf-8");

    // Parse and send the JSON data
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(JSON.parse(jsonData));
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
}
