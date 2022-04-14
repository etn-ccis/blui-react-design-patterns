import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { EmptyState } from '@brightlayer-ui/react-components';
import { BluetoothSearching } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100vh - ${theme.spacing(8)})`,
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - ${theme.spacing(7)})`,
        },
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}`,
    },
    LinearProgressBarIndeterminate: {
        position: 'absolute',
        bottom: 0,
        marginLeft: theme.spacing(-2),
        width: '100%',
    },
}));

export const ProgressBarIndeterminate = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="blui-toolbar" position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    {isMobile ? (
                        <Typography variant={'h6'} color={'inherit'}>
                            Progress Bars (Indet.)
                        </Typography>
                    ) : (
                        <Typography variant={'h6'} color={'inherit'}>
                            Progress Bars (Indeterminate)
                        </Typography>
                    )}
                    <div />
                    <LinearProgress className={classes.LinearProgressBarIndeterminate} />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <EmptyState
                    icon={<BluetoothSearching style={{ fontSize: 'inherit' }} />}
                    title={'Searching for Devices'}
                    description={'Put your indeterminate progress bar in the app bar'}
                />
            </div>
        </div>
    );
};
