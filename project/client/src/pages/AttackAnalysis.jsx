import { useEffect, useState } from "react";

const attackSteps = [
  {title:"Reconnaissance", text:"Attacker gathers information and identifies a weak vendor connection.", log:"RECON  scan detected from ext-ip 203.0.113.44 targeting vendor-gateway"},
  {title:"Phishing Email", text:"A fake email is delivered to an employee to trick them into opening a malicious link.", log:"MAIL-GW inbound message accepted from \"it-support@campus-secure-verify.com\""},
  {title:"Credential Theft", text:"User credentials are captured and reused by the attacker.", log:"AUTH   credential submit captured on look-alike portal /sso-verify"},
  {title:"Unauthorized Access", text:"Stolen credentials allow access to internal systems.", log:"AUTH   sign-in success — impossible travel flag, new device, risky IP"},
  {title:"Lateral Movement", text:"Attacker moves from the compromised vendor environment into critical systems.", log:"NET    lateral RDP session vendor-net -> core-db01"},
  {title:"Data Exfiltration", text:"Sensitive information is collected and transferred outside the organization.", log:"DLP    outbound transfer 2.3GB to unregistered endpoint blocked=false"}
];

const fixes = [
  {title:"Enable MFA", text:"Adds an extra verification step to prevent stolen password access.", log:"IAM    MFA enforcement policy applied to all user accounts"},
  {title:"Network Segmentation", text:"Separates vendor systems from internal critical networks.", log:"NET    vendor VLAN isolated from core-db subnet"},
  {title:"Email Protection", text:"Filters phishing emails and blocks malicious content.", log:"MAIL-GW sender domain campus-secure-verify.com added to blocklist"},
  {title:"SOC Monitoring", text:"Security teams detect alerts and respond quickly.", log:"SOC    monitoring rule active — alert-to-response SLA 8 min"}
];

export default function AttackAnalysis() {
  const [timeline, setTimeline] = useState([]);
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    fetch("/api/timeline").then((r) => r.json()).then(setTimeline);
  }, []);

  const [logLines, setLogLines] = useState([]);

  const timestamp = () => {
    const d = new Date();
    return d.toTimeString().slice(0,8);
  };

  const play = (type) => {
    setMode(type);
    setStep(0);
    setLogLines([]);
    const list = type === "attack" ? attackSteps : fixes;

    const pushLog = (i) => {
      setLogLines((prev) => [...prev, `[${timestamp()}] ${list[i].log}`]);
    };

    pushLog(0);
    let current = 0;
    const timer = setInterval(() => {
      current++;
      if(current >= list.length){
        clearInterval(timer);
      } else {
        setStep(current);
        pushLog(current);
      }
    }, 2500);
  };

  const active = mode === "attack" ? attackSteps : fixes;

  return (
    <div>
      <div className="page-eyebrow">Component 04</div>
      <h1 className="page-title">Attack Reconstruction — Interactive Attack & Defense Simulation</h1>

      <p className="page-lede">
        This simulation demonstrates the complete cyber incident lifecycle: attacker activity, phishing detection, security response, and prevention controls.
      </p>

      <div className="card">
        <h3>Attack Simulation</h3>
        <button className="sim-btn attack" onClick={() => play("attack")}>▶ Start Attack</button>
        <button className="sim-btn fix" onClick={() => play("fix")}>🛡 Apply Solution</button>

        {mode && (
          <div className="sim-layout">
            <div className="simulation">
              {active.map((s,i)=>(
                <div className={`sim-stage ${i <= step ? "active":""}`} key={i}>
                  <strong>{i+1}. {s.title}</strong>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>

            <div className="live-log">
              <div className="live-log-header">
                <span className="dot" /> Live Security Log
              </div>
              <div className="live-log-body">
                {logLines.length === 0 && (
                  <div className="live-log-line dim">waiting for activity…</div>
                )}
                {logLines.map((line, i) => (
                  <div className="live-log-line" key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Original Timeline</h3>
        <div className="kill-chain">
          {timeline.map((t, idx) => (
            <div className={`kc-stage ${t.category}`} key={idx}>
              <div className="kc-date">{t.date}</div>
              <div className="kc-title">{t.stage}: {t.title}</div>
              <div className="kc-desc">{t.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
