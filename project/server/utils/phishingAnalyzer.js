// Simple heuristic-based phishing risk scorer for educational demonstration.
// This is a DEFENSIVE tool: it flags suspicious patterns in email text so a
// user can learn to recognise phishing indicators. It does not send, exploit,
// or interact with anything - it only scores text the user pastes in.

const URGENCY_WORDS = [
  "urgent", "immediately", "verify your account", "suspended", "act now",
  "limited time", "click here", "final notice", "confirm your identity",
  "unauthorized login", "unusual activity", "restricted"
];

const CREDENTIAL_WORDS = [
  "password", "ssn", "social security", "credit card", "login credentials",
  "billing information", "bank account", "pin number", "otp", "one-time code"
];

const GENERIC_GREETINGS = ["dear customer", "dear user", "dear valued", "dear account holder"];

function findMismatchedLink(text) {
  // Looks for "click here"-style anchor text patterns combined with a raw URL
  // that uses a different/suspicious domain pattern (e.g., IP address, or
  // excessive subdomains) - a classic phishing/MITM-redirect indicator.
  const urlMatches = text.match(/https?:\/\/[^\s)]+/gi) || [];
  const suspicious = urlMatches.filter((u) => {
    const isIp = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(u);
    const manySubdomains = (u.match(/\./g) || []).length >= 4;
    const hasAt = u.includes("@");
    return isIp || manySubdomains || hasAt;
  });
  return { urlCount: urlMatches.length, suspiciousUrls: suspicious };
}

export function analyzePhishingRisk(rawText) {
  const text = (rawText || "").toLowerCase();
  const reasons = [];
  let score = 0;

  URGENCY_WORDS.forEach((phrase) => {
    if (text.includes(phrase)) {
      score += 8;
      reasons.push(`Urgency/pressure language detected: "${phrase}"`);
    }
  });

  CREDENTIAL_WORDS.forEach((phrase) => {
    if (text.includes(phrase)) {
      score += 10;
      reasons.push(`Requests sensitive credential/data type: "${phrase}"`);
    }
  });

  GENERIC_GREETINGS.forEach((phrase) => {
    if (text.includes(phrase)) {
      score += 5;
      reasons.push(`Generic, non-personalized greeting: "${phrase}"`);
    }
  });

  const { urlCount, suspiciousUrls } = findMismatchedLink(rawText || "");
  if (suspiciousUrls.length > 0) {
    score += 20;
    reasons.push(`${suspiciousUrls.length} suspicious link(s) found (IP address, excessive subdomains, or "@" trick).`);
  }
  if (urlCount >= 3) {
    score += 5;
    reasons.push("Multiple links in a single message increases risk.");
  }

  if (/[!]{2,}/.test(rawText || "")) {
    score += 4;
    reasons.push("Excessive punctuation (e.g. \"!!!\") often signals manipulative tone.");
  }

  score = Math.min(score, 100);

  let verdict = "Low risk";
  if (score >= 60) verdict = "High risk - likely phishing";
  else if (score >= 30) verdict = "Medium risk - treat with caution";

  return { score, verdict, reasons, urlCount, suspiciousUrls };
}
