import { useState } from "react";

const SAMPLE = `Dear Customer,

We noticed unusual activity on your account. Your access will be suspended unless you verify your identity immediately. Click here to confirm your password and billing information: http://192.168.44.12/verify-account

Act now to avoid permanent restriction!!!`;

export default function PhishingAnalyzer() {
  const [text, setText] = useState(SAMPLE);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const res = await fetch("/api/phishing-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText: text }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  const verdictClass = result
    ? result.score >= 60 ? "high" : result.score >= 30 ? "medium" : "low"
    : "";

  return (
    <div>
      <div className="page-eyebrow">Component 08 — Live Demo</div>
      <h1 className="page-title">Phishing Detection & Email Analysis</h1>
      <p className="page-lede">
        A defensive security tool: paste email text and the system identifies phishing indicators (urgency language, credential requests, suspicious links, generic greetings) —
        the same class of signals present in the email that compromised Target's HVAC vendor.
      </p>

      <div className="card">
        <h3>Paste email text</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <br />
        <button className="primary" onClick={analyze} disabled={loading}>
          {loading ? "Analyzing…" : "Analyze risk"}
        </button>

        {result && (
          <div className="result-box">
            <div className={`verdict ${verdictClass}`}>
              {result.verdict} — score {result.score}/100
            </div>
            {result.reasons.length > 0 ? (
              <ul className="reasons">
                {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            ) : (
              <div style={{ color: "var(--text-dim)", fontSize: 13.5 }}>No suspicious indicators found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
