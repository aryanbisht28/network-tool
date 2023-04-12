import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const names = ['GPRS', 'GSM', '2G', '3G', '4G', 'LTE', '5G'];

function getStyles(name, services, theme) {
    return {
        fontWeight: services.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

function Index() {
    const [rp, setRP] = useState('');
    const [otherRP, setOtherRP] = useState('');
    const [details, setDetails] = useState({});
    const [data, setData] = useState([]);
    const [direction, setDirection] = useState('Bi-Lateral');
    const [uni, setUni] = useState('');
    const [dis, setDis] = useState(true);
    const [dis1, setDis1] = useState(true);
    const [dis2, setDis2] = useState(true);
    const [dis3, setDis3] = useState(true);
    const theme = useTheme();
    const [services, setService] = useState([]);
    const [date, setDate] = useState();
    const ref = useRef();
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const handleActive = () => {
        setActive1(!active1);
    };
    const handleActive1 = () => {
        setActive2(!active2);
    };

    React.useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    function handleFile(event) {
        setDetails({ ...details, [event.target.name]: event.target.files[0] });
    }
    const handleChange = (event) => {
        if (event.target.value === 'Other') {
            setDis(false);
            setDis3(false);
            setDis1(true);
            setService([]);
            setDis2(true);
            setDirection('');
            setUni('');
        } else {
            setDis(true);
            setDis3(false);
            let obj = data.find((o, i) => {
                if (o.roamPartner === event.target.value) {
                    setService(o.service);
                    setDis2(false);
                    setDirection(o.direction);
                    setUni(o.unilateral);
                    if (o.direction === 'Unilateral') setDis1(false);
                }
            });
        }
        setRP(event.target.value);
        console.log(event.target.value);
    };
    const otherRPChange = (event) => {
        console.log(event.target.value);
        setOtherRP(event.target.value);
    };

    {
        /* Service */
    }

    const handleChange1 = (event) => {
        const {
            target: { value }
        } = event;
        setService(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        if (services != null) {
            setDis2(false);
        } else {
            setDis2(true);
        }
    };

    {
        /* Direction */
    }
    const handleChange2 = (event) => {
        setDirection(event.target.value);
        console.log(event.target.value);
        if (event.target.value === 'Unilateral') {
            setDis1(false);
        } else {
            setDis1(true);
            setUni('');
        }
    };

    {
        /* Unilateral*/
    }

    const handleChange3 = (event) => {
        setUni(event.target.value);
    };

    const submitDetails = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('fileName', file.name);
        try {
            const url = 'http://localhost:8080/subs';
            const formdata = new FormData();
            if (rp === 'Other' && otherRP !== '') {
                formdata.append('pname', otherRP);
            } else {
                formdata.append('pname', rp);
            }
            formdata.append('service', services);
            formdata.append('direction', direction);
            formdata.append('unilateral', uni);
            formdata.append('date', date);
            formdata.append('IR21', details.IR21);
            formdata.append('CLL', details.CLL);
            console.log(details.IR21, details.CLL, services, rp, direction, uni, date);
            await axios.post(url, formdata).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/SubscriberProvisioning/first';
                }
            });
            console.log(formdata);
            window.location.href = '/pages/SubscriberProvisioning/first';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <>
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Launch</legend>
                <Grid container spacing={gridSpacing} style={{ margin: '1.5em' }}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Roaming Partner</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rp}
                                        label="Roaming Partner"
                                        onChange={handleChange}
                                    >
                                        {data.map((item) => (
                                            <MenuItem key={item.roamPartner} value={item.roamPartner}>
                                                {item.roamPartner}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Enter Other Roaming Partner"
                                    fullWidth
                                    disabled={dis}
                                    value={otherRP}
                                    onChange={otherRPChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={services}
                                        onChange={handleChange1}
                                        input={<OutlinedInput id="select-multiple-chip" label="Services" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        disabled={dis3}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name} style={getStyles(name, services, theme)}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Direction</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="direc"
                                        value={direction}
                                        label="Direction"
                                        // onSelect={disable}
                                        onChange={handleChange2}
                                        disabled={dis2}
                                    >
                                        <MenuItem value={'Bi-Lateral'}>Bi-Lateral</MenuItem>
                                        <MenuItem value={'Unilateral'}>Unilateral</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Unilateral</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="unila"
                                        value={uni}
                                        label="Unilateral"
                                        onChange={handleChange3}
                                        disabled={dis1}
                                    >
                                        <MenuItem value={'Inbound'}>Inbound</MenuItem>
                                        <MenuItem value={'Outbound'}>Outbound</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} style={{ margin: '1em' }}>
                                <FormControl fullWidth>
                                    <input
                                        // type="date"
                                        // type="date"
                                        type="text"
                                        onFocus={(e) => (e.target.type = 'date')}
                                        onBlur={(e) => (e.target.type = 'text')}
                                        placeholder="Launch Date"
                                        value={date}
                                        style={{
                                            width: 'calc(100% - -2px)',
                                            height: '7.5vh',
                                            borderRadius: '13px',
                                            fontSize: '1em',
                                            textAlign: 'left',
                                            borderStyle: 'solid',
                                            borderColor: '#d0d1d2',
                                            borderWidth: '1.5px',
                                            backgroundColor: '#f8fafc',
                                            color: '#9da3a9'
                                            // fontWeight: '650'
                                        }}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            setDate(event.target.value);
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid
                                item
                                xs={5}
                                style={{ margin: '1em', display: 'flex', width: '100%', justifyContent: 'center', alignItem: 'center' }}
                            >
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{
                                        width: '14vw',
                                        height: '6vh',
                                        // position: 'relative',
                                        backgroundColor: active1 ? '#757ce8' : '#42a5f5'
                                    }}
                                    onChange={handleActive}
                                >
                                    Upload IR21
                                    <input hidden accept="application/pdf" multiple type="file" name="IR21" onChange={handleFile} />
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                style={{ margin: '1em', display: 'flex', width: '100%', justifyContent: 'center', alignItem: 'center' }}
                            >
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{
                                        width: '14vw',
                                        height: '6vh',
                                        // position: 'relative',
                                        // left: 'calc(100% - 250px)'
                                        backgroundColor: active2 ? '#757ce8' : '#42a5f5'
                                    }}
                                    onChange={handleActive1}
                                >
                                    Upload CLL
                                    <input hidden accept="application/pdf" multiple type="file" name="CLL" onChange={handleFile} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </fieldset>
            <Button
                variant="contained"
                component="label"
                // disabled={details.pname == '' || details.tadig == '' || data.length == 0}
                style={{ position: 'relative', left: 'calc(100% - 80px)', marginTop: '0.7rem' }}
                onClick={submitDetails}
            >
                Submit
            </Button>
        </>
    );
}

export default Index;
