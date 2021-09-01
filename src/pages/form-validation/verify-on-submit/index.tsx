import React, { useCallback, useEffect, useState } from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Hidden,
    IconButton,
    InputProps,
    Slide,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { Add, CheckCircle, Menu, Search } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { EmptyState } from '@pxblue/react-components';

type OnChangeHandler = InputProps['onChange'];

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    containerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
        backgroundColor: 'white',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
    },
    container: {
        height: '100%',
        width: '100%',
        maxWidth: 480,
        padding: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
            maxWidth: '100%',
        },
    },
    submitButton: {
        marginTop: theme.spacing(4),
        width: 135,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    searchIcon: {
        marginRight: theme.spacing(1),
        marginLeft: -theme.spacing(0.5),
        fontSize: 16,
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

export const VerifyOnSubmitValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [serialNumber, setSerialNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [deviceAdded, setDeviceAdded] = useState(false);
    const [showDeviceAddedScreen, setShowDeviceAddedScreen] = useState(false);
    const [showAddDeviceScreen, setShowAddDeviceScreen] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputId = 'serialNumber';
    const slideAnimationDurationMs = 250;

    useEffect(() => {
        const input = document.getElementById(inputId);
        if (input) {
            input.focus();
        }
    }, []);

    const onSerialNumberChange: OnChangeHandler = useCallback((event) => {
        setSerialNumber(event.target.value);
    }, []);

    const onSubmit = (serial: string): void => {
        setErrorMsg('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (serial !== '123') {
                setErrorMsg('Device not found.');
                const input = document.getElementById(inputId);
                if (input) {
                    input.focus();
                }
            } else {
                setDeviceAdded(true);
                setShowAddDeviceScreen(false);
                setTimeout(() => {
                    setShowDeviceAddedScreen(true);
                }, slideAnimationDurationMs);
            }
        }, 2000);
    };

    return (
        <>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Verify on Submit
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <Slide
                        direction="right"
                        in={showAddDeviceScreen}
                        mountOnEnter
                        unmountOnExit
                        timeout={deviceAdded ? slideAnimationDurationMs : 0}
                    >
                        <div>
                            <Typography variant={'h6'} style={{ marginBottom: theme.spacing(2) }}>
                                Find Device
                            </Typography>
                            <Typography variant={'body1'} style={{ marginBottom: theme.spacing(4) }}>
                                For the sake of this example, serial number 123 will yield a successful device search.
                            </Typography>
                            <TextField
                                style={{ width: '100%', height: 72 }}
                                id={inputId}
                                label={'Serial Number'}
                                value={serialNumber}
                                onChange={onSerialNumberChange}
                                variant="filled"
                                error={Boolean(errorMsg)}
                                helperText={errorMsg}
                                onKeyUp={(event): void => {
                                    if (event.key === 'Enter') {
                                        onSubmit(serialNumber);
                                    }
                                }}
                            />

                            <div className={classes.buttonContainer}>
                                <Button
                                    className={classes.submitButton}
                                    color={'primary'}
                                    variant={'contained'}
                                    onClick={(): void => {
                                        onSubmit(serialNumber);
                                    }}
                                    disabled={!serialNumber}
                                >
                                    {!loading && (
                                        <>
                                            <Search className={classes.searchIcon} />
                                            Find Device
                                        </>
                                    )}
                                    {loading && (
                                        <CircularProgress
                                            style={{ height: 20, width: 20, color: theme.palette.background.paper }}
                                        />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Slide>

                    <Slide
                        direction="left"
                        in={showDeviceAddedScreen}
                        mountOnEnter
                        unmountOnExit
                        timeout={slideAnimationDurationMs}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}
                        >
                            <EmptyState
                                title={'Success'}
                                description={`Device "${serialNumber}" has been added to your repository.`}
                                icon={<CheckCircle fontSize={'inherit'} />}
                                actions={
                                    <Button
                                        color={'primary'}
                                        variant={'outlined'}
                                        onClick={(): void => {
                                            setShowDeviceAddedScreen(false);
                                            setSerialNumber('');
                                            setTimeout(() => {
                                                setShowAddDeviceScreen(true);
                                            }, slideAnimationDurationMs);
                                        }}
                                    >
                                        <Add />
                                        Add Another Device
                                    </Button>
                                }
                            />
                        </div>
                    </Slide>
                </div>
            </div>
        </>
    );
};
