import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#2a9df4',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: '#2a9df4'
    }
}));
// }

const EarningCard = ({ isLoading, name, value }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 1 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid>
                                    <Grid>
                                        <Typography
                                            color="#ffff"
                                            variant="h2"
                                            style={{ fontWeight: '500', textAlign: 'center', fontSize: '2em', margin: '0.2em' }}
                                        >
                                            {value}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid sx={{ mb: 1 }}>
                                <Typography
                                    style={{
                                        color: '#ffff',
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        fontSize: '1.2em'
                                    }}
                                >
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
