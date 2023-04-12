import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

function Index() {
    const [firstName, setFirstName] = React.useState(localStorage.getItem('firstname'));
    const [lastName, setLastName] = React.useState(localStorage.getItem('lastname'));
    const [company, setCompany] = React.useState(localStorage.getItem('company'));
    const [phone, setPhone] = React.useState(localStorage.getItem('phone'));
    const [pass, setPass] = React.useState('');
    const [desig, setDesig] = React.useState(localStorage.getItem('desig'));
    const [gender, setGender] = React.useState(localStorage.getItem('gender'));

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handlePassword = (event) => {
        setPass(event.target.value);
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleCompany = (event) => {
        setCompany(event.target.value);
    };

    const handleDesig = (event) => {
        setDesig(event.target.value);
    };

    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const submitDetails = async (event) => {
        event.preventDefault();
        try {
            const url = 'http://localhost:8080/api/users';
            let data = {};
            data['firstName'] = firstName;
            data['lastName'] = lastName;
            data['email'] = localStorage.getItem('mail');
            data['password'] = pass;
            data['phone'] = phone;
            data['company'] = company;
            data['desig'] = desig;
            data['gender'] = gender;
            await axios.put(url, data).then((response) => {
                console.log('hi');

                if (response.data === 'updated') {
                    localStorage.setItem('firstname', firstName);
                    localStorage.setItem('lastname', lastName);
                    localStorage.setItem('mail', data['email']);
                    localStorage.setItem('phone', phone);
                    localStorage.setItem('company', company);
                    localStorage.setItem('desig', desig);
                    localStorage.setItem('gender', gender);
                    window.location.href = '/pages/account/user';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <Box>
            <Card>
                <Grid>
                    <Grid style={{ backgroundColor: '#F6FFFD' }}>
                        <Typography style={{ fontSize: '1.5em', fontWeight: '600', textAlign: 'left', padding: '1em' }}>
                            Edit Profile
                        </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', margin: '1em' }}>
                        <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 64, height: 64 }} />
                            <Button variant="text" style={{ fontSize: '0.8em' }}>
                                Change Profile
                            </Button>
                        </Grid>
                        <Grid
                            style={{
                                marginLeft: '1.5em',
                                // marginTop: '0.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                                // alignItems: 'center'
                            }}
                        >
                            <Typography style={{ fontSize: '1.3em', fontWeight: '500', textAlign: 'left' }}>Profile photo</Typography>
                            <Typography style={{ fontSize: '1em', fontWeight: '200', textAlign: 'left' }}>
                                This will be displayed on your profile.
                            </Typography>
                            {/* <Button variant="text" style={{ fontSize: '0.8em' }}>
                                Change Profile
                            </Button> */}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em' }}>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="First Name"
                                defaultValue={firstName}
                                fullWidth
                                onChange={handleFirstName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="Last Name"
                                defaultValue={lastName}
                                onChange={handleLastName}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em' }}>
                        <Grid item xs={6}>
                            <TextField id="standard-read-only-input" label="Email-Id" value={localStorage.getItem('mail')} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="Password"
                                type="password"
                                defaultValue="***********"
                                onChange={handlePassword}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em' }}>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="Phone Number"
                                defaultValue={phone}
                                onChange={handlePhone}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="Company"
                                defaultValue={company}
                                fullWidth
                                onChange={handleCompany}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em' }}>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="Designation"
                                defaultValue={desig}
                                onChange={handleDesig}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGender}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        style={{ position: 'relative', left: ' calc(100% - 120px)', margin: '1em' }}
                        onClick={submitDetails}
                    >
                        Submit
                    </Button>
                </Grid>
            </Card>
        </Box>
    );
}

export default Index;
