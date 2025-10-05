import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de Chart.js necesarios
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Primer componente: Consumo de Electricidad y Emisiones de CO2
const Graphics2 = () => {
  // Datos para la gráfica de Consumo de Electricidad
  const lineChartData1 = {
    labels: [0, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
    }],
  };

  const lineChartOptions1 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Consumo de electricidad anual" },
    },
    scales: {
      y: {
        min: 6,
        max: 16
      }
    }
  };

  // Datos para la gráfica de Emisiones de CO2
  const barChartData1 = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [{
      backgroundColor: ["green", "green", "green", "green", "green"],
      data: [55, 49, 44, 24, 66],
    }],
  };    

  const barChartOptions1 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Emisiones de C02 anual" },
    }
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-wrapper">
        <Line data={lineChartData1} options={lineChartOptions1} />
      </div>
      
      <div>
        <Bar data={barChartData1} options={barChartOptions1} />
      </div>
    </div>
  );
};

export default Graphics2