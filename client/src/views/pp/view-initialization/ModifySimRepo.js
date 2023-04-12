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

function SimRepo({ row, service, direction, simID }) {
    console.log('prop', simID);
    // const direction = direction;
    const roam = row.roamPartner;
    const [rows, setRow] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [ownSim, setOwnSim] = React.useState(row.ownSim);
    const [roamSim, setRoamSim] = React.useState(row.roamSim);
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
        // { field: '_id', width: 0, hide: true },
        { field: 'TADIG', headerName: ' TADIG', width: 120 },
        { field: 'MCC', headerName: 'MCC/MNC', width: 120 },
        { field: 'IMSI', headerName: 'IMSI', width: 200 },
        { field: 'ICCID', headerName: 'ICCID', width: 200 },
        // { field: 'MSISDN', headerName: 'MSISDN', width: 90 },
        // { field: 'CardFormat', headerName: 'Card format', width: 100 },
        { field: 'ValidUntil', headerName: 'Valid until', width: 100 },
        // { field: 'CreationDate', headerName: 'Creation date', width: 100 },
        { field: 'Status', headerName: 'Status', width: 90 }
    ];
    React.useEffect(() => {
        const url = 'http://localhost:8080/simRepo';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setRow(response.data);
        });
    }, []);

    const postReQ = async (own, arrroam) => {
        try {
            setOpen(false);
            const url = `http://localhost:8080/ppini/${row['_id']}`;
            // const url = 'http://localhost:8080/ppini';
            const data = {};
            data['roamingPartner'] = roam;
            data['service'] = service;
            data['direction'] = direction;
            // data['unilateral'] = unilateral;
            data['ownSim'] = own;
            data['roamingSim'] = arrroam;
            await axios.put(url, data).then((resp) => {
                console.log('resp', resp.data);
                if (resp.data === 'updated') {
                    window.location.href = '/pages/PatnerProvisioning/Dashboard';
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
        console.log('hi');
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
        window.location.href = '/pages/PatnerProvisioning/Dashboard';
    };
    const [selectionModel, setSelectionModel] = React.useState(simID);
    console.log('selectionModel', selectionModel);
    const getFilteredData = () => {
        return rows.filter((item) => {
            if (direction === 'Outbound') return item.TADIG === `${roam}- KWTKT` && item.IMSI.startsWith('41904');
            else if (direction === 'Inbound') return item.TADIG === roam && !item.IMSI.startsWith('41904');
            else return !roam || item.TADIG === roam;
        });
    };

    return (
        <>
            <fieldset style={{ background: '#ffff', borderRadius: '10px', marginTop: '1.3em' }}>
                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>SIM Repository</legend>
                <div style={{ height: 300, width: '100%', marginTop: '1em' }}>
                    <DataGrid
                        rows={getFilteredData()}
                        columns={columns}
                        pagination
                        checkboxSelection
                        pageSize={2}
                        rowsPerPageOptions={[2]}
                        rowCount={100}
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
                style={{ position: 'relative', left: 'calc(100% - 80px)', marginTop: '1rem' }}
                onClick={handleOpen}
            >
                Submit
            </Button>
        </>
    );
}

export default SimRepo;
