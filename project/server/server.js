import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Case File API running. Try /api/organization, /api/timeline, /api/vulnerabilities, /api/risk-response");
});

app.listen(PORT, () => {
  console.log(`Case File API listening on http://localhost:${PORT}`);
});
