import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
    const [date, setDate] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            console.log('Get req', response.data);
            setDate(response.data);
        });
    }, []);

    // console.log(date);
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

    for (let i = 0; i < date.length; i++) {
        month[i] = new Date(date[i].createdAt).getMonth();
        let service = date[i].service.length;
        if (month[i] === 0) {
            jan1 = jan1 + service;
            jan = jan + 1;
        } else if (month[i] === 1) {
            feb1 = feb1 + service;
            feb = feb + 1;
        } else if (month[i] === 2) {
            mar1 = mar1 + service;
            mar = mar + 1;
        } else if (month[i] === 3) {
            apr1 = apr1 + service;
            apr = apr + 1;
        } else if (month[i] === 4) {
            may1 = may1 + service;
            may = may + 1;
        } else if (month[i] === 5) {
            jun1 = jun1 + service;
            jun = jun + 1;
        } else if (month[i] === 6) {
            jly1 = jly1 + service;
            jly = jly + 1;
        } else if (month[i] === 7) {
            aug1 = aug1 + service;
            aug = aug + 1;
        } else if (month[i] === 8) {
            sept1 = sept1 + service;
            sept = sept + 1;
        } else if (month[i] === 9) {
            oct1 = oct1 + service;
            oct = oct + 1;
        } else if (month[i] === 10) {
            nov1 = nov1 + service;
            nov = nov + 1;
        } else if (month[i] === 11) {
            dec1 = dec1 + service;
            dec = dec + 1;
        }
    }

    return (
        <Card>
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
                            label: 'Total Initialization',
                            data: [jan, feb, mar, apr, may, jun, jly, aug, sept, oct, nov, dec],
                            backgroundColor: ['#09a4b4']
                        },
                        {
                            label: 'Under Testing',
                            data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                            backgroundColor: ['#42a5f5']
                        }
                    ]
                }}
                // Height of graph
                height={400}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Month Wise Chart'
                        }
                    },
                    maintainAspectRatio: false,
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
            {/* <Bar style={{ marginTop: '1.5em', marginLeft: '1.5em', marginRight: '1.5em' }} options={options} data={data} /> */}
        </Card>
    );
}

export default BarChart;
