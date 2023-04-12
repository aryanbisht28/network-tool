import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import axios from 'axios';
import Chip from '@mui/material/Chip';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

function Index() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('400px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [data, setData] = useState([]);
    const [doc, setVal] = useState([]);

    const [email, setEmail] = React.useState(false);
    const handleEmail = () => setEmail(true);
    const handleEmailClose = () => setEmail(false);
    const [details, setDetails] = useState({ to: '', cc: '' });
    const [partner, setPartner] = useState('');

    React.useEffect(() => {
        const url = 'http://localhost:8080/testing/join';
        axios.get(url).then((response) => {
            console.log('Get req completed', response);
            setData(response.data);
        });
    }, []);

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const handleChange = (e) => {
        // console.log('partner', e.target.value);
        // setDetails({ ...details, ['partner']: e.target.value });
        setPartner(e.target.value);
    };

    const sendDetailedMail = async (e) => {
        e.preventDefault();
        try {
            const emailArray = details.to.split(',');
            const ccEmail = details.cc.split(',');
            const url = 'http://localhost:8080/ppini/sendInfo';
            let sendData = '';
            data.map((item) => {
                if (`${item.tadig}(${item.direction})` === partner) {
                    sendData = item;
                }
            });
            sendData['to'] = emailArray;
            sendData['cc'] = ccEmail;
            console.log('sendData', sendData);
            console.log('data', sendData);
            await axios.post(url, sendData).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/PatnerProvisioning/view-intialization';
                }
            });
            console.log(formdata);
            // window.location.href = '/pages/CommercialReview/Dashboard';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
        setEmail(false);
    };

    const columns = [
        { label: 'Roaming Partner', name: 'pname', options: { filterOptions: { fullWidth: true } } },
        { label: 'TADIG', name: 'tadig' },
        { label: 'Direction', name: 'direction' },
        {
            label: 'Test Documents',
            name: 'service',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    // console.log('value', value, tableMeta['rowIndex']);
                    let index = tableMeta['rowIndex'];
                    // console.log('data', data[index]['document']);
                    // let doc = value;
                    // setVal(doc);
                    return value.map((v, i) => (
                        <>
                            <Button
                                variant="text"
                                component="label"
                                style={{ fontSize: '0.9em' }}
                                onClick={() => {
                                    window.open('http://localhost:8080/uploads/docs/' + data[index]['document'][i], '_blank');
                                }}
                            >
                                <Chip color="primary" key={v} label={v} />
                            </Button>
                            <span> </span>
                        </>
                    ));
                }
            }
        },
        // {
        //     label: 'Document',
        //     name: 'document',
        //     options: {
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return value.map((v, i) => (
        //                 <>
        //                     <Button
        //                         variant="text"
        //                         component="label"
        //                         style={{ fontSize: '0.9em' }}
        //                         onClick={() => {
        //                             window.open('http://localhost:8080/uploads/docs/' + v, '_blank');
        //                         }}
        //                     >
        //                         View
        //                     </Button>
        //                     {/* <Chip color="primary" key={v} label={v} /> */}
        //                     <span> </span>
        //                 </>
        //             ));
        //         }
        //     }
        // },
        {
            label: 'TCC',
            name: 'tcc',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '0.9em' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        },
        {
            label: 'TCC Completion Date',
            name: 'tccDate',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    // console.log('date val', value);
                    // return {};
                    return value.split('T')[0];
                }
            }
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

    const muiTheme = () =>
        createTheme({
            components: {
                MUIDataTableBodyCell: {
                    styleOverrides: {
                        root: {
                            coloumHeight: '3vh'
                        }
                    }
                }
            }
        });

    return (
        <>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={muiTheme()}>
                    <MUIDataTable rowHeight={15} title={'View'} data={data} columns={columns} options={options} />
                </ThemeProvider>
            </CacheProvider>
            <Button
                variant="contained"
                component="label"
                id="button"
                style={{
                    position: 'absolute',
                    bottom: '76.8vh',
                    zIndex: '1',
                    right: '19vw'
                }}
                onClick={() => {
                    handleEmail();
                }}
            >
                Send Mail
            </Button>

            <Modal open={email} onClose={handleEmailClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <CloseIcon style={{ position: 'relative', left: '44vw', top: '-1vh' }} onClick={handleEmailClose} />
                    <fieldset>
                        <legend style={{ fontSize: '1.5em', fontWeight: '500' }}>Send Email</legend>
                        <div style={{ margin: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.5em', fontSize: '1em' }}>To: </span>
                            <TextField
                                onChange={handleDetails}
                                value={details.to}
                                required
                                id="outlined-basic"
                                name="to"
                                label="enter the email"
                                variant="outlined"
                                fullWidth
                            />
                            <br></br>
                        </div>
                        <div style={{ margin: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.5em', fontSize: '1em' }}>cc: </span>
                            <TextField
                                onChange={handleDetails}
                                value={details.cc}
                                name="cc"
                                id="outlined-basic"
                                label="enter the email"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div
                            style={{
                                margin: '1em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <span style={{ marginRight: '0.5em', fontSize: '1em' }}>Select the Roaming Partner: </span>
                            <FormControl fullWidth>
                                <InputLabel style={{ marginTop: '1rem', marginLeft: '1.6rem' }} id="demo-simple-select-label">
                                    Partner
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={partner}
                                    label="Partner"
                                    name="partner"
                                    onChange={handleChange}
                                    style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }}
                                >
                                    {data.map((item) => (
                                        <MenuItem key={`${item.tadig}(${item.direction})`} value={`${item.tadig}(${item.direction})`}>
                                            {`${item.tadig}(${item.direction})`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Button
                            variant="contained"
                            style={{ position: 'relative', left: 'calc(100% - 100px)', top: 'calc(100% - 503px)', zIndex: '1' }}
                            onClick={sendDetailedMail}
                        >
                            Send Mail
                        </Button>
                    </fieldset>
                </Box>
            </Modal>
        </>
    );
}

export default Index;
