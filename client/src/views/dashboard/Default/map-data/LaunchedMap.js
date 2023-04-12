import React from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ReactWorldCountriesMap } from 'react-world-countries-map';

function LaunchedMap() {
    const [country, setCountry] = useState([]);
    const iso = require('iso-3166-1-alpha-2');

    useEffect(() => {
        const url = 'http://localhost:8080/subs/country';
        axios.get(url).then((response) => {
            console.log('Get req country', response.data);
            setCountry(response.data);
        });
    }, []);

    const data = [];

    for (let i = 0; i < country.length; i++) {
        data.push({ country: iso.getCode(country[i]._id), value: country[i].count });
    }
    console.log('data', data);

    return (
        <>
            <h4 style={{ textAlign: 'center' }}>Country Wise (Launched)</h4>
            <ReactWorldCountriesMap size="md" color="#203864" value-suffix="people" data={data} />
        </>
    );
}

export default LaunchedMap;
