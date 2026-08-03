import { useEffect, useState } from "react";

export default function DataProtection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/risk-response").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return null;
  const dp = data.dataProtectionCompliance;

  return (
    <div>
      <div className="page-eyebrow">Component 06</div>
      <h1 className="page-title">Data Protection &amp; Privacy Compliance</h1>
      <p className="page-lede">
        Evaluated against {dp.framework}, the applicable payment-data protection standard.
      </p>

      <div className="card">
        <h3>Compliance Gaps Identified</h3>
        <ul className="reasons" style={{ color: "var(--text)" }}>
          {dp.gaps.map((g, i) => <li key={i}>{g}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Regulatory Aftermath</h3>
        <p style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>{dp.regulatoryAftermath}</p>
      </div>
    </div>
  );
}
