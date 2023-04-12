import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import axios from 'axios';

function CommercialChart() {
    const [date, setDate] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/addCr';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data);
            setDate(response.data);
        });
    }, []);
    const month = [];
    let jan = 0;
    let dec = 0;
    let feb = 0;
    let apr = 0;
    let may = 0;
    let jun = 0;
    let jly = 0;
    let aug = 0;
    let sept = 0;
    let oct = 0;
    let nov = 0;
    let mar = 0;
    for (let i = 0; i < date.length; i++) {
        month[i] = new Date(date[i].createdAt).getMonth();
        if (month[i] === 0) {
            jan = jan + 1;
        } else if (month[i] === 1) {
            feb = feb + 1;
        } else if (month[i] === 2) {
            mar = mar + 1;
        } else if (month[i] === 3) {
            apr = apr + 1;
        } else if (month[i] === 4) {
            may = may + 1;
        } else if (month[i] === 5) {
            jun = jun + 1;
        } else if (month[i] === 6) {
            jly = jly + 1;
        } else if (month[i] === 7) {
            aug = aug + 1;
        } else if (month[i] === 8) {
            sept = sept + 1;
        } else if (month[i] === 9) {
            oct = oct + 1;
        } else if (month[i] === 10) {
            nov = nov + 1;
        } else if (month[i] === 11) {
            dec = dec + 1;
        }
    }
    return (
        <>
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
                            label: 'Commercial Review',
                            data: [jan, feb, mar, apr, may, jun, jly, aug, sept, oct, nov, dec],
                            backgroundColor: ['#7294d2']
                        }
                    ]
                }}
                // Height of graph
                height="140%"
                options={{
                    // responsive: true,
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
        </>
    );
}

export default CommercialChart;
