import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

function OwnDetails({ row }) {
    console.log('row from own', row);
    const [data, setData] = useState(row['Sim']);
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('400px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const column = [
        { name: 'TADIG', label: 'TADIG', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'MCC',
            label: 'MCC/MNC'
        },
        {
            name: 'IMSI',
            label: 'IMSI'
        },
        {
            name: 'ICCID',
            label: 'ICCID'
        },
        // {
        //     name: 'MSISDN',
        //     label: 'MSISDN'
        // },
        // {
        //     name: 'CardFormat',
        //     label: 'Card Format'
        // },
        {
            name: 'ValidUntil',
            label: 'Valid Until'
        },
        // {
        //     name: 'CreationDate',
        //     label: 'Creation Date'
        // },
        {
            name: 'Status',
            label: 'Status'
        }
    ];

    const status = data.length == 0 ? 'No Data' : 'Fetching Details';
    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        selectableRows: false,
        textLabels: {
            body: {
                noMatch: status
            }
        },
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: 'dropdown',
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
            console.log(action);
            console.dir(state);
        }
    };

    // const data = [];
    return (
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={createTheme()}>
                <MUIDataTable title={'Own SIM Details'} data={data} columns={column} options={options} />
            </ThemeProvider>
        </CacheProvider>
    );
}

export default OwnDetails;
