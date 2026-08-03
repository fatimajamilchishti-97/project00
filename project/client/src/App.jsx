import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview.jsx";
import Infrastructure from "./pages/Infrastructure.jsx";
import RiskAssessment from "./pages/RiskAssessment.jsx";
import Vulnerabilities from "./pages/Vulnerabilities.jsx";
import AttackAnalysis from "./pages/AttackAnalysis.jsx";
import IncidentResponse from "./pages/IncidentResponse.jsx";
import DataProtection from "./pages/DataProtection.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import PhishingAnalyzer from "./pages/PhishingAnalyzer.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/attack-analysis" element={<AttackAnalysis />} />
          <Route path="/incident-response" element={<IncidentResponse />} />
          <Route path="/data-protection" element={<DataProtection />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/phishing-analyzer" element={<PhishingAnalyzer />} />
        </Routes>
      </main>
    </div>
  );
}
