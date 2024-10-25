import React, { useEffect, useRef } from 'react';
import {  Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend,DoughnutController);
const VisitorsAnalytics = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        console.log('Canvas context:', ctx);
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
                datasets: [{
                    data: [35, 45, 12, 8],
                    backgroundColor: ['#759bcd', '#10df14', '#460cf3', '#ed0404'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        console.log('Biểu đồ đã được tạo:', myChart);
        return () => {
            console.log('Dọn dẹp biểu đồ...');
            myChart.destroy();
            console.log('Biểu đồ đã được dọn dẹp.');
        };
    }, []);

    return (
        <div className="text-center">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Visitors Analytics</h2>
            </div>
            <canvas ref={canvasRef} width={400} height={400} className="w-full h-full"></canvas>
            <div className="mt-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#759bcd] inline-block mr-2"></span>
                        <span className="text-xs">Desktop 35%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#10df14] inline-block mr-2"></span>
                        <span className="text-xs">Mobile 45%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#460cf3] inline-block mr-2"></span>
                        <span className="text-xs">Tablet 12%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#ed0404] inline-block mr-2"></span>
                        <span className="text-xs">Unknown 8%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorsAnalytics;
