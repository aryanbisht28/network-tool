import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SimRepo from './SimRepo';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const names = ['GSM', 'GPRS', '3G', 'LTE', 'VOLTE', '5G'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

function Index() {
    const [rp, setRP] = useState('');
    const [spoc, setSpoc] = useState([]);
    const [direction, setDirection] = useState('Bi-Lateral');
    const [uni, setUni] = useState('');
    const [dis, setDis] = useState(true);
    const [dis1, setDis1] = useState(true);
    const [dis2, setDis2] = useState(true);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [data, setData] = useState([]);
    // console.log('service', personName);

    React.useEffect(() => {
        const url = 'http://localhost:8080/addCr';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    {
        /* Roaming Patner */
    }
    const handleChange = (event) => {
        // console.log(event.target.value);
        for (let i = 0; i < data.length; i++) {
            if (data[i].tadig === event.target.value) {
                setSpoc(data[i].spocDetail);
            }
        }
        setRP(event.target.value);
        // console.log(rp);
        if (rp != null) {
            setDis(false);
        }
    };

    {
        /* Service */
    }

    const handleChange1 = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );

        if (personName === ' ') {
            setDis2(true);
        } else {
            setDis2(false);
        }
    };

    {
        /* Direction */
    }
    const handleChange2 = (event) => {
        setDirection(event.target.value);
        console.log(direction);
        if (direction === 'Unilateral') {
            setDis1(true);
        } else {
            setDis1(false);
            setUni('');
        }
    };

    {
        /* Unilateral*/
    }

    const handleChange3 = (event) => {
        setUni(event.target.value);
    };

    return (
        <div>
            <fieldset style={{ background: '#ffff', borderRadius: '10px' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Details</legend>
                <Grid container spacing={gridSpacing} style={{ marginLeft: '2em' }}>
                    {/* Roaming Patner menu */}
                    <Grid item xs={12} md={5}>
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
                                    <MenuItem value={item.tadig}>{item.tadig}</MenuItem>
                                ))}
                                {/* <MenuItem value={data[]}>AAM21</MenuItem> */}
                                {/* <MenuItem value={'AAM21'}>AAM21</MenuItem>
                                <MenuItem value={'AFGAR'}>AFGAR</MenuItem>
                                <MenuItem value={'AFGEA'}>AFGEA</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Services menu */}
                    <Grid item xs={12} md={5} style={{ marginLeft: '2rem' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
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
                                disabled={dis}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Direction menu */}
                    <Grid item xs={12} md={5}>
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
                    {/* Unilateral menu */}
                    <Grid item xs={12} md={5} style={{ marginLeft: '2rem' }}>
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
                </Grid>
            </fieldset>
            {/* Pop-up for Bilateral*/}
            <SimRepo roam={rp} service={personName} direction={direction} unilateral={uni} spoc={spoc} />
        </div>
    );
}

export default Index;
