# Case File 2013-TGT: Retail Breach Forensics
Final Year Project — IT Infrastructure & Cyber Security Analysis

## What this project covers
This project is a full-stack web application analyzing a **real, publicly documented breach**:
the **Target Corporation data breach (Nov–Dec 2013)**. It maps directly onto every required
component of your project brief:

| Your requirement | Where it's covered |
|---|---|
| Organization IT infrastructure analysis | `/infrastructure` page + `server/data/organization.json` |
| Computer systems and network architecture study | `/infrastructure` page (SVG network diagram) |
| Cyber security threat and risk assessment | `/risk-assessment` page (risk matrix scatter chart) |
| Security vulnerability analysis | `/vulnerabilities` page (6 root-cause vulnerabilities, CWE-mapped) |
| Incident response plan development | `/incident-response` page (6-phase NIST-style plan) |
| Data protection and privacy compliance | `/data-protection` page (PCI-DSS gap analysis) |
| Final security improvement recommendations | `/recommendations` page (7 prioritized recommendations) |
| Attack explanation (phishing/MITM etc.) | `/attack-analysis` page (kill-chain timeline + phishing/MITM comparison) |
| "Something extra to look classy" | `/phishing-analyzer` — a **working** backend-powered tool: paste any email, get a live phishing-risk score |

## Why this case study
Target 2013 is one of the best-documented breaches available for academic work:
- US Senate Commerce Committee staff report ("A 'Kill Chain' Analysis of the 2013 Target Data
  Breach", March 2014)
- Verizon's forensic investigation summary
- Extensive contemporaneous reporting by Brian Krebs (KrebsOnSecurity), who first broke the story

It covers **phishing** (the actual initial access vector — a phishing email against HVAC vendor
Fazio Mechanical), poor **network segmentation** (letting a vendor-billing credential reach
POS systems), and a **failed incident response** (FireEye alerts were raised but not escalated) —
giving you strong, citable material for every section of your report/viva.

> Tip for your written report: cite the Senate Commerce Committee report and Krebs' reporting as
> primary sources. Don't just copy text from this app — use it as your structured outline and
> write the analysis in your own words for submission.

## Tech stack
- **Backend**: Node.js + Express (REST API), JSON-file data store (swap for MongoDB/Postgres
  later if your course requires a database — the data shapes in `server/data/*.json` map directly
  to collections/tables)
- **Frontend**: React 18 + Vite + React Router + Recharts (risk-matrix chart)
- **Design**: custom dark "case file / SOC dashboard" theme (no UI kit) — see `client/src/index.css`

## Project structure
```
campus-secure/
  server/
    server.js              # Express entrypoint
    routes/api.js           # REST endpoints
    utils/phishingAnalyzer.js  # heuristic phishing-risk scorer (the "backend logic")
    data/*.json             # case study content (org, timeline, vulnerabilities, risk/response)
  client/
    src/
      pages/                # one page per project component
      components/Sidebar.jsx
      index.css             # design tokens + all styling
```

## Running it locally

### 1. Backend
```bash
cd server
npm install
npm run dev
```
Runs on `http://localhost:5000`. Test it: `curl http://localhost:5000/api/organization`

### 2. Frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173` and proxies `/api/*` calls to the backend automatically
(see `vite.config.js`).

Open `http://localhost:5173` in your browser.

## API endpoints
- `GET /api/organization` — infrastructure profile
- `GET /api/timeline` — attack kill-chain stages
- `GET /api/vulnerabilities` — vulnerability list
- `GET /api/risk-response` — risk matrix, IR plan, recommendations, compliance data
- `POST /api/phishing-analyzer` — body `{ "emailText": "..." }`, returns a risk score + reasons

## Extending this for a higher grade
Ideas to push this further if you have time before submission:
1. **Add a database**: swap the JSON files for MongoDB (Mongoose) or PostgreSQL — trivial since
   the route handlers already isolate data access in `routes/api.js`.
2. **Add authentication**: a simple admin login (JWT) to "edit" case file entries — demonstrates
   auth/session security, which examiners like to see in a security-themed project.
3. **Add a second case study**: duplicate the data files for a MITM-specific incident (e.g. the
   2011 DigiNotar CA compromise, which enabled real-world MITM attacks against Gmail users) and
   let the user switch between case files from the sidebar — shows breadth.
4. **Export to PDF**: add a "Download full report" button that renders all pages into a PDF
   (e.g. with `puppeteer` on the backend) for your written submission.
5. **Deploy it**: Vercel (frontend) + Render/Railway (backend) so you can demo a live URL in your
   viva instead of running locally.

## Sources referenced in the case study content
- U.S. Senate Committee on Commerce, Science, and Transportation — "A 'Kill Chain' Analysis of the
  2013 Target Data Breach" (March 26, 2014)
- KrebsOnSecurity reporting on the Target breach (Dec 2013 – Feb 2014)
- Target Corporation public statements and 2017 multistate settlement press materials
