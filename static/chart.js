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
  
const weight = [11.204, 13.675, 12.736, 16.182, 17.757, 29.058, 25.296, 12.202, 19.304, 25.896, 24.045, 34.054, 46.565, 54.023, 88.107, 71.999, 45.325, 53.906, 85.365, 150.462, 392.69];
const labels = ['01-01-2000 00:00', '01-04-2001 00:00', '01-07-2002 00:00', '01-10-2003 00:00', '01-01-2005 00:00', '01-04-2006 00:00', '01-07-2007 00:00', '01-10-2008 00:00', '01-01-2010 00:00', '01-04-2011 00:00', '01-07-2012 00:00', '01-10-2013 00:00', '01-01-2015 00:00', '01-04-2016 00:00', '01-07-2017 00:00', '01-10-2018 00:00', '01-01-2020 00:00', '01-04-2021 00:00', '01-07-2022 00:00', '01-10-2023 00:00', '01-01-2025 00:00'];
const currency = "USD"

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
            labelString: "Price in " + currency,
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
            labelString: "Price in " + currency,
            padding: 10,
            fontFamily: "'Poppins', sans-serif"  // <- Apply font to axis label
          },
          gridLines: { display: true, color: colors.indigo.quarter },
          ticks: {
            fontFamily: "'Poppins', sans-serif",  // <- Apply font to y-axis ticks
            beginAtZero: false,
            max: 471.22,
            min: 9.33,
            padding: 10
          }
        }]
      }
    }
  };
  window.myLine = new Chart(ctx, options);
};
