const colors = {
    blue: {
      default: "rgb(76, 94, 233)",
      half: "rgba(76, 94, 233, 0.5)",
      quarter: "rgba(76, 94, 233, 0.25)",
      zero: "rgba(76, 94, 233, 0.08)"
    },
    red: {
      default: "rgb(255, 0, 0)",
      half: "rgba(255, 0, 0, 0.5)",
      quarter: "rgba(255, 0, 0, 0.51)",
      zero: "rgba(255, 0, 0, 0.08)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
};
  
const weight = [61.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 60.8, 59.6, 61.2];
const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"];

const trendColor = weight[0] > weight[weight.length - 1] ? colors.red : colors.blue;







window.onload = function () {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.canvas.height = 100;

  const gradient = ctx.createLinearGradient(0, 25, 0, 560);
  gradient.addColorStop(0, trendColor.half);
  gradient.addColorStop(0.35, trendColor.quarter);
  gradient.addColorStop(1, trendColor.zero);

  Chart.defaults.global.defaultFontFamily = "'Poppins', sans-serif";
  Chart.defaults.global.defaultFontColor = colors.indigo.default;
  const options = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          fill: true,
          backgroundColor: gradient,
          pointBackgroundColor: trendColor.default,
          borderColor: trendColor.default,
          data: weight,
          lineTension: 0.3,
          borderWidth: 3,
          pointRadius: 2
        }
      ]
    },
    options: {
      layout: { padding: 10 },
      responsive: true,
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: { display: false },
          ticks: {
            fontFamily: "'Poppins', sans-serif",  // <- Apply font to x-axis ticks
            padding: 10,
            autoSkip: false,
            maxRotation: 15,
            minRotation: 15
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Price in {{ curency }}",
            padding: 10,
            fontFamily: "'Poppins', sans-serif"  // <- Apply font to axis label
          },
          gridLines: { display: true, color: colors.indigo.quarter },
          ticks: {
            fontFamily: "'Poppins', sans-serif",  // <- Apply font to y-axis ticks
            beginAtZero: false,
            max: 63,
            min: 57,
            padding: 10
          }
        }]
      }
    }
  };
  window.myLine = new Chart(ctx, options);
};









// register/preview graph
window.onload = function () {
  const ctx = document.getElementById("preview").getContext("2d");
  ctx.canvas.height = 100;

  const gradient = ctx.createLinearGradient(0, 25, 0, 560);
  gradient.addColorStop(0, trendColor.half);
  gradient.addColorStop(0.35, trendColor.quarter);
  gradient.addColorStop(1, trendColor.zero);

  Chart.defaults.global.defaultFontFamily = "'Poppins', sans-serif";
  Chart.defaults.global.defaultFontColor = colors.indigo.default;
  const options = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          fill: true,
          backgroundColor: gradient,
          pointBackgroundColor: trendColor.default,
          borderColor: trendColor.default,
          data: weight,
          lineTension: 0.3,
          borderWidth: 3,
          pointRadius: 2
        }
      ]
    },
    options: {
      layout: { padding: 10 },
      responsive: true,
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: { display: false },
          ticks: {
            fontFamily: "'Poppins', sans-serif",  // <- Apply font to x-axis ticks
            padding: 10,
            autoSkip: false,
            maxRotation: 15,
            minRotation: 15
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Price in {{ curency }}",
            padding: 10,
            fontFamily: "'Poppins', sans-serif"  // <- Apply font to axis label
          },
          gridLines: { display: true, color: colors.indigo.quarter },
          ticks: {
            fontFamily: "'Poppins', sans-serif",  // <- Apply font to y-axis ticks
            beginAtZero: false,
            max: 63,
            min: 57,
            padding: 10
          }
        }]
      }
    }
  };
  window.myLine = new Chart(ctx, options);
};
