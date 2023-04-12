import React from 'react';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function SimRepo({ roam, service, direction, unilateral, spoc }) {
    // console.log('prop', spoc);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [rows, setRow] = React.useState([]);
    const [ownSim, setOwnSim] = React.useState([]);
    const [roamSim, setRoamSim] = React.useState([]);
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

    const columns = [
        { field: '_id', width: 0, hide: true },
        { field: 'TADIG', headerName: ' TADIG', width: 170 },
        { field: 'MCC', headerName: 'MCC/MNC', width: 170 },
        { field: 'IMSI', headerName: 'IMSI', width: 200 },
        { field: 'ICCID', headerName: 'ICCID', width: 220 },
        // { field: 'MSISDN', headerName: 'MSISDN', width: 90 },
        // { field: 'CardFormat', headerName: 'Card format', width: 100 },
        { field: 'ValidUntil', headerName: 'Valid until', width: 120 },
        // { field: 'CreationDate', headerName: 'Creation date', width: 100 },
        { field: 'Status', headerName: 'Status', width: 110 }
    ];

    React.useEffect(() => {
        const url = 'http://localhost:8080/simRepo';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setRow(response.data);
        });
    }, []);

    // const rows = [
    //     // {
    //     //     id: '0',
    //     //     TADIG: 'AAM21',
    //     //     MCC: '90121',
    //     //     IMSI: '419040084998450',
    //     //     ICCID: '899650400849984500',
    //     //     MSISDN: ' ',
    //     //     CardFormat: 'N/A',
    //     //     ValidUntil: '2019-08-13',
    //     //     CreationDate: '',
    //     //     Status: 'Inactive'
    //     // },
    //     // {
    //         // id: '1',
    //         // TADIG: 'AAM21',
    //         // MCC: '90121',
    //         // IMSI: '419040084998455',
    //         // ICCID: '899650400849984550',
    //         // MSISDN: '',
    //         // CardFormat: 'N/A',
    //         // ValidUntil: '2019-08-13',
    //         // CreationDate: '',
    //         // Status: 'Inactive'
    //     // },
    //     // {
    //     //     id: '2',
    //     //     TADIG: 'AAM21',
    //     //     MCC: '90121',
    //     //     IMSI: '419040084998465',
    //     //     ICCID: '899650400849984650',
    //     //     MSISDN: '',
    //     //     CardFormat: 'N/A',
    //     //     ValidUntil: '2019-08-13',
    //     //     CreationDate: '',
    //     //     Status: 'Inactive'
    //     // },
    //     {
    //         id: '3',
    //         TADIG: 'AAM21',
    //         MCC: '90121',
    //         IMSI: '419040084998460',
    //         ICCID: '899650400849984600',
    //         MSISDN: '',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '4',
    //         TADIG: 'AAM21',
    //         MCC: '90121',
    //         IMSI: '419040084998470',
    //         ICCID: '899650400849984700',
    //         MSISDN: '',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '5',
    //         TADIG: 'AFGAR',
    //         MCC: '41240',
    //         IMSI: '419040084995560',
    //         ICCID: '899650400849955600',
    //         MSISDN: ' ',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '6',
    //         TADIG: 'AAM21',
    //         MCC: '41240',
    //         IMSI: '419040084995565',
    //         ICCID: '899650400849955650',
    //         MSISDN: '',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '7',
    //         TADIG: 'AFGAR',
    //         MCC: '41240',
    //         IMSI: '419040084995575',
    //         ICCID: '899650400849955750',
    //         MSISDN: '',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '8',
    //         TADIG: 'AFGAR',
    //         MCC: '41240',
    //         IMSI: '419040084995545',
    //         ICCID: '899650400849955450',
    //         MSISDN: '55020386',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '9',
    //         TADIG: 'AFGAR',
    //         MCC: '41240',
    //         IMSI: '419040084992470',
    //         ICCID: '899650400849924700',
    //         MSISDN: '55061382',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '10',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989485',
    //         ICCID: '899650400849894850',
    //         MSISDN: '55059314 ',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '11',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989490',
    //         ICCID: '899650400849894900',
    //         MSISDN: '55059346',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '12',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989495',
    //         ICCID: '899650400849894950',
    //         MSISDN: '55059360',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '13',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989500',
    //         ICCID: '899650400849895000',
    //         MSISDN: '55059402',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '14',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989505',
    //         ICCID: '899650400849895050',
    //         MSISDN: '55059420',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '15',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '419040084989510',
    //         ICCID: '899650400849895100',
    //         MSISDN: '55060587 ',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-08-13',
    //         CreationDate: '',
    //         Status: 'Active'
    //     },
    //     {
    //         id: '16',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '412500200000720',
    //         ICCID: '89935010200000000720',
    //         MSISDN: '93786100726',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-07-17',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '17',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '412500200000722',
    //         ICCID: '89935010200000000722',
    //         MSISDN: '93786100728',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-07-17',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '18',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '412500200000723',
    //         ICCID: '89935010200000000723',
    //         MSISDN: '93786100729',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-07-17',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     },
    //     {
    //         id: '19',
    //         TADIG: 'AFGEA',
    //         MCC: '41250',
    //         IMSI: '412500200000724',
    //         ICCID: '89935010200000000724',
    //         MSISDN: '93786100730',
    //         CardFormat: 'N/A',
    //         ValidUntil: '2019-07-17',
    //         CreationDate: '',
    //         Status: 'Inactive'
    //     }
    // ];
    const postReQ = async (own, arrroam) => {
        try {
            setOpen(false);
            const url = 'http://localhost:8080/ppini';
            const data = {};
            data['roamingPartner'] = roam;
            data['service'] = service;
            data['direction'] = direction;
            data['unilateral'] = unilateral;
            data['spoc'] = spoc;
            data['ownSim'] = own;
            data['roamingSim'] = arrroam;
            await axios.post(url, data).then((resp) => {
                console.log('resp', resp.data);
                if (resp.data === 'email sent') {
                    window.location.href = '/pages/PatnerProvisioning/view-intialization';
                } else if (resp.data === 'Already present!') {
                    setOpen(true);
                    // <Alert severity="error">This roaming partner is already present.</Alert>;
                } else if (resp.data === 'email sent1') {
                    setOpen1(true);
                }
            });
            console.log(formdata);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    const handleOpen = () => {
        let arrOwn = [];
        let arrRoam = [];
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < selectionModel.length; j++) {
                if (rows[i].id === selectionModel[j]) {
                    console.log('printing...', rows[i].id, selectionModel[j]);
                    if (rows[i].IMSI.startsWith('41904')) {
                        arrOwn.push(rows[i]);
                        setOwnSim(arrOwn);
                        // console.log('ownSim', ownSim);
                    } else {
                        arrRoam.push(rows[i]);
                        setRoamSim(arrRoam);
                    }
                }
            }
        }
        postReQ(arrOwn, arrRoam);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.href = '/pages/PatnerProvisioning/view-intialization';
    };
    const [selectionModel, setSelectionModel] = React.useState([]);
    const getFilteredData = () => {
        const roamfull = roam + '- KWTKT';
        return rows.filter((item) => {
            if (direction === 'Bi-Lateral' || direction === '' || roam === '')
                return !roam || item.TADIG === roam || item.TADIG === roamfull;
            else if (direction === 'Unilateral' && unilateral === 'Outbound')
                return item.TADIG === roamfull && item.IMSI.startsWith('41904');
            else if (direction === 'Unilateral' && unilateral === 'Inbound') return item.TADIG === roam && !item.IMSI.startsWith('41904');
            else return !roam || item.TADIG === roam || item.TADIG === roamfull;
        });
    };

    return (
        <>
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1.3em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>SIM Repository</legend>
                <div style={{ height: 270, width: '100%', marginTop: '.7em' }}>
                    <DataGrid
                        rows={getFilteredData()}
                        columns={columns}
                        pagination
                        checkboxSelection
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        rowCount={10000}
                        onSelectionModelChange={(newSelectionModel) => {
                            console.log('new selection', newSelectionModel);
                            setSelectionModel(newSelectionModel);
                        }}
                        selectionModel={selectionModel}
                        keepNonExistentRowsSelected
                    />
                </div>
            </fieldset>

            <Button
                variant="contained"
                component="label"
                style={{ position: 'relative', left: 'calc(100% - 80px)', marginTop: '.5rem' }}
                onClick={handleOpen}
                disabled={roam == '' || service == ''}
            >
                Submit
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <CloseIcon style={{ position: 'relative', left: '22vw', top: '-2.5vh', cursor: 'pointer' }} onClick={handleClose} />
                    <Typography id="modal-modal-title" variant="h4">
                        Roaming Partner with selected services already in testing phase.
                    </Typography>
                    <Button style={{ top: '3.5vh', left: '20vw' }} variant="contained" onClick={handleClose}>
                        Ok
                    </Button>
                </Box>
            </Modal>
            <Modal open={open1} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <CloseIcon style={{ position: 'relative', left: '22vw', top: '-2.5vh', cursor: 'pointer' }} onClick={handleClose} />
                    <Typography id="modal-modal-title" variant="h4">
                        Roaming Partner with few selected services already in testing phase and we have added the services which are not
                        already present in testing phase .
                    </Typography>
                    <Button style={{ top: '3.5vh', left: '20vw' }} variant="contained" onClick={handleClose}>
                        Ok
                    </Button>
                </Box>
            </Modal>

            {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <CloseIcon style={{ position: 'relative', left: '64vw', top: '-2.5vh', cursor: 'pointer' }} onClick={handleClose} />
                    <Box sx={{ display: 'flex' }}>
                        <Typography id="modal-modal-title" variant="h5">
                            Roaming Partner : {roam}
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 50 }}></Box>
                        <Typography id="modal-modal-title" variant="h5">
                            Services : {`${service}`}
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 50 }}></Box>

                        <Typography id="modal-modal-title" variant="h5">
                            Direction : {direction}
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 50 }}></Box>

                        <Typography id="modal-modal-title" variant="h5">
                            Unilateral : {unilateral}
                        </Typography>
                    </Box>
                    <Typography id="modal-modal-title" variant="h5">
                        OWN SIM
                    </Typography>
                    <div style={{ height: 250, width: '100%' }}>
                        <DataGrid rows={ownSim} columns={columns} rowsPerPageOptions={[2]} />
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Roaming Partner SIM
                    </Typography>
                    <div style={{ height: 250, width: '100%' }}>
                        <DataGrid rows={roamSim} columns={columns} rowsPerPageOptions={[2]} />
                    </div>
                </Box>
            </Modal> */}
        </>
    );
}

export default SimRepo;
