import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Graphics = () => {
    // Proyección de contaminación: energía y aerosoles
    const pollutionData = {
        labels: ["2025", "2026", "2027", "2028", "2029"],
        datasets: [
            {
                label: "Energía Base (kWh/año)",
                data: [975935, 975935, 975935, 975935, 975935],
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.1)",
                fill: false,
                tension: 0.2,
            },
            {
                label: "Energía Proyectada (kWh/año)",
                data: [
                    975935,
                    1122300,  // +15%
                    1290645,
                    1484242,
                    1706888
                ],
                borderColor: "red",
                backgroundColor: "rgba(255,0,0,0.1)",
                fill: false,
                tension: 0.2,
            },
            {
                label: "Aerosoles Proyectados (ton/año)",
                data: [
                    7446588,       // valor inicial alto
                    8191247,       // +10%
                    9000371,       // +10%
                    9900408,       // +10%
                    10890449       // +10%
                ],
                borderColor: "green",
                backgroundColor: "rgba(0,255,0,0.1)",
                fill: false,
                tension: 0.2,
            }
        ]
    };
    const pollutionOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Impacto Ambiental: Energía y Aerosoles - Monterey" },
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    // Datos socioeconómicos: PIB y densidad poblacional proyectados
    const socioEconomicData = {
        labels: ["2025", "2026", "2027", "2028", "2029"],
        datasets: [
            {
                label: "Aporte al PIB (millones USD)",
                data: [1500, 1650, 1815, 1995, 2195],
                backgroundColor: "purple"
            },
            {
                label: "Densidad Poblacional (hab/km²)",
                data: [1200, 1215, 1230, 1250, 1270],
                backgroundColor: "orange"
            }
        ]
    };
    const socioEconomicOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Impacto Socioeconómico: PIB y Densidad Poblacional" },
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="graphics-container">
            <div className="chart-wrapper">
                <Line data={pollutionData} options={pollutionOptions} />
            </div>
            <div className="chart-wrapper">
                <Bar data={socioEconomicData} options={socioEconomicOptions} />
            </div>
        </div>
    );
};

export default Graphics;
