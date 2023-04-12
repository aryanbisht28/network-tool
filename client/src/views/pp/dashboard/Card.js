import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Budget(props) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color="textPrimary" variant="h1" style={{ fontWeight: '600', textAlign: 'center' }}>
                            {props.total}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ fontSize: '1.5em', fontWeight: '400', marginTop: '1em' }}>
                            {props.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'blue',
                                height: 56,
                                width: 56
                            }}
                        >
                            <InsertChartIcon style={{ color: 'white' }} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Budget;
