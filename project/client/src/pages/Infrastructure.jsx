import { useEffect, useState } from "react";

export default function Infrastructure() {
  const [org, setOrg] = useState(null);

  useEffect(() => {
    fetch("/api/organization").then((r) => r.json()).then(setOrg);
  }, []);

  if (!org) return null;
  const i = org.infrastructure;

  return (
    <div>
      <div className="page-eyebrow">Component 01</div>
      <h1 className="page-title">IT Infrastructure &amp; Network Architecture</h1>
      <p className="page-lede">{org.scale}. Below is the architecture as it existed at the time of the intrusion, including the segmentation gap attackers exploited.</p>

      <div className="card">
        <h3>Network Architecture (as of Nov 2013)</h3>
        <svg viewBox="0 0 900 320" style={{ width: "100%", height: "auto" }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#E4572E" />
            </marker>
          </defs>
          {/* Zones */}
          <rect x="20" y="30" width="220" height="260" rx="10" fill="#182238" stroke="#263349" />
          <text x="130" y="55" fill="#7C8AA3" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">EXTERNAL / VENDOR</text>
          <rect x="55" y="80" width="150" height="60" rx="6" fill="#0B1220" stroke="#E4572E" />
          <text x="130" y="105" fill="#F2F5F9" fontSize="12" textAnchor="middle">Fazio Mechanical</text>
          <text x="130" y="122" fill="#E4572E" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">phished credentials</text>

          <rect x="340" y="30" width="220" height="260" rx="10" fill="#182238" stroke="#263349" />
          <text x="450" y="55" fill="#7C8AA3" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">CORPORATE NETWORK</text>
          <rect x="375" y="80" width="150" height="55" rx="6" fill="#0B1220" stroke="#F2A65A" />
          <text x="450" y="112" fill="#F2F5F9" fontSize="12" textAnchor="middle">Ariba Vendor Portal</text>
          <rect x="375" y="150" width="150" height="55" rx="6" fill="#0B1220" stroke="#263349" />
          <text x="450" y="182" fill="#F2F5F9" fontSize="12" textAnchor="middle">Internal Windows AD</text>

          <rect x="660" y="30" width="220" height="260" rx="10" fill="#182238" stroke="#263349" />
          <text x="770" y="55" fill="#7C8AA3" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">CARDHOLDER DATA ENV.</text>
          <rect x="695" y="90" width="150" height="55" rx="6" fill="#0B1220" stroke="#E4572E" />
          <text x="770" y="122" fill="#F2F5F9" fontSize="12" textAnchor="middle">POS Terminals</text>
          <rect x="695" y="160" width="150" height="55" rx="6" fill="#0B1220" stroke="#E4572E" />
          <text x="770" y="192" fill="#F2F5F9" fontSize="12" textAnchor="middle">Staging Server</text>

          {/* Arrows showing attack path */}
          <line x1="205" y1="110" x2="373" y2="107" stroke="#E4572E" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="525" y1="107" x2="525" y2="107" stroke="#E4572E" />
          <path d="M525,110 C 600,110 620,120 693,117" fill="none" stroke="#E4572E" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M770,145 L770,158" stroke="#E4572E" strokeWidth="2" markerEnd="url(#arrow)" />

          <text x="450" y="270" fill="#E4572E" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
            red path = actual attacker traversal (weak segmentation)
          </text>
        </svg>
      </div>

      <div className="card">
        <h3>Corporate Network</h3>
        <p style={{ color: "var(--text-dim)" }}>{i.corporateNetwork}</p>
      </div>
      <div className="card">
        <h3>Vendor Access</h3>
        <p style={{ color: "var(--text-dim)" }}>{i.vendorAccess}</p>
      </div>
      <div className="card">
        <h3>POS Environment</h3>
        <p style={{ color: "var(--text-dim)" }}>{i.posEnvironment}</p>
      </div>
      <div className="card">
        <h3>Segmentation</h3>
        <p style={{ color: "var(--text-dim)" }}>{i.segmentation}</p>
      </div>
      <div className="card">
        <h3>Monitoring</h3>
        <p style={{ color: "var(--text-dim)" }}>{i.monitoring}</p>
      </div>
    </div>
  );
}
