import { useEffect, useRef } from 'react'
import * as Chart from 'chart.js'
import { useCarHistoryStore } from "../store/carHistoryStore.js"
import { Typography } from "@material-tailwind/react"

// Import Chart.js plugins
Chart.Chart.register( Chart.LineController, Chart.LineElement, Chart.PointElement, Chart.LinearScale, Chart.TimeScale, Chart.CategoryScale, Chart.Tooltip, Chart.Legend, Chart.Filler);

const StockChart = ({ carId, dangerStock, wishStock }) => {

    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    const carHistory = useCarHistoryStore((state) => state.carHistory) ?? [];
    const getOneCarHistory = useCarHistoryStore((state) => state.getOneCarHistory);
    const historyLoading = useCarHistoryStore((state) => state.historyLoading);

    useEffect(() => {
        if (carId) {
            getOneCarHistory(carId);
        }
    }, [carId]);

    // Graph design
    useEffect(() => {
        if (!canvasRef.current || !carHistory || carHistory.length === 0) return;

        // Data's preparation & formatting
        // Data extraction
        const labels = carHistory.map(entry => {
            const date = new Date(entry.createdAt)

            return date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        });

        const stockValues = carHistory.map(entry => entry.currentStock);

        // Destruction of the previous chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Graph creation
        chartRef.current = new Chart.Chart(canvasRef.current, {
            type: 'line',

            data: {
                labels: labels,
                datasets: [
                    // Current Stock
                    {
                    label: 'Stock',
                    data: stockValues,  // Axe Y : stock value

                    // Style de la ligne
                    borderColor: '#ff6f00',
                    borderWidth: 3,

                    // Style des points
                    pointBackgroundColor: '#ff6f00',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,

                    // filled under the line
                    fill: true,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',

                    // Smooth curve
                    tension: 0.3,
                    },

                    // Danger Stock
                    {
                        label: 'Danger Stock',
                        data: labels.map(() => dangerStock),
                        borderColor: 'red',
                        borderWidth: 2,
                        borderDash: [6, 6], // Dotted line
                        pointRadius: 0,
                        fill: false,
                        tension: 0,
                    },

                    // Wish Stock
                    {
                        label: 'Wish Stock',
                        data: labels.map(() => wishStock),
                        borderColor: 'limegreen',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        pointRadius: 0,
                        fill: false,
                        tension: 0,
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    // Legend
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#ffffff',
                            font: { size: 13 },
                        }
                    },

                    // Tooltip
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return ` Stock : ${context.parsed.y} cars`;
                            }
                        }
                    }
                },

                scales: {
                    // Axe X (Time)
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                            color: '#ffffff',
                            font: { size: 13, weight: 'bold' }
                        },
                        ticks: {
                            color: '#cbd5e1',
                            maxRotation: 45,
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },

                    // Axe Y (Quantity)
                    y: {
                        title: {
                            display: true,
                            text: 'Stock quantity',
                            color: '#ffffff',
                            font: { size: 13, weight: 'bold' }
                        },
                        beginAtZero: true,
                        ticks: {
                            color: '#cbd5e1',
                            stepSize: 1,
                            precision: 0
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });

        // Clean
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };

    }, [carHistory]);

    // Render
    if (historyLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography color="white">Loading chart...</Typography>
            </div>
        );
    }

    if (!carHistory || carHistory.length === 0) {
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

export default StockChart;