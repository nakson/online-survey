function updateBarChart(data) {
  let newData = [];
  Object.values(data).forEach((val) => newData.push(val));
  updateData(myBarChart, newData);
}

function updateData(chart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
    dataset.data = data;
  });
  chart.update();
}

const labelsBar = ["Less than 1 month", "Less than 1 year", "1+ years"];

const dataBar = {
  labels: labelsBar,
  datasets: [
    {
      label: "Number of people",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(0, 191, 255, 0.2)",
        "rgba(0, 80, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 80, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      data: [],
    },
  ],
};

const configBar = {
  type: "bar",
  data: dataBar,
  plugins: [ChartDataLabels],
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "rgba(94,147,255,.9)",
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      y: {
        ticks: {
          color: "rgba(94,147,255,.9)",
        },
      },
    },
    plugins: {
      legend: {
        //position: "top",
        display: false,
      },

      datalabels: {
        align: "end",
        anchor: "end",
        color: "#f5f5f5",
        font: function (context) {
          var w = context.chart.width;
          return {
            size: w < 512 ? 12 : 14,
          };
        },
        formatter: function (value, context) {
          return context.chart.data[context.dataIndex];
        },
      },
    },
  },
};

var myBarChart = new Chart(document.getElementById("barChart"), configBar);

// //Don't draw the chart until scroll down to it
// const barArea = document.getElementById("barChart");
// let loaded_barChart = false;
// let barPosition = 0;

// window.addEventListener("scroll", function (e) {
//   barPosition = barArea.getBoundingClientRect().y;
//   if (!loaded_barChart && barPosition < 500 && barPosition > 0) {
//     loadBarChart();
//     loaded_barChart = true;
//   }
// });
