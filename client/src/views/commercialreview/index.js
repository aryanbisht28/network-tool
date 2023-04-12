import React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddSPOCTable from './AddSPOCTable';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MuiPhoneNumber from 'material-ui-phone-number';
import { parsePhoneNumber, isValidPhoneNumber, getNumberType, validatePhoneNumberLength } from 'libphonenumber-js';
import parseMax from 'libphonenumber-js/max';

function Index() {
    const [data, setData] = useState([]);
    const [details, setDetails] = useState({ pname: '', tadig: '', AA12: '', AA13: '', AA14: '', IR21: '', spocDetail: [] });
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [open4, setOpen4] = React.useState(false);
    const handleClose4 = () => {
        setOpen4(false);
    };
    const handleActive = () => {
        setActive1(!active1);
    };
    const handleActive1 = () => {
        setActive2(!active2);
    };
    const handleActive2 = () => {
        setActive3(!active3);
    };
    const handleActive3 = () => {
        setActive4(!active4);
    };

    useEffect(() => {
        const isValid = validateEmail(email);
        setEmailValid(isValid);
    }, [email]);

    function validateEmail(email) {
        // A simple email validation function, you can replace it with your own validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function handleFile(event) {
        setDetails({ ...details, [event.target.name]: event.target.files[0] });
    }

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };
    console.log(details);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailValid) {
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const contact = formData.get('contact');
            const mail = formData.get('mail');
            const address = formData.get('address');

            const newData = {
                name,
                contact,
                mail,
                address
                // pname,
                // tadig
            };

            setData([...data, newData]);
            // console.log(newData)
        } else {
            alert('Please enter a valid email address');
        }
    };
    console.log(data, details);
    const [state, setState] = useState('');
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleSubmitData = async (e) => {
        e.preventDefault();
        setOpen(true);
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('fileName', file.name);
        try {
            const url = 'http://localhost:8080/addCr';
            details['spocDetail'] = data;
            const formdata = new FormData();
            formdata.append('AA12', details.AA12);
            formdata.append('AA13', details.AA13);
            formdata.append('AA14', details.AA14);
            formdata.append('IR21', details.IR21);
            formdata.append('pname', details.pname);
            formdata.append('tadig', details.tadig);
            formdata.append('spocDetail', JSON.stringify(data));
            // await axios.post(url, formdata).then((resp) => {
            //     if (resp.data === 'posted') {
            //         setOpen(false);
            //         window.location.href = '/pages/CommercialReview/ViewReview';
            //     }
            // });
            setOpen(false);

            console.log(formdata);
            // window.location.href = '/pages/CommercialReview/Dashboard';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
        // e.preventDefault();
        // axios.post('http://localhost:8080/addCr',details)
        // console.log(details)
        setOpen4(true);
    };
    console.log('A', parseMax('+911234567890'));
    return (
        <div>
            {/* <form onSubmit={handleSubmitData}> */}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <fieldset style={{ background: '#ffff', borderRadius: '10px' }}>
                            <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Details</legend>
                            <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Partner Name"
                                        name="pname"
                                        alignItems="center"
                                        onChange={handleDetails}
                                        value={details.pname}
                                        style={{ width: 'calc(100% - 144px)' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        onChange={handleDetails}
                                        value={details.tadig}
                                        required
                                        name="tadig"
                                        id="outlined-required"
                                        label="TADIG ID"
                                        style={{ width: 'calc(100% - 144px)' }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={gridSpacing} style={{ margin: '1rem', alignItems: 'center' }}>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            id="button"
                                            style={{ width: 'calc(100% - 144px)', backgroundColor: active1 ? '#757ce8' : '#42a5f5' }}
                                            onChange={handleActive}
                                        >
                                            Upload AA12
                                            <input hidden accept="application/pdf" type="file" name="AA12" onChange={handleFile} />
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            style={{ width: 'calc(100% - 144px)', backgroundColor: active2 ? '#757ce8' : '#42a5f5' }}
                                            onChange={handleActive1}
                                        >
                                            Upload AA13
                                            <input hidden accept="application/pdf" multiple type="file" name="AA13" onChange={handleFile} />
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            style={{ width: 'calc(100% - 144px)', backgroundColor: active3 ? '#757ce8' : '#42a5f5' }}
                                            onChange={handleActive2}
                                        >
                                            Upload AA14
                                            <input hidden accept="application/pdf" multiple type="file" name="AA14" onChange={handleFile} />
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            style={{ width: 'calc(100% - 144px)', backgroundColor: active4 ? '#757ce8' : '#42a5f5' }}
                                            onChange={handleActive3}
                                        >
                                            Upload IR 21
                                            <input hidden accept="application/pdf" multiple type="file" name="IR21" onChange={handleFile} />
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </fieldset>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <fieldset style={{ background: '#ffff', borderRadius: '10px' }}>
                            <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Status</legend>
                            <Grid
                                container
                                spacing={gridSpacing}
                                style={{ marginTop: '2rem', marginBottom: '2rem', marginRight: '1rem', marginLeft: '1rem' }}
                            >
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['pname'] !== '' && details['pname'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Partner Name"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['tadig'] !== '' && details['tadig'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="TADIG ID"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['AA12'] !== '' || details['AA12'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="AA 12"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['AA13'] !== '' || details['AA13'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="AA 13"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['AA14'] !== '' || details['AA14'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="AA 14"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details['IR21'] !== '' || details['IR21'].length != 0}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="IR 21"
                                    />
                                </Grid>
                            </Grid>
                        </fieldset>
                    </Grid>
                </Grid>
            </Grid>
            {/* <h3 style={{ position: 'relative', top: '4.5vh', left: '3vw', fontSize: '1.35em' }}>Add SPOC Details</h3> */}
            {/* <AddSPOCTable /> */}
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Add SPOC Details</legend>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                            <Grid item xs={2.4}>
                                <TextField variant="standard" required id="standard-basic" name="name" label="SPOC Name" />
                            </Grid>
                            <Grid item xs={2.4}>
                                <MuiPhoneNumber
                                    required
                                    style={{ marginTop: '1.15em' }}
                                    name="contact"
                                    defaultCountry={'in'}
                                    onChange={(c, t) => {
                                        console.log(c, t, isValidPhoneNumber(c));
                                        return true;
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField
                                    required
                                    variant="standard"
                                    id="standard-basic"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="mail"
                                    label="SPOC Mail"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField required variant="standard" id="standard-basic" name="address" label="SPOC Address" />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Button type="submit" variant="contained">
                                    Add Data
                                </Button>
                            </Grid>
                        </Grid>
                        {/* </Card> */}
                    </form>
                </Grid>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        {/* <caption>A basic table example with a caption</caption> */}
                        <TableHead>
                            <TableRow>
                                <TableCell>SPOC Name</TableCell>
                                <TableCell>SPOC Contact</TableCell>
                                <TableCell>SPOC Mail</TableCell>
                                <TableCell align="right">SPOC Address</TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.contact}</TableCell>
                                    <TableCell>{row.mail}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </fieldset>
            <Button
                variant="contained"
                component="label"
                disabled={details.pname == '' || details.tadig == '' || data.length == 0}
                style={{ position: 'relative', left: 'calc(100% - 80px)', marginTop: '0.7rem' }}
                onClick={handleSubmitData}
            >
                Submit
            </Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open4} onClick={handleClose4}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* </form> */}
        </div>
    );
}

export default Index;
