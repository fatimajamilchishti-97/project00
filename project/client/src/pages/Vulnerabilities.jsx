import { useEffect, useState } from "react";

export default function Vulnerabilities() {
  const [vulns, setVulns] = useState([]);

  useEffect(() => {
    fetch("/api/vulnerabilities").then((r) => r.json()).then(setVulns);
  }, []);

  return (
    <div>
      <div className="page-eyebrow">Component 03</div>
      <h1 className="page-title">Security Vulnerability Analysis</h1>
      <p className="page-lede">
        Root-cause technical vulnerabilities identified across vendor management, network
        architecture, identity, monitoring, and data protection.
      </p>

      {vulns.map((v) => (
        <div className="card" key={v.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <h3>{v.id} — {v.title}</h3>
            <span className={`badge ${v.severity.toLowerCase()}`}>{v.severity}</span>
          </div>
          <p style={{ color: "var(--text-dim)", marginBottom: 6 }}>{v.description}</p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>
            Area: {v.area} · Ref: {v.cwe}
          </div>
        </div>
      ))}
    </div>
  );
}
