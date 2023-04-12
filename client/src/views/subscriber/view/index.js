import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

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
    const [email, setEmail] = React.useState(false);
    const handleEmail = () => setEmail(true);
    const handleEmailClose = () => setEmail(false);
    const [details, setDetails] = useState({ to: '', cc: '' });
    const [partner, setPartner] = useState('');

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const handleChange = (e) => {
        setPartner(e.target.value);
    };

    const sendDetailedMail = async (e) => {
        e.preventDefault();
        try {
            const emailArray = details.to.split(',');
            const ccEmail = details.cc.split(',');
            const url = 'http://localhost:8080/subs/sendInfoMAil';
            let sendData = '';
            data.map((item) => {
                if (`${item.pname}(${item.direction}${item.unilateral})` === partner) {
                    sendData = item;
                }
            });
            sendData['to'] = emailArray;
            sendData['cc'] = ccEmail;
            console.log('sendData', sendData);
            console.log('data', sendData);
            await axios.post(url, sendData).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/SubscriberProvisioning/view';
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

    React.useEffect(() => {
        const url = 'http://localhost:8080/subs';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    const columns = [
        { label: 'Roaming Partner', name: 'pname', options: { filterOptions: { fullWidth: true } } },
        { label: 'Service', name: 'service', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'direction',
            label: 'Direction'
        },
        {
            name: 'unilateral',
            label: 'Unilateral',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value === '' ? 'N/A' : value;
                }
            }
        },
        {
            name: 'date',
            label: 'Date'
        },
        {
            name: 'IR21',
            label: 'IR21',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '1em' }}
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
            name: 'CLL',
            label: 'CLL',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '1em' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        }
    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        selectableRows: false,
        textLabels: {
            body: {
                noMatch: 'Fetching Details...'
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
    return (
        <>
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
                                        <MenuItem
                                            key={`${item.pname}(${item.direction} ${item.unilateral})`}
                                            value={`${item.pname}(${item.direction} ${item.unilateral})`}
                                        >
                                            {`${item.pname}(${item.direction} ${item.unilateral})`}
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
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable title={'View'} data={data} columns={columns} options={options} />
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
        </>
    );
}

export default Index;
