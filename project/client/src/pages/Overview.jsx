import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const SEVERITY_COLOR = { Critical: "#E4572E", High: "#F2A65A", Medium: "#3FC1C9" };
const STATUS_COLOR = { Open: "#E4572E", "In Progress": "#F2A65A", Resolved: "#6FCF97" };

export default function Overview() {
  const [org, setOrg] = useState(null);
  const [vulns, setVulns] = useState([]);

  useEffect(() => {
    fetch("/api/organization").then((r) => r.json()).then(setOrg);
    fetch("/api/vulnerabilities").then((r) => r.json()).then(setVulns);
  }, []);

  const severityData = ["Critical", "High", "Medium"].map((sev) => ({
    severity: sev,
    count: vulns.filter((v) => v.severity === sev).length,
  }));

  const statusData = ["Open", "In Progress", "Resolved"]
    .map((s) => ({ name: s, value: vulns.filter((v) => (v.status || "Open") === s).length }))
    .filter((d) => d.value > 0);

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

      {vulns.length > 0 && (
        <div className="chart-grid" style={{ marginBottom: 20 }}>
          <div className="card">
            <h3>Vulnerabilities by Severity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={severityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#263349" vertical={false} />
                <XAxis dataKey="severity" stroke="#7C8AA3" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} stroke="#7C8AA3" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "#182238", border: "1px solid #263349", borderRadius: 8, color: "#F2F5F9" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {severityData.map((d, i) => <Cell key={i} fill={SEVERITY_COLOR[d.severity]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3>Remediation Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {statusData.map((d, i) => <Cell key={i} fill={STATUS_COLOR[d.name]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#182238", border: "1px solid #263349", borderRadius: 8, color: "#F2F5F9" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#7C8AA3" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

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
          social-engineering indicators that started this breach. On the Vulnerabilities page,
          remediation-status badges are also live — clicking one calls the backend and persists
          the change.
        </p>
      </div>
    </div>
  );
}
