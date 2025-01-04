import React, { useEffect, useRef, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(RadialLinearScale, Tooltip, Legend, Title);

const PolarChart = () => {
  const chartRef = useRef(null);

  const DATA_COUNT = 5
  const labels = ["Solar", "Wind", "Hydro", "Coal", "Nuclear"];

//   {solar: 239, wind: 251, hydro: 312, nuclear: 375, coal: 194}
  const backgroundColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 205, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    
  ];

  

const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
        {
            label: "Energy Production",
            data: [],
            backgroundColor: backgroundColors,
        },
    ],
});

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(
            "https://gone-al-root-son.trycloudflare.com/api/energy/production"
        );
        const data = await response.json();
        setChartData({
            labels: false,
            datasets: [
                {
                    label: "Energy Production",
                    data: [data.solar, data.wind, data.hydro, data.coal, data.nuclear],
                    backgroundColor: backgroundColors,
                },
            ],
        });
    };

    fetchData();
}, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Polar Area Chart",
      },
    },
  };

  const randomizeData = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets[0].data = Array.from({ length: DATA_COUNT }, () =>
        Math.floor(Math.random() * 100)
      );
      chart.update();
    }
  };

  const addData = () => {
    const chart = chartRef.current;
    if (chart) {
      const newLabel = `Data #${chart.data.labels.length + 1}`;
      chart.data.labels.push(newLabel);
      chart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
      chart.update();
    }
  };

  const removeData = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.labels.pop();
      chart.data.datasets[0].data.pop();
      chart.update();
    }
  };

  return (
    <div className="h-[630px] w-3/3">
      <PolarArea ref={chartRef} data={chartData} options={options} />
     
    </div>
  );
};

export default PolarChart;
