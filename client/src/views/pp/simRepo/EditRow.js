import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TablePagination } from '@material-ui/core';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { ClickAwayListener } from '@mui/material';
import parseMax from 'libphonenumber-js/max';
import { CSVLink } from 'react-csv';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../simRepo/index.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import validator from 'validator';

function EditRow({ editFormData, handleEditFormChange }) {
    return (
        <TableRow>
            <TableCell
                component="th"
                scope="row"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(0);
                // }}
            >
                <input
                    // value={editFormData.TADIG}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="tadig"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell
            // onClick={() => {
            //     setRowIndex(index);
            //     setColumnIndex(1);
            // }}
            >
                <input
                    // value={editFormData.mcc}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="mcc"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell
            // onClick={() => {
            //     setRowIndex(index);
            //     setColumnIndex(2);
            // }}
            >
                <input
                    // value={editFormData.imsi}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="imsi"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell
                align="center"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(3);
                // }}
            >
                <input
                    // value={editFormData.iccid}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="iccid"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            {/* <TableCell
align="center"
onClick={() => {
    setRowIndex(index);
    setColumnIndex(4);
}}
>
{rowIndex === index && columnIndex === 4 ? (
    <TextField
        defaultValue={data[index]['MSISDN']}
        onChange={(e) => {
            handleTextChange(index, 'MSISDN', e.target.value);
        }}
    />
) : (
    row.MSISDN
)}
</TableCell> */}
            <TableCell
                align="center"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(6);
                // }}
            >
                <input
                    // value={editFormData.valid}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="valid"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell
                align="center"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(8);
                // }}
            >
                <input
                    // value={editFormData.status}
                    type="text"
                    required="required"
                    placeholder="enter value"
                    name="status"
                    onChange={handleEditFormChange}
                ></input>
            </TableCell>
            <TableCell>
                <Button type="submit" variant="contained">
                    Save
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default EditRow;
