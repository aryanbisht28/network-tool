import React from 'react';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import { Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Budget from './Card.js';
import Bar from './BarChart.js';
import PieChart from './PieChart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [date, setDate] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/addCr';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data[4].createdAt.getMonth());
            setDate(response.data);
        });
    }, []);

    // console.log(date);
    const month = [];
    for (let i = 0; i < date.length; i++) {
        // console.log(date[i].createdAt);
        month[i] = date[i].createdAt;
    }
    let totalCr = 0;
    for (let i = 0; i < month.length; i++) {
        // console.log(date[i].createdAt);
        totalCr = totalCr + 1;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={4}>
                            <Budget name="Total Commercial Review" total={totalCr} />
                        </Grid>
                        <Grid item xs={4}>
                            <Budget name="Total Country Wise Review" total={totalCr} />
                        </Grid>
                        <Grid item xs={4}>
                            <Budget name="Total" total="10" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={7} style={{ height: '80vh' }}>
                            <PieChart />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Bar />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
