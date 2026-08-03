import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CHIP_CLASS = { Compliant: "compliant", Partial: "partial", Gap: "gap" };
const PIE_COLOR = { Compliant: "#6FCF97", Partial: "#F2A65A", Gap: "#E4572E" };

export default function DataProtection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/risk-response").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return null;
  const dp = data.dataProtectionCompliance;
  const reqStatus = dp.requirementStatus || [];

  const summary = ["Compliant", "Partial", "Gap"]
    .map((s) => ({ name: s, value: reqStatus.filter((r) => r.status === s).length }))
    .filter((d) => d.value > 0);

  return (
    <div>
      <div className="page-eyebrow">Component 06</div>
      <h1 className="page-title">Data Protection &amp; Privacy Compliance</h1>
      <p className="page-lede">
        Evaluated against {dp.framework}, the applicable payment-data protection standard.
      </p>

      {reqStatus.length > 0 && (
        <div className="chart-grid" style={{ marginBottom: 20 }}>
          <div className="card">
            <h3>Requirement-by-Requirement Status</h3>
            <div className="compliance-grid">
              {reqStatus.map((r) => (
                <div className="compliance-row" key={r.req}>
                  <span className="req-id">{r.req}</span>
                  <span className="req-title">{r.title}</span>
                  <span className={`compliance-chip ${CHIP_CLASS[r.status]}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Compliance Summary</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={summary} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {summary.map((d, i) => <Cell key={i} fill={PIE_COLOR[d.name]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#182238", border: "1px solid #263349", borderRadius: 8, color: "#F2F5F9" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#7C8AA3" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

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
