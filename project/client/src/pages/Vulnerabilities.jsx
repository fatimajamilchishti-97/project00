import { useEffect, useState } from "react";

function statusClass(status) {
  if (status === "Resolved") return "resolved";
  if (status === "In Progress") return "in-progress";
  return "open";
}

export default function Vulnerabilities() {
  const [vulns, setVulns] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetch("/api/vulnerabilities").then((r) => r.json()).then(setVulns);
  }, []);

  const cycleStatus = async (id) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/vulnerabilities/${id}/status`, { method: "PATCH" });
      const updated = await res.json();
      setVulns((prev) => prev.map((v) => (v.id === id ? { ...v, status: updated.status } : v)));
    } catch (e) {
      console.error("status update failed", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const resolvedCount = vulns.filter((v) => v.status === "Resolved").length;

  return (
    <div>
      <div className="page-eyebrow">Component 03</div>
      <h1 className="page-title">Security Vulnerability Analysis</h1>
      <p className="page-lede">
        Root-cause technical vulnerabilities identified across vendor management, network
        architecture, identity, monitoring, and data protection. Remediation status reflects
        controls Target implemented after the breach — click a status badge to cycle it
        (Open → In Progress → Resolved); this calls a real backend endpoint and persists.
      </p>

      {vulns.length > 0 && (
        <div className="stat-grid" style={{ marginBottom: 20 }}>
          <div className="stat-card"><div className="num">{vulns.length}</div><div className="label">Total vulnerabilities</div></div>
          <div className="stat-card"><div className="num">{vulns.filter(v => v.severity === "Critical").length}</div><div className="label">Critical severity</div></div>
          <div className="stat-card"><div className="num">{resolvedCount}/{vulns.length}</div><div className="label">Marked resolved</div></div>
        </div>
      )}

      {vulns.map((v) => (
        <div className="card" key={v.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, flexWrap: "wrap" }}>
            <h3>{v.id} — {v.title}</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <span className={`badge ${v.severity.toLowerCase()}`}>{v.severity}</span>
              <span
                className={`status-badge ${statusClass(v.status)}`}
                onClick={() => cycleStatus(v.id)}
                title="Click to update remediation status"
              >
                {updatingId === v.id ? "updating…" : (v.status || "Open")}
              </span>
            </div>
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
