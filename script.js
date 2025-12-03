// Simple demo data generator + Chart.js setup

let chartInstance;

const ctx = () => document.getElementById("revenueChart");

function generateSampleData(days) {
  // days: 7 / 30 / 90
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  // Fake numbers فقط برای دمو
  const baseRevenue = days === 7 ? 900 : days === 30 ? 6200 : 18900;
  const baseProjects = days === 7 ? 3 : days === 30 ? 12 : 30;

  const revenue = labels.map(
    (_, i) => baseRevenue / labels.length + (Math.random() - 0.4) * 600
  );
  const projects = labels.map(
    () => baseProjects / labels.length + (Math.random() - 0.4) * 3
  );

  return { labels, revenue, projects };
}

function buildChart(days = 30) {
  const canvas = ctx();
  if (!canvas) return;

  const data = generateSampleData(days);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          type: "bar",
          label: "Revenue (USD)",
          data: data.revenue,
          yAxisID: "y",
          borderRadius: 8,
          backgroundColor: "rgba(34,197,94,0.7)",
        },
        {
          type: "line",
          label: "Projects",
          data: data.projects,
          yAxisID: "y1",
          borderColor: "rgba(56,189,248,0.9)",
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: "rgba(56,189,248,1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(15,23,42,0.95)",
          borderColor: "rgba(148,163,184,0.6)",
          borderWidth: 1,
          padding: 10,
          titleFont: { size: 12, family: "Inter" },
          bodyFont: { size: 11, family: "Inter" },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#9ca3af",
            font: { size: 11 },
          },
          grid: {
            display: false,
          },
        },
        y: {
          position: "left",
          ticks: {
            color: "#9ca3af",
            font: { size: 10 },
          },
          grid: {
            color: "rgba(30,41,59,0.9)",
          },
        },
        y1: {
          position: "right",
          ticks: {
            color: "#9ca3af",
            font: { size: 10 },
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const rangeSelect = document.getElementById("rangeSelect");
  const refreshBtn = document.getElementById("refreshBtn");

  buildChart(30); // default

  rangeSelect?.addEventListener("change", (e) => {
    const days = Number(e.target.value || 30);
    buildChart(days);
  });

  refreshBtn?.addEventListener("click", () => {
    const days = Number(rangeSelect?.value || 30);
    buildChart(days);
  });
});
