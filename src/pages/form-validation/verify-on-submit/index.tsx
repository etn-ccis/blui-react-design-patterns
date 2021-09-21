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
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 56px)',
        },
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
        height: 36,
        marginTop: theme.spacing(4),
        width: 152,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    deviceAdded: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
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
    }, [showAddDeviceScreen]);

    const onSerialNumberChange: OnChangeHandler = useCallback((event) => {
        setErrorMsg('');
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
                                For the sake of this example, serial number <strong>123</strong> will yield a successful
                                device search.
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
                                    startIcon={<>{!loading && <Search />}</>}
                                    onClick={(): void => {
                                        onSubmit(serialNumber);
                                    }}
                                    disabled={!serialNumber}
                                    data-cy={'search-button'}
                                >
                                    {!loading && <>Search Device</>}
                                    {loading && (
                                        <CircularProgress
                                            style={{
                                                height: 20,
                                                width: 20,
                                                color: theme.palette.background.paper,
                                            }}
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
                        <div className={classes.deviceAdded}>
                            <EmptyState
                                title={'Success'}
                                description={`Device "${serialNumber}" has been added to your repository.`}
                                icon={<CheckCircle fontSize={'inherit'} />}
                                actions={
                                    <Button
                                        color={'primary'}
                                        variant={'outlined'}
                                        startIcon={<Add />}
                                        data-cy={'add-device'}
                                        onClick={(): void => {
                                            setShowDeviceAddedScreen(false);
                                            setSerialNumber('');
                                            setTimeout(() => {
                                                setShowAddDeviceScreen(true);
                                            }, slideAnimationDurationMs);
                                        }}
                                    >
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
