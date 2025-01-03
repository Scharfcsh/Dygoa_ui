import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";


Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler
);

const EnergyGraph = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const MAX_POINTS = 14; // Limit the graph to show a maximum of 14 points

  // Function to update the chart with new data points
  const updateChart = (newTimestamps, newTotalDemand, newEnergyProduced) => {
    if (chartInstance.current) {
      const chart = chartInstance.current;

      // Update labels (timestamps)
      chart.data.labels.push(...newTimestamps);
      if (chart.data.labels.length > MAX_POINTS) {
        chart.data.labels.splice(0, chart.data.labels.length - MAX_POINTS);
      }

      // Update Total Demand dataset
      const totalDemandDataset = chart.data.datasets[0];
      totalDemandDataset.data.push(...newTotalDemand);
      if (totalDemandDataset.data.length > MAX_POINTS) {
        totalDemandDataset.data.splice(
          0,
          totalDemandDataset.data.length - MAX_POINTS
        );
      }

      // Update Energy Produced dataset
      const energyProducedDataset = chart.data.datasets[1];
      energyProducedDataset.data.push(...newEnergyProduced);
      if (energyProducedDataset.data.length > MAX_POINTS) {
        energyProducedDataset.data.splice(
          0,
          energyProducedDataset.data.length - MAX_POINTS
        );
      }

      chart.update(); // Refresh the chart with the new data
    }
  };

  // Fetch data and update the chart
  const fetchData = async () => {
    try {
      const productionResponse = await fetch(
        "http://127.0.0.1:5000/api/energy-production"
      );
      const consumptionResponse = await fetch(
        "http://127.0.0.1:5000/api/energy-demand"
      );

      const prodData = await productionResponse.json();
      const consData = await consumptionResponse.json();

      // Ensure prodData and consData are arrays
      const formattedProdData = Array.isArray(prodData) ? prodData : [prodData];
      const formattedConsData = Array.isArray(consData) ? consData : [consData];

      // Extract new data points
      const newTimestamps = formattedProdData.map((entry) =>
        entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : "-"
      );
      const newTotalDemand = formattedConsData.map(
        (entry) => entry.total_demand_kwh || 0
      );
      const newEnergyProduced = formattedProdData.map(
        (entry) => entry.energy_produced_kwh || 0
      );

      // Log the mapped data
      console.log("New Timestamps:", newTimestamps);
      console.log("New Total Demand:", newTotalDemand);
      console.log("New Energy Produced:", newEnergyProduced);

      updateChart(newTimestamps, newTotalDemand, newEnergyProduced);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initialize the chart and fetch data periodically
  useEffect(() => {
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [], // Initialize with empty labels
          datasets: [
            {
              label: "Total Demand (kWh)",
              data: [],
              borderColor: "rgba(248, 113, 113, 1)", // Tailwind Red
              backgroundColor: "rgba(248, 113, 113, 0.5)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Energy Produced (kWh)",
              data: [],
              borderColor: "rgba(96, 165, 250, 1)", // Tailwind Blue
              backgroundColor: "rgba(96, 165, 250, 0.5)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: false,
              text: "Energy Production vs. Demand",
              font: {
                size: 12,
              },
              padding: {
                top: 1,
                bottom: 1,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Energy (kWh)",
              },
            },
          },
          animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: "easeInOutQuad", // Easing function for the animation
          },
        },
      });
    }

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy chart on component unmount
      }
    };
  }, []);

  return (
    <div className="p-6 bg-transparent rounded-md shadow-md h-full relative">
      
        <canvas ref={chartRef} className="w-80 h-2/3" />
      
    </div>
  );
};

export default EnergyGraph;

