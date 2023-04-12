//import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddSPOCTable() {
    const [data, setData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
        // console.log(newData)
    };
    console.log(data);

    return (
        <>
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1.3em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Add SPOC Details</legend>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={gridSpacing} style={{ margin: '1rem' }}>
                            <Grid item xs={2.4}>
                                <TextField required id="outlined-required" name="name" label="SPOC Name" />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField required id="outlined-required" name="contact" label="SPOC Contact" />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField required id="outlined-required" type="email" name="mail" label="SPOC Mail" />
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField required id="outlined-required" name="address" label="SPOC Address" />
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
        </>
    );
}
