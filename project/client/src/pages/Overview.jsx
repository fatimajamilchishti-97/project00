import { useEffect, useState } from "react";

export default function Overview() {
  const [org, setOrg] = useState(null);

  useEffect(() => {
    fetch("/api/organization").then((r) => r.json()).then(setOrg);
  }, []);

  return (
    <div>
      <div className="page-eyebrow">Case File Overview</div>
      <h1 className="page-title">Target Corporation — 2013 Retail Data Breach</h1>
      <p className="page-lede">
        A full lifecycle security case study: infrastructure profile, threat &amp; risk assessment,
        vulnerability analysis, attack reconstruction, incident response plan, data-protection
        compliance review, and forward-looking recommendations.
      </p>

      <div className="stat-grid">
        <div className="stat-card"><div className="num">40M</div><div className="label">Payment cards exposed</div></div>
        <div className="stat-card"><div className="num">70M</div><div className="label">Customer records exposed</div></div>
        <div className="stat-card"><div className="num">19</div><div className="label">Days undetected publicly</div></div>
        <div className="stat-card"><div className="num">$18.5M</div><div className="label">2017 multistate settlement</div></div>
      </div>

      {org && (
        <div className="card">
          <h3>Incident Summary</h3>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>{org.summary}</p>
        </div>
      )}

      <div className="card">
        <h3>How to use this case file</h3>
        <p style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>
          Use the sidebar to move through each project component in order: infrastructure profile
          first, then risk/vulnerability analysis, the attack reconstruction (the kill-chain
          timeline), the incident response plan, data-protection/compliance findings, and finally
          the improvement recommendations. The Phishing Analyzer page is a working tool you can
          demo live — paste any email text and it scores phishing risk using the same class of
          social-engineering indicators that started this breach.
        </p>
      </div>
    </div>
  );
}
