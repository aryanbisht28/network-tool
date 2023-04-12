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
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SimRepo from './ModifySimRepo';

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

const names = ['GPRS', 'GSM', '2G', '3G', '4G', 'LTE', '5G'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

function Details({ row, simID }) {
    console.log('row', row);
    const [rp, setRP] = useState(row.roamPartner);
    const [spoc, setSpoc] = useState([]);
    const [direction, setDirection] = useState(row.direction);
    // const [uni, setUni] = useState(row.direction);
    const [dis, setDis] = useState(true);
    const [dis1, setDis1] = useState(true);
    const [dis2, setDis2] = useState(() => (row.unilateral === '' ? true : false));
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const theme = useTheme();
    const [personName, setPersonName] = useState(row.service);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [data, setData] = useState([]);

    {
        /* Roaming Patner */
    }
    const handleChange = (event) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].tadig === event.target.value) {
                setSpoc(data[i].spocDetail);
            }
        }
        setRP(event.target.value);
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
        setPersonName(typeof value === 'string' ? value.split(',') : value);
    };

    {
        /* Direction */
    }
    const handleChange2 = (event) => {
        setDirection(event.target.value);
        // console.log('dir', event.target.value);
        if (event.target.value === 'Unilateral') {
            setDis2(false);
        } else {
            setDis2(true);
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
            {/* <fieldset style={{ background: '#ffff', borderRadius: '10px' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Details</legend> */}
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                    <TextField
                        required
                        disabled
                        name="Roaming Partner"
                        id="outlined-required"
                        label="Roaming Partner"
                        value={row.roamPartner}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        required
                        labelId="demo-simple-select-label"
                        id="unila"
                        value={direction}
                        label="Direction"
                        // onChange={handleChange3}
                        disabled
                        fullWidth
                    />
                    {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Direction</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="unila"
                            value={direction}
                            // label="Direction"
                            // onChange={handleChange3}
                            disabled
                        >
                            <MenuItem value={'Inbound'}>Inbound</MenuItem>
                            <MenuItem value={'Outbound'}>Outbound</MenuItem>
                        </Select>
                    </FormControl> */}
                </Grid>
                {/* Services menu */}
                <Grid item xs={12} md={6}>
                    {/* <TextField
                        fullWidth
                        required
                        labelId="demo-simple-select-label"
                        id="unila"
                        // value={personName}
                        label="Services"
                        // onChange={handleChange3}
                        disabled
                        value={personName.map((value) => (
                            <Chip label={value} style={{ fontSize: '0.8em' }} />
                        ))}
                    /> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            // defaultValue={row.service}
                            disabled
                            value={personName}
                            onChange={handleChange1}
                            input={<OutlinedInput id="select-multiple-chip" label="Services" />}
                            renderValue={(personName) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        // flexWrap: 'wrap',
                                        gap: 0.5,
                                        height: '2vh'
                                        // overflow: 'hidden'
                                        // overflowY: 'scroll'
                                    }}
                                    className="box"
                                >
                                    {personName.map((value) => (
                                        // <span>{value},</span>
                                        <Chip key={value} label={value} style={{ fontSize: '0.8em' }} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
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
                {/* <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Direction</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="direc"
                            value={direction}
                            label="Direction"
                            // onSelect={disable}
                            onChange={handleChange2}
                            // disabled={dis}
                        >
                            <MenuItem value={'Bi-Lateral'}>Bi-Lateral</MenuItem>
                            <MenuItem value={'Unilateral'}>Unilateral</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
                {/* Unilateral menu */}
            </Grid>
            {/* </fieldset> */}
            {/* Pop-up for Bilateral*/}
            <SimRepo row={row} service={personName} direction={direction} simID={simID} />
        </div>
    );
}

export default Details;
