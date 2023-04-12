import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [5, 10, 12, 11, 4, 7, 0, 1, 7, 20, 12, 8],
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: 'Dataset 2',
                data: [5, 10, 12, 11, 4, 7, 0, 1, 7, 20, 12, 8],
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    };
    return <Bar options={options} data={data} />;
}

export default BarChart;
