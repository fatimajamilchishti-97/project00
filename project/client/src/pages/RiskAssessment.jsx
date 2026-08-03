import { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

function colorFor(likelihood, impact) {
  const score = likelihood * impact;
  if (score >= 20) return "#E4572E";
  if (score >= 12) return "#F2A65A";
  return "#3FC1C9";
}

export default function RiskAssessment() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/risk-response").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return null;

  return (
    <div>
      <div className="page-eyebrow">Component 02</div>
      <h1 className="page-title">Threat &amp; Risk Assessment</h1>
      <p className="page-lede">
        Each identified risk plotted by likelihood and impact (1-5 scale). Risks in the upper-right
        quadrant drove the severity of this breach and should be prioritized first in any similar
        assessment.
      </p>

      <div className="card">
        <h3>Risk Matrix</h3>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid stroke="#263349" />
            <XAxis type="number" dataKey="likelihood" name="Likelihood" domain={[0, 6]} stroke="#7C8AA3" tick={{ fontSize: 12 }} />
            <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 6]} stroke="#7C8AA3" tick={{ fontSize: 12 }} />
            <ZAxis range={[160, 160]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ background: "#182238", border: "1px solid #263349", borderRadius: 8, color: "#F2F5F9" }}
              formatter={(value, name) => [value, name]}
              labelFormatter={() => ""}
            />
            <Scatter data={data.riskMatrix} name="Risk">
              {data.riskMatrix.map((entry, idx) => (
                <Cell key={idx} fill={colorFor(entry.likelihood, entry.impact)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Risk Register</h3>
        <table>
          <thead>
            <tr><th>Risk</th><th>Likelihood</th><th>Impact</th><th>Linked Vulnerability</th></tr>
          </thead>
          <tbody>
            {data.riskMatrix.map((r) => (
              <tr key={r.risk}>
                <td>{r.risk}</td>
                <td>{r.likelihood}/5</td>
                <td>{r.impact}/5</td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{r.vulnRef}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
