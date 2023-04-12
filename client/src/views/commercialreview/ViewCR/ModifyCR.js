import React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { ClickAwayListener } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { parsePhoneNumber, isValidPhoneNumber, getNumberType, validatePhoneNumberLength } from 'libphonenumber-js';
import parseMax from 'libphonenumber-js/max';

function Index({ row }) {
    const [data, setData] = useState(row['spocDetail']);
    const [details, setDetails] = useState({
        pname: row.pname,
        tadig: row.tadig,
        AA12: row.AA12,
        AA13: row.AA13,
        AA14: row.AA14,
        IR21: row.IR21,
        spocDetail: []
    });
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [rowIndex, setRowIndex] = useState(-1);
    const [columnIndex, setColumnIndex] = useState(-1);

    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);
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
            };

            setData([...data, newData]);
        } else {
            alert('Please enter a valid email address');
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/addCr/${row['_id']}`;
            details['spocDetail'] = data;
            const formdata = new FormData();
            formdata.append('AA12', details.AA12);
            formdata.append('AA13', details.AA13);
            formdata.append('AA14', details.AA14);
            formdata.append('IR21', details.IR21);
            formdata.append('pname', details.pname);
            formdata.append('tadig', details.tadig);
            formdata.append('spocDetail', JSON.stringify(data));
            // console.log('data', details, row, data, url, row['_id']);
            // console.log('form data', formdata);
            const response = await axios.put(url, formdata).then((resp) => {
                if (resp.data === 'updated') {
                    window.location.href = '/pages/CommercialReview/ViewReview';
                    <Alert severity="success">Values updated successfully!</Alert>;
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    const handleTextChange = function (number, name, value) {
        data[number][name] = value;
        console.log(value);
        console.log(data);
    };

    const handleExit = () => {
        setRowIndex(-1);
        setColumnIndex(-1);
    };

    const handleDelte = (index) => {
        alert(index);
    };

    const deleteRow = (index) => {
        const newData = data.filter((d) => d.index !== index);
        setData(newData);
        console.log(data);
        alert('clicked');
    };
    return (
        <Card style={{ background: '#ffff', boxShadow: '0px 3px 5px 5px #8888', height: '85vh' }}>
            <h2 style={{ marginLeft: '2em', marginTop: '1.5em' }}>Modify Details</h2>
            <Grid item xs={12} md={8}>
                <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                    <Grid item xs={4}>
                        <TextField
                            required
                            disabled
                            id="outlined-required"
                            label="Partner Name"
                            alignItems="center"
                            value={row.pname}
                            style={{ width: 'calc(100% - 144px)' }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            required
                            disabled
                            id="outlined-required"
                            label="TADIG ID"
                            placeholder="TADIG ID"
                            value={row.tadig}
                            style={{ width: 'calc(100% - 144px)' }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ width: 'calc(100% - 144px)', backgroundColor: active1 ? '#757ce8' : '#42a5f5' }}
                                onChange={handleActive}
                            >
                                Update AA12
                                <input hidden accept="application/pdf" type="file" name="AA12" onChange={handleFile} />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                    <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ width: 'calc(100% - 144px)', backgroundColor: active2 ? '#757ce8' : '#42a5f5' }}
                                onChange={handleActive1}
                            >
                                Update AA13
                                <input hidden accept="application/pdf" multiple type="file" name="AA13" onChange={handleFile} />
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ width: 'calc(100% - 144px)', backgroundColor: active3 ? '#757ce8' : '#42a5f5' }}
                                onChange={handleActive2}
                            >
                                Update AA14
                                <input hidden accept="application/pdf" multiple type="file" name="AA14" onChange={handleFile} />
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                component="label"
                                style={{ width: 'calc(100% - 144px)', backgroundColor: active4 ? '#757ce8' : '#42a5f5' }}
                                onChange={handleActive3}
                            >
                                Update IR 21
                                <input hidden accept="application/pdf" multiple type="file" name="IR21" onChange={handleFile} />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                        <Grid item xs={2.4}>
                            <TextField required variant="standard" id="standard-basic" name="name" label="SPOC Name" />
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
                </form>
            </Grid>
            <ClickAwayListener onClickAway={() => handleExit()}>
                <div
                    style={{
                        overflowY: 'scroll',
                        height: '150px',
                        display: 'block'
                    }}
                >
                    <TableContainer>
                        <Table aria-label="aria table" stickyHeader>
                            <TableHead style={{ position: 'sticky' }}>
                                <TableRow>
                                    <TableCell name="name">SPOC Name</TableCell>
                                    <TableCell name="contact">SPOC Contact</TableCell>
                                    <TableCell name="mail">SPOC Mail</TableCell>
                                    <TableCell name="address" align="center">
                                        SPOC Address
                                    </TableCell>
                                    <TableCell name="action" align="center">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            onClick={() => {
                                                setRowIndex(index);
                                                setColumnIndex(0);
                                            }}
                                        >
                                            {rowIndex === index && columnIndex === 0 ? (
                                                <TextField
                                                    defaultValue={data[index]['name']}
                                                    onChange={(e) => {
                                                        handleTextChange(index, 'name', e.target.value);
                                                    }}
                                                />
                                            ) : (
                                                row.name
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setRowIndex(index);
                                                setColumnIndex(1);
                                            }}
                                        >
                                            {rowIndex === index && columnIndex === 1 ? (
                                                <TextField
                                                    defaultValue={data[index]['contact']}
                                                    onChange={(e) => {
                                                        handleTextChange(index, 'contact', e.target.value);
                                                    }}
                                                />
                                            ) : (
                                                row.contact
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setRowIndex(index);
                                                setColumnIndex(2);
                                            }}
                                        >
                                            {rowIndex === index && columnIndex === 2 ? (
                                                <TextField
                                                    defaultValue={data[index]['mail']}
                                                    onChange={(e) => {
                                                        handleTextChange(index, 'mail', e.target.value);
                                                    }}
                                                />
                                            ) : (
                                                row.mail
                                            )}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            onClick={() => {
                                                setRowIndex(index);
                                                setColumnIndex(3);
                                            }}
                                        >
                                            {rowIndex === index && columnIndex === 3 ? (
                                                <TextField
                                                    defaultValue={data[index]['address']}
                                                    onChange={(e) => {
                                                        handleTextChange(index, 'address', e.target.value);
                                                    }}
                                                />
                                            ) : (
                                                row.address
                                            )}
                                        </TableCell>
                                        <TableCell
                                            // onClick={() => {
                                            //     setRowIndex(index);
                                            // }}
                                            align="center"
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    data.splice(index, 1);
                                                    setData([...data]);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </ClickAwayListener>
            {/* <SPOCTable spoc={row['spocDetail']} /> */}
            <Button
                variant="contained"
                component="label"
                style={{ position: 'relative', left: 'calc(100% - 100px)', marginTop: '1rem', marginBottom: '1rem' }}
                onClick={handleUpdate}
            >
                Update
            </Button>
        </Card>
    );
}

export default Index;
