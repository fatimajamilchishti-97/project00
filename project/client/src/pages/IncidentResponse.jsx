import { useEffect, useState } from "react";

export default function IncidentResponse() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/risk-response").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return null;

  return (
    <div>
      <div className="page-eyebrow">Component 05</div>
      <h1 className="page-title">Incident Response Plan</h1>
      <p className="page-lede">
        A six-phase plan (Preparation → Lessons Learned) built specifically to close the gaps that
        let this breach run for roughly three weeks before public disclosure.
      </p>

      {data.incidentResponsePlan.map((phase) => (
        <div className="card" key={phase.phase}>
          <h3>{phase.phase}</h3>
          <ul className="reasons" style={{ color: "var(--text)" }}>
            {phase.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
