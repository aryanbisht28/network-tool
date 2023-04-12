import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import Alert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

function Testing() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('200px');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [partner, setPartner] = React.useState('');
    const [data, setData] = React.useState([]);
    const [dataInbound, setdataInbound] = React.useState([]);
    const [dataOutbound, setdataOutbound] = React.useState([]);
    const [service, setService] = React.useState('Inbound');
    const [serviceSentIn, setserviceSentIn] = useState([]);
    const [serviceSentOut, setserviceSentOut] = useState([]);
    const [alignment, setAlignment] = React.useState('Inbound');
    const [active1, setActive1] = useState(false);
    const [serviceLenIn, setServiceLenIn] = useState('');
    const [serviceLenOut, setServiceLenOut] = useState('');
    const [rp, setRp] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [inOpen, setInOpen] = React.useState(false);
    const [outOpen, setOutOpen] = React.useState(false);
    const handleOut = () => {
        setInOpen(false);
        setOutOpen(true);
    };
    const handleIn = () => {
        setOutOpen(false);
        setInOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [buttonStyles, setButtonStyles] = useState(Array(dataInbound.length).fill({}));
    const handleInputChange = (event, index) => {
        setButtonStyles((prevButtonStyles) => {
            // Create a new array with the same length as the previous buttonStyles array
            // and copy over all the values from the previous array
            const newButtonStyles = prevButtonStyles.slice(); // Update the value at the specified index with the new style object
            newButtonStyles[index] = '#757ce8';
            return newButtonStyles;
        });
    };
    const [buttonStyles1, setButtonStyles1] = useState(Array(dataInbound.length).fill({}));
    const handleInputChange1 = (event, index) => {
        setButtonStyles1((prevButtonStyles) => {
            // Create a new array with the same length as the previous buttonStyles array
            // and copy over all the values from the previous array
            const newButtonStyles = prevButtonStyles.slice(); // Update the value at the specified index with the new style object
            newButtonStyles[index] = '#757ce8';
            return newButtonStyles;
        });
    };

    React.useEffect(() => {
        const url = 'http://localhost:8080/ppini/testing';
        axios.get(url).then((response) => {
            setData(response.data);
            // let rpSet = new Set(response.data.map((item) => item.roamPartner));

            // console.log('tadig', rpSet, response.data);
            // const array = Array.from(rpSet);

            // setRp(array);
        });
        // setData(response.data);
    }, []);

    const handleChange = (event) => {
        console.log('event.target.value', event.target.value);
        setPartner(event.target.value);
        getFilteredData(event.target.value);
    };

    const handleActive = () => {
        setActive1(!active1);
    };
    console.log('helloo', dataInbound);

    const submitOutbound = async (e) => {
        try {
            let count1 = 0;
            let service = [];
            for (let i = 0; i < dataOutbound.length; i++) {
                if (dataOutbound[i].document != '' && dataOutbound[i].date != '') {
                    count1++;
                    service.push(dataOutbound[i].service);
                }
            }
            const url = 'http://localhost:8080/testing';
            let count = 0;
            if (count1 === serviceLenOut) {
                console.log('hi');
                for (let i = 0; i < dataOutbound.length; i++) {
                    count++;
                    const formdata = new FormData();
                    formdata.append('pname', partner);
                    formdata.append('direction', 'Outbound');
                    formdata.append('sno', dataOutbound[i].sno);
                    formdata.append('service', dataOutbound[i].service);
                    formdata.append('document', dataOutbound[i].document);
                    formdata.append('OutboundTapFile', dataOutbound[i].OutboundTapFile);
                    formdata.append('date', dataOutbound[i].date);
                    await axios.post(url, formdata).then((resp) => {
                        if (resp.data === 'posted' && count === dataOutbound.length) {
                            axios
                                .get('http://localhost:8080/testing/sendMail', {
                                    params: {
                                        pname: partner,
                                        direction: 'Outbound',
                                        service: serviceSentOut,
                                        data: dataOutbound
                                    }
                                })
                                .then(async (resp) => {
                                    let url1 = 'http://localhost:8080/ppini/UpdateService';
                                    const formdata1 = {};
                                    formdata1['pname'] = partner;
                                    formdata1['direction'] = 'Outbound';
                                    formdata1['service'] = service;
                                    console.log('formdata 1 ', formdata1);
                                    await axios.patch(url1, formdata1).then((resp) => {
                                        if (resp.data) {
                                            window.location.href = '/pages/PatnerProvisioning/testing';
                                        }
                                    });
                                });
                            // window.location.href = '/pages/PatnerProvisioning/testing';
                        }
                    });
                }
            } else {
                console.log('chl ra hai');
                handleClickOpen();

                // alert('Kindly Upload All the documents');
                // <Alert severity="error"></Alert>;
                // <Alert>.</Alert>;
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };
    const submitInbound = async (e) => {
        e.preventDefault();
        try {
            //console.log('hi');
            let count1 = 0;
            let service = [];
            for (let i = 0; i < dataInbound.length; i++) {
                if (dataInbound[i].document != '' && dataInbound[i].date != '') {
                    service.push(dataInbound[i].service);
                    count1++;
                }
            }
            console.log('dataInbound of submit', dataInbound[1].document, count1, serviceLenIn);
            const url = 'http://localhost:8080/testing';
            let count = 0;
            if (count1 === serviceLenIn) {
                console.log('hi');
                for (let i = 0; i < dataInbound.length; i++) {
                    count++;
                    const formdata = new FormData();
                    formdata.append('pname', partner);
                    formdata.append('direction', 'Inbound');
                    formdata.append('sno', dataInbound[i].sno);
                    formdata.append('service', dataInbound[i].service);
                    formdata.append('document', dataInbound[i].document);
                    formdata.append('InboundTapFile', dataInbound[i].InboundTapFile);
                    formdata.append('date', dataInbound[i].date);
                    await axios.post(url, formdata).then((resp) => {
                        console.log('resp', resp);
                        if (resp.data === 'posted' && count === dataInbound.length) {
                            // const formdata = new FormData();
                            // formdata.append('pname', partner);
                            // formdata.append('direction', 'Inbound');
                            axios
                                .get('http://localhost:8080/testing/sendMail', {
                                    params: {
                                        pname: partner,
                                        direction: 'Inbound',
                                        service: serviceSentIn,
                                        data: dataInbound
                                    }
                                })
                                .then(async (resp) => {
                                    let url1 = 'http://localhost:8080/ppini/UpdateService';
                                    const formdata1 = {};
                                    formdata1['pname'] = partner;
                                    formdata1['direction'] = 'Inbound';
                                    formdata1['service'] = service;
                                    console.log('formdata 1 ', formdata1);
                                    await axios.patch(url1, formdata1).then((resp) => {
                                        if (resp.data) {
                                            window.location.href = '/pages/PatnerProvisioning/testing';
                                        }
                                    });
                                });
                        }
                    });
                }
            } else {
                console.log('chl ra hai');
                handleClickOpen();
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };

    const columns = [
        { name: 'sno', label: 'S No.', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'service',
            label: 'Service'
        },
        {
            name: 'Inbound',
            label: 'Inbound Documents',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataInbound[index].sno;
                    obj['service'] = dataInbound[index].service;
                    obj['InboundTapFile'] = dataInbound[index].InboundTapFile;
                    obj['date'] = dataInbound[index].date;
                    return (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                component="label"
                                // style={{ fontSize: '.9em', backgroundColor: active1 ? '#757ce8' : '#42a5f5' }}
                                // onChange={handleActive}
                                style={{ backgroundColor: buttonStyles[index], fontSize: '.9em' }}
                            >
                                Upload Docs
                                <input
                                    hidden
                                    required
                                    accept="application/pdf"
                                    multiple
                                    type="file"
                                    name="Inbound"
                                    id={`fileInput-${index}`}
                                    onChange={(event) => {
                                        dataInbound[index].document = event.target.files[0];
                                        for (let i = 0; i < dataInbound.length; i++) {
                                            if (i === index) {
                                                obj['document'] = event.target.files[0];
                                                arr.push(obj);
                                                handleInputChange(event, index);
                                            } else {
                                                arr.push(dataInbound[i]);
                                            }
                                        }
                                        //console.log('arr', arr);
                                        //console.log('arr inbound', dataInbound);
                                        //console.log('file', dataInbound[index]);
                                        setdataInbound(arr);
                                    }}
                                />
                            </Button>
                        </Stack>
                    );
                }
            }
        },
        {
            name: 'tapfile',
            label: 'Tap File',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataInbound[index].sno;
                    obj['service'] = dataInbound[index].service;
                    obj['document'] = dataInbound[index].document;
                    obj['date'] = dataInbound[index].date;
                    return (
                        <input
                            type="text"
                            name="tapfile"
                            placeholder="Enter Tap File Name"
                            value={dataInbound[index].InboundTapFile}
                            onChange={(event) => {
                                //console.log(event.target.value);
                                dataInbound[index].InboundTapFile = event.target.value;
                                for (let i = 0; i < dataInbound.length; i++) {
                                    if (i === index) {
                                        obj['InboundTapFile'] = event.target.value;
                                        arr.push(obj);
                                    } else {
                                        arr.push(dataInbound[i]);
                                    }
                                }
                                setdataInbound(arr);
                            }}
                        />
                    );
                }
            }
        },
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataInbound[index].sno;
                    obj['service'] = dataInbound[index].service;
                    obj['document'] = dataInbound[index].document;
                    obj['InboundTapFile'] = dataInbound[index].InboundTapFile;
                    return (
                        <input
                            type="date"
                            value={dataInbound[index].date}
                            required
                            onChange={(event) => {
                                for (let i = 0; i < dataInbound.length; i++) {
                                    if (i === index) {
                                        obj['date'] = event.target.value;
                                        arr.push(obj);
                                    } else {
                                        arr.push(dataInbound[i]);
                                    }
                                }
                                setdataInbound(arr);
                            }}
                        />
                    );
                }
            }
        }
    ];
    const columns1 = [
        { name: 'sno', label: 'S No.', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'service',
            label: 'Service'
        },
        {
            name: 'Outbound',
            label: 'Outbound Documents',
            options: {
                // filter: false,
                // sort: false,
                // display: false,
                // viewColumns: false,
                customBodyRender: (valSue, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataOutbound[index].sno;
                    obj['service'] = dataOutbound[index].service;
                    obj['OutboundTapFile'] = dataOutbound[index].OutboundTapFile;
                    obj['date'] = dataOutbound[index].date;
                    return (
                        <>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ backgroundColor: buttonStyles[index], fontSize: '.9em' }}
                                >
                                    Upload Docs
                                    <input
                                        hidden
                                        accept="application/pdf"
                                        multiple
                                        required
                                        type="file"
                                        name="Outbound"
                                        id={`fileInput-${index}`}
                                        onChange={(event) => {
                                            dataOutbound[index].document = event.target.files[0];
                                            for (let i = 0; i < dataOutbound.length; i++) {
                                                if (i === index) {
                                                    obj['document'] = event.target.files[0];
                                                    arr.push(obj);
                                                    handleInputChange1(event, index);
                                                } else {
                                                    arr.push(dataOutbound[i]);
                                                }
                                            }
                                            //console.log('arr', arr);
                                            //console.log('arr dataOutbound', dataOutbound);
                                            //console.log('file', dataOutbound[index]);
                                            setdataOutbound(arr);
                                        }}
                                    />
                                </Button>
                            </Stack>
                        </>
                    );
                }
            }
        },
        {
            name: 'tapfile',
            label: 'Tap File',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataOutbound[index].sno;
                    obj['service'] = dataOutbound[index].service;
                    obj['document'] = dataOutbound[index].document;
                    obj['date'] = dataOutbound[index].date;
                    return (
                        <input
                            type="text"
                            name="tapfile"
                            placeholder="Enter Tap File Name"
                            value={dataOutbound[index].OutboundTapFile}
                            onChange={(event) => {
                                for (let i = 0; i < dataOutbound.length; i++) {
                                    if (i === index) {
                                        obj['OutboundTapFile'] = event.target.value;
                                        arr.push(obj);
                                    } else {
                                        arr.push(dataOutbound[i]);
                                    }
                                }
                                //console.log('arr', arr);
                                //console.log('arr inbound', dataOutbound);
                                //console.log('dataInbound', dataOutbound[index]);
                                setdataOutbound(arr);
                            }}
                        />
                    );
                }
            }
        },
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    let arr = [];
                    let obj = {};
                    obj['sno'] = dataOutbound[index].sno;
                    obj['service'] = dataOutbound[index].service;
                    obj['document'] = dataOutbound[index].document;
                    obj['OutboundTapFile'] = dataOutbound[index].OutboundTapFile;
                    return (
                        <input
                            type="date"
                            value={dataOutbound[index].date}
                            onChange={(event) => {
                                for (let i = 0; i < dataOutbound.length; i++) {
                                    if (i === index) {
                                        obj['date'] = event.target.value;
                                        arr.push(obj);
                                    } else {
                                        arr.push(dataOutbound[i]);
                                    }
                                }
                                setdataOutbound(arr);
                            }}
                        />
                    );
                }
            }
        }
    ];
    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        // count: 3,
        textLabels: {
            body: {
                noMatch: 'Please Select the Roaming Partner'
            }
        },
        filter: filterBtn,
        filterType: 'dropdown',
        responsive,
        // rowsPerPage: 2,
        tableBodyHeight,
        // tableBodyMaxHeight,
        onTableChange: (action, state) => {
            //////console.log(action);
            //////console.dir(state);
        }
    };
    const handleAlign = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const sendReminder = async (e) => {
        e.preventDefault();
        try {
            console.log('inside send reminder', partner);
            const url = 'http://localhost:8080/testing/sendTestingReminder';
            const obj = {};
            obj['pname'] = partner;
            obj['service'] = serviceSentOut;
            console.log('data', obj);
            await axios.post(url, obj).then((resp) => {
                console.log('Email Sent', resp);
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };

    const getFilteredData = (para) => {
        let obj = {};
        let arrInbound = [];
        let arrOutbound = [];
        let serviceIn = [];
        let serviceOut = [];
        data.map((item) => {
            if (item.tadig === para) {
                obj = item;
            }
        });
        if (obj['Inbound'].length > 0 && obj['Outbound'].length > 0) {
            for (let i = 0; i < obj['Inbound'][0].length; i++) {
                let objInbound = {};
                objInbound['sno'] = `${i + 1}`;
                objInbound['service'] = `${obj['Inbound'][0][i]}`;
                objInbound['document'] = '';
                objInbound['InboundTapFile'] = '';
                objInbound['date'] = '';
                serviceIn.push(obj['Inbound'][0][i]);
                arrInbound.push(objInbound);
            }
            for (let i = 0; i < obj['Outbound'][0].length; i++) {
                let objOutbound = {};
                objOutbound['sno'] = `${i + 1}`;
                objOutbound['service'] = `${obj['Outbound'][0][i]}`;
                objOutbound['document'] = '';
                objOutbound['OutboundTapFile'] = '';
                objOutbound['date'] = '';
                serviceOut.push(obj['Outbound'][0][i]);
                arrOutbound.push(objOutbound);
            }
            setService('Inbound & Outbound');
            setserviceSentIn(serviceIn);
            setdataInbound(arrInbound);
            setserviceSentOut(serviceOut);
            setdataOutbound(arrOutbound);
            setServiceLenIn(obj['Inbound'][0].length);
            setServiceLenOut(obj['Outbound'][0].length);
        } else if (obj['Inbound'].length > 0) {
            for (let i = 0; i < obj['Inbound'][0].length; i++) {
                let objInbound = {};
                objInbound['sno'] = `${i + 1}`;
                objInbound['service'] = `${obj['Inbound'][0][i]}`;
                objInbound['document'] = '';
                objInbound['InboundTapFile'] = '';
                objInbound['date'] = '';
                serviceIn.push(obj['Inbound'][0][i]);
                arrInbound.push(objInbound);
            }
            setService('Inbound');
            setserviceSentIn(serviceIn);
            setServiceLenIn(obj['Inbound'][0].length);
            setdataInbound(arrInbound);
        } else {
            for (let i = 0; i < obj['Outbound'][0].length; i++) {
                let objOutbound = {};
                objOutbound['sno'] = `${i + 1}`;
                objOutbound['service'] = `${obj['Outbound'][0][i]}`;
                objOutbound['document'] = '';
                objOutbound['OutboundTapFile'] = '';
                objOutbound['date'] = '';
                serviceOut.push(obj['Outbound'][0][i]);
                arrOutbound.push(objOutbound);
            }
            setService('Outbound');
            setserviceSentOut(serviceOut);
            setServiceLenOut(obj['Outbound'][0].length);
            setdataOutbound(arrOutbound);
        }
        //         let arrInbound = [];
        //         let arrOutbound = [];
        //         let service = [];
        //         setServiceLen(item.service.length);
        //         for (let i = 0; i < item.service.length; i++) {
        //             let objInbound = {};
        //             let objOutbound = {};
        //             objInbound['sno'] = `${i + 1}`;
        //             objInbound['service'] = `${item.service[i]}`;
        //             objOutbound['sno'] = `${i + 1}`;
        //             objOutbound['service'] = `${item.service[i]}`;
        //             service.push(item.service[i]);
        //             console.log('count inside', count);
        //             if (count == 2) {
        //                 objInbound['document'] = '';
        //                 objInbound['InboundTapFile'] = '';
        //                 objInbound['date'] = '';
        //                 objOutbound['document'] = '';
        //                 objOutbound['OutboundTapFile'] = '';
        //                 objOutbound['date'] = '';
        //                 console.log('count 2', count);
        //                 setService('Inbound & Outbound');
        //             } else if (item.direction === 'Inbound') {
        //                 objInbound['document'] = '';
        //                 objInbound['InboundTapFile'] = '';
        //                 objInbound['date'] = '';
        //                 setService('Inbound');
        //             } else {
        //                 objOutbound['document'] = '';
        //                 objOutbound['OutboundTapFile'] = '';
        //                 objOutbound['date'] = '';
        //                 setService('Outbound');
        //             }
        //             arrInbound.push(objInbound);
        //             arrOutbound.push(objOutbound);
        //         }
        //         //console.log(arrInbound, arrOutbound);
        //

        //     }
        // });
    };

    return (
        <>
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginBottom: '1rem', height: '7.5em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Roaming Partner</legend>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel style={{ marginTop: '1rem', marginLeft: '1.6rem' }} id="demo-simple-select-label">
                            Partner
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={partner}
                            label="Partner"
                            onChange={handleChange}
                            style={{ width: '9rem', marginLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }}
                        >
                            {data.map((item) => (
                                <MenuItem key={item.tadig} value={item.tadig}>
                                    {item.tadig}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </fieldset>
            {service === 'Inbound' ? (
                <>
                    <ToggleButtonGroup
                        color="primary"
                        value={'Inbound'}
                        exclusive
                        style={{ background: 'white', marginBottom: '.4rem', position: 'relative', left: 'calc(100% - 650px)' }}
                        // onChange={handleAlign}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Inbound" disabled>
                            Inbound
                        </ToggleButton>
                        <ToggleButton value="Outbound" disabled>
                            Outbound
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable title={'Inbound Details'} data={dataInbound} columns={columns} options={options} />
                        </ThemeProvider>
                    </CacheProvider>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ position: 'relative', left: 'calc(100% - 130px)', marginTop: '.7rem' }}
                        onClick={submitInbound}
                        disabled={partner == ''}
                    >
                        Submit Inbound
                    </Button>
                </>
            ) : service === 'Outbound' ? (
                <>
                    <ToggleButtonGroup
                        color="primary"
                        value={'Outbound'}
                        exclusive
                        style={{ background: 'white', marginBottom: '.4rem', position: 'relative', left: 'calc(100% - 650px)' }}
                        // onChange={handleAlign}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Inbound" disabled>
                            Inbound
                        </ToggleButton>
                        <ToggleButton value="Outbound" disabled>
                            Outbound
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable title={'Outbound Details'} data={dataOutbound} columns={columns1} options={options} />
                        </ThemeProvider>
                    </CacheProvider>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ position: 'relative', left: 'calc(100% - 140px)', marginTop: '.7rem' }}
                        onClick={submitOutbound}
                    >
                        Submit Outbound
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ position: 'relative', left: 'calc(100% - 430px)', marginTop: '.7rem' }}
                        onClick={sendReminder}
                    >
                        Send Reminder
                    </Button>
                </>
            ) : service === 'Inbound & Outbound' ? (
                <>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        style={{ background: 'white', marginBottom: '.4rem', position: 'relative', left: 'calc(100% - 650px)' }}
                        onChange={handleAlign}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Inbound" onClick={handleIn} disabled={inOpen}>
                            Inbound
                        </ToggleButton>
                        <ToggleButton value="Outbound" onClick={handleOut} disabled={outOpen}>
                            Outbound
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {alignment === 'Inbound' ? (
                        <>
                            <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable title={'Inbound Details'} data={dataInbound} columns={columns} options={options} />
                                </ThemeProvider>
                            </CacheProvider>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ position: 'relative', left: 'calc(100% - 130px)', marginTop: '.7rem' }}
                                onClick={submitInbound}
                            >
                                Submit Inbound
                            </Button>
                        </>
                    ) : alignment === 'Outbound' ? (
                        <>
                            <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable title={'Outbound Details'} data={dataOutbound} columns={columns1} options={options} />
                                </ThemeProvider>
                            </CacheProvider>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ position: 'relative', left: 'calc(100% - 140px)', marginTop: '.7rem' }}
                                onClick={submitOutbound}
                            >
                                Submit Outbound
                            </Button>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ position: 'relative', left: 'calc(100% - 430px)', marginTop: '.7rem' }}
                                onClick={sendReminder}
                            >
                                Send Reminder
                            </Button>
                        </>
                    ) : (
                        ''
                    )}
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{'Alert'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Kindly Upload All the documents along with Test completion date.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={handleClose}>Disagree</Button> */}
                            <Button onClick={handleClose}>Okay</Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                ''
            )}
        </>
    );
}

export default Testing;
