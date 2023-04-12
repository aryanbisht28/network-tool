import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SPOCTable({ spoc }) {
    const [data, setData] = useState(spoc);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    useEffect(() => {
        const isValid = validateEmail(email);
        setEmailValid(isValid);
    }, [email]);

    function validateEmail(email) {
        // A simple email validation function, you can replace it with your own validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    return (
        <>
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
                            <TextField
                                required
                                id="outlined-required"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="mail"
                                label="SPOC Mail"
                            />
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
                </form>
            </Grid>
            <div
                style={{
                    overflowY: 'scroll',
                    height: '150px',
                    display: 'block'
                }}
            >
                <TableContainer>
                    <Table aria-label="aria table" stickyHeader>
                        {/* <caption>A basic table example with a caption</caption> */}
                        <TableHead style={{ position: 'sticky' }}>
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
                                    <TableCell component="th" scope="row" contentEditable>
                                        {row.name}
                                    </TableCell>
                                    <TableCell contentEditable>{row.contact}</TableCell>
                                    <TableCell contentEditable>{row.mail}</TableCell>
                                    <TableCell align="right" contentEditable>
                                        {row.address}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
