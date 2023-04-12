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
import ReadOnlyRow from './ReadOnlyRow';
import EditRow from './EditRow';
import { Fragment } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Index() {
    const [data, setData] = useState([]);
    const [rowIndex, setRowIndex] = useState(-1);
    const [columnIndex, setColumnIndex] = useState(-1);
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const [active1, setActive1] = useState(false);
    const [disable, setDisEnable] = useState(true);
    const [details, setDetails] = useState('');
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const [active2, setActive2] = useState(false);

    const handleActive = () => {
        setActive1(!active1);
    };

    React.useEffect(() => {
        const url = 'http://localhost:8080/simRepo';
        axios.get(url).then((response) => {
            console.log('Get req excel', response.data[0].id);
            setData(response.data);
            setOpen(false);
        });
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSubmit = (e) => {
        console.log('deets', details);
        details['CreationDate'] = date;
        e.preventDefault();
        // if (emailValid) {
        // const formData = new FormData(e.target);
        // const formData = new FormData();
        // const TADIG = formData.get('TADIG');
        // const MCC = formData.get('MCC');
        // const IMSI = formData.get('IMSI');
        // const ICCID = formData.get('ICCID');
        // const MSISDN = formData.get('MSISDN');
        // const CardFormat = formData.get('CardFormat');
        // const ValidUntil = formData.get('ValidUntil');
        // const CreationDate = formData.get('CreationDate');
        // const Status = formData.get('Status');
        // const newData = {
        //     TADIG,
        //     MCC,
        //     IMSI,
        //     ICCID,
        //     MSISDN,
        //     CardFormat,
        //     ValidUntil,
        //     CreationDate,
        //     Status
        // };

        setData([...data, details]);
        console.log('sdasd', details);
        setOpen1(false);
    };
    console.log(data);
    // console.log('sdasd', data);

    const handleTextChange = function (number, name, value) {
        data[number][name] = value;
        console.log(value);
        console.log(data);
    };

    const handleExit = () => {
        setRowIndex(-1);
        setColumnIndex(-1);
    };

    console.log('A', parseMax('+911234567890'));

    const headers = [
        { label: 'TADIG', key: 'TADIG' },
        { label: 'MCC/MNC', key: 'MCC' },
        { label: 'IMSI', key: 'IMSI' },
        { label: 'ICCID', key: 'ICCID' },
        { label: 'MSISDN', key: 'MSISDN' },
        { label: 'Card Format', key: 'CardFormat' },
        { label: 'Valid Until', key: 'ValidUntil' },
        { label: 'Creation Date', key: 'CreationDate' },
        { label: 'Status', key: 'Status' }
    ];

    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Sim_Repo.csv'
    };
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        setActive1(!active1);
    };
    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const csvFileToArray = async (string) => {
        const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
        const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

        const array = csvRows.map((i) => {
            const values = i.split(',');
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        console.log('arrat', array);
        try {
            const url = 'http://localhost:8080/simRepo';
            setOpen(true);
            await axios.post(url, array).then((resp) => {
                if (resp.data === 'posted') {
                    console.log(resp.data);
                    console.log('successful');
                    setOpen(false);
                    window.location.href = '/pages/CommercialReview/simRepo';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const handleOnDelte = async (e) => {
        e.preventDefault();
        console.log('data', data);
        try {
            const url = 'http://localhost:8080/simRepo/post';
            await axios.post(url, data).then((resp) => {
                if (resp.data === 'deleted') {
                    console.log(resp.data);
                    console.log('successful');
                    window.location.href = 'pages/CommercialReview/simRepo';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
        setOpen1(false);
        window.location.href = '/pages/CommercialReview/simRepo';
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
        setOpen1(false);
    };
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 926px)',
        // height: 'calc(100% - 130px)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 440px)',
        // height: 'calc(100% - 130px)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = useMemo(() => {
        if (!searchTerm) return data;
        const lowerCase = searchTerm.toLowerCase();
        if (data.length > 0) {
            const attributes = Object.keys(data[0]);

            const list = [];

            for (const current of data) {
                for (const attribute of attributes) {
                    if (attribute === 'key') {
                        // continue;
                        return data;
                    }
                    const value = current[attribute];
                    if (value && value.toLowerCase() === searchTerm.toLowerCase()) {
                        const found = data.find((row) => row.key === current.key);
                        if (found) {
                            list.push(found);
                        }
                    }
                }
            }
            return list;
        }

        return [];
    }, [searchTerm, data]);
    const [date, setDate] = useState();
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    // const [editData, setEditData] = useState(null);
    // const [editFormData, setEditFormData] = useState({
    //     TADIG: '',
    //     MCC: '',
    //     IMSI: '',
    //     ICCID: '',
    //     validUntil: '',
    //     Status: ''
    // });

    // const handleEditFormChange = (e) => {
    //     e.preventDefault();
    //     const fieldName = e.target.getAttribute('name');
    //     const fieldValue = e.target.value;
    //     const newFormData = { ...editFormData };
    //     newFormData[fieldName] = fieldValue;
    //     setEditFormData(newFormData);
    // };
    // const handleEventClick = (event, row) => {
    //     event.preventDefault();
    //     setEditData(row.id);
    //     const formValues = {
    //         TADIG: row.TADIG,
    //         MCC: row.MCC,
    //         IMSI: row.IMSI,
    //         ICCID: row.ICCID,
    //         validUntil: row.validUntil,
    //         Status: row.Status
    //     };
    //     setEditFormData(formValues);
    // };
    // const handleEditFormSubmit = (e) => {
    //     e.preventDefault();
    //     const editedData = {
    //         id: editData,
    //         TADIG: editFormData.TADIG,
    //         MCC: editFormData.MCC,
    //         IMSI: editFormData.IMSI,
    //         ICCID: editFormData.ICCID,
    //         validUntil: editFormData.validUntil,
    //         Status: editFormData.Status
    //     };
    //     const newData = [...data];
    //     const index = data.findIndex((data) => data.id === editData);
    //     newData[index] = editedData;
    //     setData(newData);
    //     setEditData(null);
    // };

    // const handleDelete = (editData) => {
    //     const newData = [...data];
    //     const index = contancts.findIndex((data) => data.id === editData);
    //     newData.splice(index, 1);
    //     setData(newData);
    // };

    return (
        <>
            <div>
                <Modal open={open1} onClose={handleClose1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <CloseIcon onClick={handleClose1} style={{ position: 'relative', left: '30vw', top: '-2vh' }} />
                        <fieldset style={{ background: '#ffff', borderRadius: '10px', height: '20vh' }}>
                            <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Import CSV</legend>
                            <form style={{ display: 'flex', marginTop: '0.7em', justifyContent: 'center', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.2em', fontWeight: '500', marginRight: '1em' }}>Choose file to import</p>
                                <div className="file" style={{ backgroundColor: active1 ? '#757ce8' : '#42a5f5' }}>
                                    Choose File
                                    <input
                                        type={'file'}
                                        id={'csvFileInput'}
                                        accept={'.csv'}
                                        onChange={handleOnChange}
                                        className="hide_file"
                                    />
                                </div>
                            </form>
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    handleOnSubmit(e);
                                }}
                                style={{
                                    fontSize: '0.7em',
                                    width: '9vw',
                                    position: 'relative',
                                    right: '-8vw',
                                    marginTop: '0.5em'
                                }}
                            >
                                Submit
                            </Button>
                        </fieldset>
                    </Box>
                </Modal>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1em', height: '70vh' }}>
                    <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Sim repository</legend>
                    <ClickAwayListener onClickAway={() => handleExit()}>
                        <div>
                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style1}>
                                    <CloseIcon onClick={handleClose2} style={{ position: 'relative', left: '62vw' }} />
                                    <fieldset
                                        style={{
                                            background: '#ffff',
                                            borderRadius: '10px',
                                            marginTop: '1em',
                                            height: 'calc(100% - 60px)'
                                        }}
                                    >
                                        <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Add New Data</legend>
                                        <Grid item xs={12} md={8} style={{ marginTop: '2vh' }}>
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            required
                                                            name="TADIG"
                                                            label="TADIG"
                                                            fullWidth
                                                            onChange={handleDetails}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            required
                                                            name="MCC"
                                                            label="MCC/MNC"
                                                            type="number"
                                                            pattern="[0-9]*"
                                                            inputmode="numeric"
                                                            fullWidth
                                                            onChange={handleDetails}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            required
                                                            name="IMSI"
                                                            label="IMSI"
                                                            type="number"
                                                            pattern="[0-9]*"
                                                            inputmode="numeric"
                                                            fullWidth
                                                            onChange={handleDetails}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            required
                                                            name="ICCID"
                                                            label="ICCID"
                                                            type="number"
                                                            pattern="[0-9]*"
                                                            inputmode="numeric"
                                                            fullWidth
                                                            onChange={handleDetails}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                                    <Grid item xs={6}>
                                                        <input
                                                            type="text"
                                                            name="ValidUntil"
                                                            onFocus={(e) => (e.target.type = 'date')}
                                                            onBlur={(e) => (e.target.type = 'text')}
                                                            placeholder="Valid until"
                                                            fullWidth
                                                            value={date}
                                                            style={{
                                                                width: '30vw',
                                                                height: '7.5vh',
                                                                borderRadius: '13px',
                                                                fontSize: '1em',
                                                                textAlign: 'left',
                                                                borderStyle: 'solid',
                                                                borderColor: '#d0d1d2',
                                                                borderWidth: '1.5px',
                                                                backgroundColor: '#f8fafc',
                                                                color: '#9da3a9'
                                                            }}
                                                            onChange={(event) => {
                                                                console.log(event.target.value);
                                                                setDate(event.target.value);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            id="outlined-basic"
                                                            variant="outlined"
                                                            required
                                                            name="Status"
                                                            label="Status"
                                                            fullWidth
                                                            onChange={handleDetails}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                {/* <AddIcon /> */}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{ position: 'relative', left: 'calc(100% - 90px)', marginTop: '2em' }}
                                                    // onClick={handleSubmit}
                                                    onClick={handleOnDelte}
                                                >
                                                    Submit
                                                </Button>
                                                {/* </Card> */}
                                            </form>
                                        </Grid>
                                    </fieldset>
                                </Box>
                            </Modal>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                alignItems="right"
                                style={{
                                    position: 'relative',
                                    left: 'calc(100% - 250px)'
                                }}
                            />
                            <Button
                                variant="contained"
                                style={{ position: 'relative', left: 'calc(100% - 730px)', marginTop: '0.5em' }}
                                onClick={handleOpen2}
                            >
                                Add
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleOpen1}
                                style={{
                                    fontSize: '0.9em',
                                    width: 'calc(100% - 945px)',
                                    marginTop: '0.5em',
                                    backgroundColor: active2 ? '#757ce8' : '#42a5f5',
                                    position: 'relative',
                                    left: 'calc(100% - 700px)'
                                }}
                                onChange={handleActive}
                            >
                                Import CSV
                            </Button>
                            {/* <form onSubmit={handleEditFormSubmit}> */}
                            <TableContainer style={{ width: '75vw', height: '55vh' }}>
                                <Table stickyHeader aria-label="caption table">
                                    {/* <caption>A basic table example with a caption</caption> */}
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>TADIG</TableCell>
                                            <TableCell>MCC/MNC</TableCell>
                                            <TableCell>IMSI</TableCell>
                                            <TableCell>ICCID</TableCell>
                                            {/* <TableCell>MSISDN</TableCell> */}
                                            <TableCell>Valid until</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell name="action" align="center">
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                            <TableRow key={row.TADIG}>
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
                                                            disabled={disable}
                                                            defaultValue={data[index]['TADIG']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'TADIG', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.TADIG
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
                                                            disabled={disable}
                                                            defaultValue={data[index]['MCC']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'MCC', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.MCC
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
                                                            disabled={disable}
                                                            defaultValue={data[index]['IMSI']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'IMSI', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.IMSI
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
                                                            disabled={disable}
                                                            defaultValue={data[index]['ICCID']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'ICCID', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.ICCID
                                                    )}
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
                                                    onClick={() => {
                                                        setRowIndex(index);
                                                        setColumnIndex(6);
                                                    }}
                                                >
                                                    {rowIndex === index && columnIndex === 6 ? (
                                                        <TextField
                                                            disabled={disable}
                                                            defaultValue={data[index]['ValidUntil']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'ValidUntil', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.ValidUntil
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    onClick={() => {
                                                        setRowIndex(index);
                                                        setColumnIndex(8);
                                                    }}
                                                >
                                                    {rowIndex === index && columnIndex === 8 ? (
                                                        <TextField
                                                            disabled={disable}
                                                            defaultValue={data[index]['Status']}
                                                            onChange={(e) => {
                                                                handleTextChange(index, 'Status', e.target.value);
                                                            }}
                                                        />
                                                    ) : (
                                                        row.Status
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
                                                        // onClick={() => {
                                                        //     setDisEnable(false);
                                                        // }}
                                                    >
                                                        Edit
                                                    </Button>
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
                                            // console.log("row" , row);
                                            // <Fragment>
                                            //     {editData === row.id ? (
                                            //         <EditRow
                                            //             editFormData={editFormData}
                                            //             handleEditFormChange={handleEditFormChange}
                                            //             handleDelete={handleDelete}
                                            //         />
                                            //     ) : (
                                            //         <ReadOnlyRow row={row} handleEventClick={handleEventClick} />
                                            //     )}
                                            // </Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                            {/* </form> */}
                        </div>
                    </ClickAwayListener>
                </fieldset>
                <CSVLink {...csvReport} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ position: 'relative', left: 'calc(100% - 230px)', marginTop: '0.7rem' }}
                    >
                        export as csv
                    </Button>
                </CSVLink>
                <Button
                    variant="contained"
                    component="label"
                    style={{ position: 'relative', left: 'calc(100% - 200px)', marginTop: '0.7rem' }}
                    onClick={handleOnDelte}
                >
                    Submit
                </Button>
                {/* </form> */}
            </div>
        </>
    );
}

export default Index;
