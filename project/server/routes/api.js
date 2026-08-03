import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { analyzePhishingRisk } from "../utils/phishingAnalyzer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

const router = express.Router();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
}

router.get("/organization", (req, res) => {
  res.json(readJson("organization.json"));
});

router.get("/timeline", (req, res) => {
  res.json(readJson("attackTimeline.json"));
});

router.get("/vulnerabilities", (req, res) => {
  res.json(readJson("vulnerabilities.json"));
});

router.get("/risk-response", (req, res) => {
  res.json(readJson("riskAndResponse.json"));
});

// Interactive backend feature: heuristic phishing-email risk scorer
router.post("/phishing-analyzer", (req, res) => {
  const { emailText } = req.body || {};
  if (!emailText || typeof emailText !== "string") {
    return res.status(400).json({ error: "emailText (string) is required" });
  }
  const result = analyzePhishingRisk(emailText);
  res.json(result);
});

export default router;
