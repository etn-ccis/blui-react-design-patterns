import React from 'react';
import { AppBar, Toolbar, Typography, Hidden, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { EmptyState } from '@brightlayer-ui/react-components';
import { BluetoothSearching } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
        },
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}px`,
    },
    LinearProgressBarIndeterminate: {
        position: 'absolute',
        bottom: 0,
        marginLeft: `-${theme.spacing(2)}px`,
        width: '100%',
    },
}));

export const ProgressBarIndeterminate = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="blui-toolbar" position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
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
