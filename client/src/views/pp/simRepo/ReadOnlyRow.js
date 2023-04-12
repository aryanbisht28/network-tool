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

function ReadOnlyRow({ row, handleEventClick, handleDelete }) {
    return (
        <TableRow key={row.TADIG}>
            <TableCell
                component="th"
                scope="row"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(0);
                // }}
            >
                {row.TADIG}
            </TableCell>
            <TableCell
            // onClick={() => {
            //     setRowIndex(index);
            //     setColumnIndex(1);
            // }}
            >
                {row.MCC}
            </TableCell>
            <TableCell
            // onClick={() => {
            //     setRowIndex(index);
            //     setColumnIndex(2);
            // }}
            >
                {row.IMSI}
            </TableCell>
            <TableCell
                align="center"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(3);
                // }}
            >
                {row.ICCID}
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
                {row.ValidUntil}
            </TableCell>
            <TableCell
                align="center"
                // onClick={() => {
                //     setRowIndex(index);
                //     setColumnIndex(8);
                // }}
            >
                {row.Status}
            </TableCell>
            <TableCell
                // onClick={() => {
                //     setRowIndex(index);
                // }}
                align="center"
            >
                <Button variant="contained" onClick={(e) => handleEventClick(e, row)}>
                    Edit
                </Button>
                <Button variant="contained" onClick={() => handleDelete(row.id)}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default ReadOnlyRow;
