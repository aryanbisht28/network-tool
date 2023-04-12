import React from 'react';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import { Box, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Budget from './Card.js';
import BarChart from './BarChart.js';
import PieChart from './PieChart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardPartner() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            console.log('Get req', response.data);
            setData(response.data);
        });
    }, []);
    const month = [];
    const service = [];
    for (let i = 0; i < data.length; i++) {
        // console.log(date[i].createdAt);
        month[i] = data[i].createdAt;
        service[i] = data[i].service;
    }
    let totalIni = 0;
    for (let i = 0; i < month.length; i++) {
        // console.log(date[i].createdAt);
        totalIni = totalIni + 1;
    }
    console.log(totalIni);
    let x = 0;
    for (let i = 0; i < service.length; i++) {
        for (let j = 0; j < service[i].length; j++) {
            x = x + 1;
        }
    }
    console.log(x);
    console.log('this', service);
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} style={{ marginTop: '-0.6em' }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={4}>
                            <Budget name="Initialization" total={totalIni} />
                        </Grid>
                        <Grid item xs={4}>
                            <Budget name="Testing" total={x} />
                        </Grid>
                        <Grid item xs={4}>
                            <Budget name="Launch" total="34" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} style={{ marginTop: '-2.5em' }}>
                        <Grid item xs={12} md={8}>
                            <BarChart />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PieChart />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardPartner;
