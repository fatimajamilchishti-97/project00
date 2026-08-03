import { useEffect, useState } from "react";

export default function Recommendations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/risk-response").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return null;

  return (
    <div>
      <div className="page-eyebrow">Component 07</div>
      <h1 className="page-title">Final Security Improvement Recommendations</h1>
      <p className="page-lede">
        Prioritized, actionable measures derived directly from the vulnerabilities identified in
        this case.
      </p>

      {data.recommendations.map((r, i) => (
        <div className="card" key={i}>
          <h3>{String(i + 1).padStart(2, "0")} — {r.title}</h3>
          <p style={{ color: "var(--text-dim)" }}>{r.detail}</p>
        </div>
      ))}
    </div>
  );
}
