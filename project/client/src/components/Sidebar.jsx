import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview", idx: "00" },
  { to: "/infrastructure", label: "IT Infrastructure", idx: "01" },
  { to: "/risk-assessment", label: "Threat & Risk", idx: "02" },
  { to: "/vulnerabilities", label: "Vulnerabilities", idx: "03" },
  { to: "/attack-analysis", label: "Attack Analysis", idx: "04" },
  { to: "/incident-response", label: "Incident Response", idx: "05" },
  { to: "/data-protection", label: "Data Protection", idx: "06" },
  { to: "/recommendations", label: "Recommendations", idx: "07" },
  { to: "/phishing-analyzer", label: "Phishing Analyzer", idx: "08" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="case-stamp">Case File 2013-TGT</div>
      <h1>Retail Breach Forensics</h1>
      <div className="sub">Target Corp · Nov-Dec 2013</div>
      <ul className="nav-list">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="idx">{l.idx}</span>
              <span>{l.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
