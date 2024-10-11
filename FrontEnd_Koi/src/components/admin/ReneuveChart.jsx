import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, LineController } from 'chart.js';

Chart.register(LineElement, LineController, CategoryScale, PointElement, LinearScale, Tooltip, Legend);

function ChartComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        let myChart;

        try {
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: [20, 30, 25, 35, 40, 50, 45, 60, 55, 50, 45, 60],
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                        },
                        {
                            label: 'Total Sales',
                            data: [10, 20, 15, 25, 30, 40, 35, 50, 45, 40, 35, 50],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        },
                        x:{
                            type:'category',
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            console.log('Chart created successfully:', myChart);
        } catch (error) {
            console.error('Error creating chart:', error);
        }

        return () => {
            if (myChart) {
                myChart.destroy();
                console.log('Chart destroyed.');
            }
        };
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-blue-600 font-semibold">Total Revenue</span>
                    </div>
                    <div className="text-gray-500">12.04.2022 - 12.05.2022</div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                        <span className="text-teal-400 font-semibold">Total Sales</span>
                    </div>
                    <div className="text-gray-500">12.04.2022 - 12.05.2022</div>
                </div>
            </div>
            <canvas ref={canvasRef} width={400} height={200}></canvas>
        </div>
    );
}

export default ChartComponent;
