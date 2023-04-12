import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import axios from 'axios';

function UnderTestingChart() {
    const [date1, setDate1] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data);
            setDate1(response.data);
        });
    }, []);
    const month1 = [];
    let jan1 = 0;
    let dec1 = 0;
    let feb1 = 0;
    let apr1 = 0;
    let may1 = 0;
    let jun1 = 0;
    let jly1 = 0;
    let aug1 = 0;
    let sept1 = 0;
    let oct1 = 0;
    let nov1 = 0;
    let mar1 = 0;
    for (let i = 0; i < date1.length; i++) {
        month1[i] = new Date(date1[i].createdAt).getMonth();
        if (month1[i] === 0) {
            jan1 = jan1 + 1;
        } else if (month1[i] === 1) {
            feb1 = feb1 + 1;
        } else if (month1[i] === 2) {
            mar1 = mar1 + 1;
        } else if (month1[i] === 3) {
            apr1 = apr1 + 1;
        } else if (month1[i] === 4) {
            may1 = may1 + 1;
        } else if (month1[i] === 5) {
            jun1 = jun1 + 1;
        } else if (month1[i] === 6) {
            jly1 = jly1 + 1;
        } else if (month1[i] === 7) {
            aug1 = aug1 + 1;
        } else if (month1[i] === 8) {
            sept1 = sept1 + 1;
        } else if (month1[i] === 9) {
            oct1 = oct1 + 1;
        } else if (month1[i] === 10) {
            nov1 = nov1 + 1;
        } else if (month1[i] === 11) {
            dec1 = dec1 + 1;
        }
    }
    return (
        <Bar
            data={{
                // Name of the variables on x-axies for each bar
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                datasets: [
                    {
                        label: 'Under Testing',
                        data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                        backgroundColor: ['#9cbef2']
                    }
                ]
            }}
            // Height of graph
            height="140%"
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Month Wise'
                    }
                },
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                // The y-axis value will start from zero
                                beginAtZero: true
                            }
                        }
                    ]
                },
                legend: {
                    labels: {
                        fontSize: 15
                    }
                }
            }}
        />
    );
}

export default UnderTestingChart;
