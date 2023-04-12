import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import ReviewsIcon from '@mui/icons-material/Reviews';

function Budget(props) {
    return (
        <Card sx={{ height: '90%' }}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color="textPrimary" variant="h1" style={{ fontWeight: '600', textAlign: 'center' }}>
                            {props.total}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ fontSize: '1.3em', fontWeight: '400', marginTop: '1em' }}>
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
                            <ReviewsIcon style={{ color: 'white' }} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Budget;
