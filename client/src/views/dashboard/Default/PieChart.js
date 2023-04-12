import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [dataa, setDataa] = useState([]);
    const [dataa1, setDataa1] = useState([]);
    const [dataa2, setDataa2] = useState([]);
    const [btnval, setBtnval] = useState('1');
    const [label, setLabel] = useState([]);
    const [label1, setLabel1] = useState([]);
    const [label2, setLabel2] = useState([]);
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

    useEffect(() => {
        const url = 'http://localhost:8080/subs/service';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa1(response.data);
            let label1 = response.data.map((d) => d['_id']);
            setLabel1(label1);
            console.log('label1', label1);
        });
    }, []);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini/tservice';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa2(response.data);
            let label1 = response.data.map((d) => d['_id']);
            setLabel2(label1);
            console.log('label2', label2);
        });
    }, []);
    function handleClick() {
        setBtnval('1');
    }
    function handleClick1() {
        setBtnval('2');
    }
    function handleClick2() {
        setBtnval('3');
    }
    console.log('btn', btnval);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Testing Services Summary'
            }
        },
        responsive: true
    };

    const options1 = {
        plugins: {
            title: {
                display: true,
                text: 'Completed Services Summary'
            }
        },
        responsive: true
    };

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Launched Services Summary'
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

    const dat1 = {
        labels: label2,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                label: 'Values1',
                data: dataa2.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    const dat2 = {
        labels: label1,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                label: 'Values2',
                data: dataa1.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    return (
        <Card style={{ height: '62vh' }}>
            {btnval == '1' ? (
                <Pie
                    style={{ marginTop: '1.5em', marginLeft: '1.5em', marginRight: '1.5em', height: '90%' }}
                    data={dat}
                    options={options}
                />
            ) : btnval == '2' ? (
                <Pie
                    style={{ marginTop: '1.5em', marginLeft: '1.5em', marginRight: '1.5em', height: '90%' }}
                    data={dat1}
                    options={options1}
                />
            ) : (
                <Pie
                    style={{ marginTop: '1.5em', marginLeft: '1.5em', marginRight: '1.5em', height: '90%' }}
                    data={dat2}
                    options={options2}
                />
            )}
            <Grid item xs={12} style={{ margin: '1em' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <Button variant="outlined" onClick={handleClick} style={{ fontSize: '0.7em' }}>
                            Testing Services
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button variant="outlined" onClick={handleClick1} style={{ fontSize: '0.7em' }}>
                            Completed Services
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button variant="outlined" onClick={handleClick2} style={{ fontSize: '0.7em' }}>
                            Launched Services
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

export default PieChart;
