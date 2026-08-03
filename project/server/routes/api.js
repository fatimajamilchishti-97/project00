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

// Real working feature: cycle a vulnerability's remediation status and persist it.
// Open -> In Progress -> Resolved -> Open ...
const STATUS_CYCLE = ["Open", "In Progress", "Resolved"];
router.patch("/vulnerabilities/:id/status", (req, res) => {
  const vulns = readJson("vulnerabilities.json");
  const vuln = vulns.find((v) => v.id === req.params.id);
  if (!vuln) return res.status(404).json({ error: "vulnerability not found" });

  const currentIdx = STATUS_CYCLE.indexOf(vuln.status || "Open");
  vuln.status = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length];

  fs.writeFileSync(path.join(dataDir, "vulnerabilities.json"), JSON.stringify(vulns, null, 2));
  res.json(vuln);
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
