const monitoringData = [
  { day: "Mon", rainfall: 54, soilMoisture: 42, riskScore: 32 },
  { day: "Tue", rainfall: 76, soilMoisture: 50, riskScore: 46 },
  { day: "Wed", rainfall: 110, soilMoisture: 61, riskScore: 62 },
  { day: "Thu", rainfall: 148, soilMoisture: 73, riskScore: 78 },
  { day: "Fri", rainfall: 180, soilMoisture: 85, riskScore: 89 },
  { day: "Sat", rainfall: 156, soilMoisture: 80, riskScore: 82 },
  { day: "Sun", rainfall: 128, soilMoisture: 70, riskScore: 68 }
];

const locationRiskCounts = {
  low: 4,
  moderate: 7,
  high: 3,
  critical: 2
};

function riskColor(score) {
  if (score >= 80) return "#cf3f2f";
  if (score >= 60) return "#e36b2c";
  if (score >= 35) return "#d89a22";
  return "#2e9d69";
}

function baseChartOptions(yTitle, suggestedMax) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#17202a",
        padding: 12,
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#637176"
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax,
        title: {
          display: true,
          text: yTitle,
          color: "#637176",
          font: {
            weight: "bold"
          }
        },
        grid: {
          color: "#e7eeeb"
        },
        ticks: {
          color: "#637176"
        }
      }
    }
  };
}

function renderCounts() {
  document.getElementById("lowCount").textContent = locationRiskCounts.low;
  document.getElementById("moderateCount").textContent = locationRiskCounts.moderate;
  document.getElementById("highCount").textContent = locationRiskCounts.high;
  document.getElementById("criticalCount").textContent = locationRiskCounts.critical;
}

function renderWarning() {
  const latest = monitoringData[monitoringData.length - 3];
  const causes = [];

  if (latest.rainfall >= 140) causes.push("High rainfall");
  if (latest.soilMoisture >= 70) causes.push("High soil moisture");
  if (latest.riskScore >= 80) causes.push("Critical risk score");
  causes.push("Steep slope in monitored area");

  document.getElementById("warningTitle").textContent = latest.riskScore >= 80 ? "🚨 CRITICAL RISK" : "⚠️ HIGH RISK";
  document.getElementById("warningText").textContent = `Heavy rainfall detected with ${latest.rainfall} mm rainfall and ${latest.soilMoisture}% soil moisture.`;
  document.getElementById("causeList").innerHTML = causes.map((cause) => `<li>${cause}</li>`).join("");
}

function createCharts() {
  const labels = monitoringData.map((item) => item.day);

  new Chart(document.getElementById("rainfallChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        data: monitoringData.map((item) => item.rainfall),
        borderColor: "#2b7bbb",
        backgroundColor: "rgba(43, 123, 187, 0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: baseChartOptions("Rainfall (mm)", 220)
  });

  new Chart(document.getElementById("soilChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: monitoringData.map((item) => item.soilMoisture),
        backgroundColor: "rgba(22, 143, 122, 0.82)",
        borderRadius: 6
      }]
    },
    options: baseChartOptions("Soil moisture (%)", 100)
  });

  new Chart(document.getElementById("riskChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        data: monitoringData.map((item) => item.riskScore),
        borderColor: "#cf3f2f",
        backgroundColor: "rgba(207, 63, 47, 0.12)",
        pointBackgroundColor: monitoringData.map((item) => riskColor(item.riskScore)),
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.32,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: baseChartOptions("Risk score", 100)
  });
}

renderCounts();
renderWarning();
createCharts();
