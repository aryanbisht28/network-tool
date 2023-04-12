import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [dataa, setDataa] = useState([]);
    const [data, setData] = useState([]);
    const [label, setLabel] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/ppini/service';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa(response.data);
            let label = response.data.map((d) => d['_id']);
            setLabel(label);
            console.log('label', label);
        });
    }, []);

    // const service = [];
    // for (let i = 0; i < dataa.length; i++) {
    //     dataa.push({ labels: dataa[i]._id, value: dataa[i].count });
    // }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Partner Provisioning Summary'
            }
        },
        responsive: true
    };

    // console.log('hi data', dataa.count);

    const dat = {
        labels: label,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                label: 'Values',
                data: dataa.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    return (
        <Card style={{ height: '100%' }}>
            <Pie style={{ marginTop: '1.5em', marginLeft: '1.5em', marginRight: '1.5em', height: '90%' }} data={dat} options={options} />
        </Card>
    );
}

export default PieChart;
