import { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';
import { useCarHistoryStore } from "../store/carHistoryStore.js";
import { Typography } from "@material-tailwind/react";

// Import Chart.js plugins
Chart.Chart.register(Chart.LineController, Chart.LineElement, Chart.PointElement, Chart.LinearScale, Chart.CategoryScale, Chart.Tooltip, Chart.Legend,);

// Car's colors
const COLORS = [
    '#2563eb', // blue
    '#10b981', // green
    '#f59e0b', // orange
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#84cc16', // lime green
]

const LinearChart = () => {

    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const carsHistory = useCarHistoryStore((state) => state.carsHistory) ?? [];
    const getCarsHistorical = useCarHistoryStore((state) => state.getCarsHistorical);
    const historyLoading = useCarHistoryStore((state) => state.historyLoading);

    useEffect(() => {
        getCarsHistorical();
    }, []);

    // Graph design
    useEffect(() => {
        if (!canvasRef.current || !carsHistory || carsHistory.length === 0) return;

        console.log("Données brutes :", carsHistory);

        const carGroups = {};

        // Data's filtrations
        const validHistory = carsHistory.filter(entry => entry.carId !== null);

        validHistory.forEach(entry => {
            const carId  = entry.carId._id;
            const carName = `${entry.carId.brand} ${entry.carId.model}`;
            const dateKey = new Date(entry.createdAt).toLocaleDateString("fr-FR", {
                day:   "2-digit",
                month: "2-digit",
                year:  "numeric"
            })

            // Creat the car group if it doesn't exist yet
            if (!carGroups[carId]) {
                carGroups[carId] = {
                    name: carName,
                    data: {}
                }
            }

            carGroups[carId].data[dateKey] = entry.currentStock
        });

        console.log("Data grouped by car :", carGroups)

        // Data's preparation & formatting
        const allDates = [...new Set(
            validHistory.map(entry =>
                new Date(entry.createdAt).toLocaleDateString("fr-FR", {
                    day:   "2-digit",
                    month: "2-digit",
                    year:  "numeric"
                })
            )
        )].sort((a, b) => {
            // Date format: DD/MM/YYYY
            const [dayA, monthA, yearA] = a.split('/');
            const [dayB, monthB, yearB] = b.split('/');
            return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
        });

        console.log("Dates triées :", allDates);

        // Formating & styling
        const datasets = Object.values(carGroups).map((car, index) => ({
            label:           car.name,
            // For each date, get the value or null if no data
            data:            allDates.map(date => car.data[date] ?? null),

            // Line style
            borderColor:     COLORS[index % COLORS.length],
            borderWidth:     2,

            // Point style
            pointBackgroundColor: COLORS[index % COLORS.length],
            pointBorderColor:     '#ffffff',
            pointBorderWidth:     2,
            pointRadius:          5,
            pointHoverRadius:     7,

            // No fill under the line
            fill:            false,

            // Smooth curve
            tension:         0.3,

            // Connect the points even if there are null values between them
            spanGaps:        true,
        }));

        // Destruction of the previous chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Graph creation
        chartRef.current = new Chart.Chart(canvasRef.current, {
            type: 'line',

            data: {
                labels:   allDates,
                datasets: datasets    // A line = a car
            },

            options: {
                responsive:          true,
                maintainAspectRatio: false,

                plugins: {
                    // Légende (car's list with colors)
                    legend: {
                        display:  true,
                        position: 'top',
                        labels: {
                            color:          '#ffffff',
                            font:           { size: 12 },
                            padding:        20,
                            usePointStyle:  true,  // styling of the points
                        }
                    },

                    // Tooltip
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                if (context.parsed.y === null) return null;
                                return ` ${context.dataset.label} : ${context.parsed.y} cars`;
                            }
                        }
                    }
                },

                scales: {
                    // Axe X (Time)
                    x: {
                        title: {
                            display: true,
                            text:    'Date',
                            color:   '#ffffff',
                            font:    { size: 13, weight: 'bold' }
                        },
                        ticks: {
                            color:        '#cbd5e1',
                            maxRotation:  45,
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },

                    // Axe Y (Quantity)
                    y: {
                        title: {
                            display: true,
                            text:    'Stock quantity',
                            color:   '#ffffff',
                            font:    { size: 13, weight: 'bold' }
                        },
                        beginAtZero: true,
                        ticks: {
                            color:     '#cbd5e1',
                            stepSize:  1,
                            precision: 0   // Whole numbers only
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });

        // Cleanup when the component is removed
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };

    }, [carsHistory]);

    // Render
    if (historyLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography color="white">Loading chart...</Typography>
            </div>
        );
    }

    if (!carsHistory || carsHistory.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography color="white">No stock history available</Typography>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default LinearChart;