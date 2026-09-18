const form = document.getElementById("riskForm");
const resultPanel = document.querySelector(".result-panel");
const scoreValue = document.getElementById("riskScore");
const levelValue = document.getElementById("riskLevel");
const meterFill = document.getElementById("meterFill");
const riskMessage = document.getElementById("riskMessage");
const systemStatus = document.getElementById("systemStatus");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRiskLevel(score) {
  if (score >= 80) {
    return {
      key: "critical",
      label: "🔴 CRITICAL",
      message: "Immediate monitoring recommended. Heavy rainfall, wet soil, steep slope, or visible ground movement may be present."
    };
  }

  if (score >= 60) {
    return {
      key: "high",
      label: "🟠 HIGH",
      message: "High risk conditions detected. Field team should inspect the location and nearby slopes."
    };
  }

  if (score >= 35) {
    return {
      key: "moderate",
      label: "🟡 MODERATE",
      message: "Moderate risk. Continue monitoring rainfall, soil moisture, and ground movement."
    };
  }

  return {
    key: "low",
    label: "🟢 LOW",
    message: "Current readings show low risk. Keep routine observation active."
  };
}

function calculateRisk(values) {
  const rainfallScore = clamp(values.rainfall / 220, 0, 1) * 28;
  const moistureScore = clamp(values.soilMoisture / 100, 0, 1) * 22;
  const slopeScore = clamp(values.slope / 50, 0, 1) * 22;
  const elevationScore = clamp(values.elevation / 1800, 0, 1) * 10;
  const movementScore = clamp(values.groundMovement / 100, 0, 1) * 18;

  return Math.round(rainfallScore + moistureScore + slopeScore + elevationScore + movementScore);
}

function updateResult(score, locationName) {
  const risk = getRiskLevel(score);
  resultPanel.className = `result-panel ${risk.key}`;
  scoreValue.textContent = score;
  levelValue.textContent = risk.label;
  meterFill.style.width = `${score}%`;
  systemStatus.textContent = risk.key.toUpperCase();

  const locationText = locationName ? `${locationName}: ` : "";
  riskMessage.textContent = `${locationText}${risk.message}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = {
    rainfall: Number(document.getElementById("rainfall").value),
    soilMoisture: Number(document.getElementById("soilMoisture").value),
    slope: Number(document.getElementById("slope").value),
    elevation: Number(document.getElementById("elevation").value),
    groundMovement: Number(document.getElementById("groundMovement").value)
  };

  const locationName = document.getElementById("location").value.trim();
  const score = calculateRisk(values);
  updateResult(score, locationName);
});
