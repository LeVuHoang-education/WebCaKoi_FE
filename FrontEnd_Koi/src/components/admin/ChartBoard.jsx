import { useEffect, useRef,useState } from 'react';
import {  Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import {fetchOrders} from "../../service/OrdersApi.jsx";

Chart.register(ArcElement, Tooltip, Legend,DoughnutController);
const VisitorsAnalytics = () => {
    const canvasRef = useRef(null);
    const [data, setData] = useState([0, 0, 0]);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const ordersList = await fetchOrders();
                const ordersRepair = ordersList.data.filter(order => order.serviceType === 'REPAIR');
                const ordersMaintenance = ordersList.data.filter(order => order.serviceType === 'MAINTENANCE');
                const total = ordersList.data.length;

                setData((prevData) => {
                    const newData = [...prevData];
                    newData[0] = Math.floor((ordersRepair.length / total) * 100);
                    newData[1] = Math.floor((ordersMaintenance.length / total) * 100);
                    newData[2] = 100 - newData[0] - newData[1];
                    return newData;
                });
            }catch (e) {
                console.error(e);
            }
        }
        getOrders();
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        console.log('Canvas context:', ctx);
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Repair', 'Maintence', 'Design'],
                datasets: [{
                    data: data,
                    backgroundColor: ['#79aefd', 'rgba(138,244,109,0.99)', '#f88ac4'],
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
    }, [data]);

    return (
        <div className="text-center">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Revenue Analytics</h2>
            </div>
            <canvas ref={canvasRef} width={400} height={400} className="w-full h-full"></canvas>
            <div className="mt-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#79AEFDFF] inline-block mr-2"></span>
                        <span className="text-xs">Repair {data[0]}%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#8AF46DFC] inline-block mr-2"></span>
                        <span className="text-xs">Maintence {data[1]}%</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-[#F88AC4FF] inline-block mr-2"></span>
                        <span className="text-xs">Design {data[2]}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorsAnalytics;
