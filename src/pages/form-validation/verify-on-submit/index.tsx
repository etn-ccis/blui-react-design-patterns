import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    IconButton,
    InputProps,
    Slide,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Add, CheckCircle, Menu, Search } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { EmptyState } from '@brightlayer-ui/react-components';

type OnChangeHandler = InputProps['onChange'];
const slideAnimationDurationMs = 250;

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
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
        },
    },
    container: {
        height: '100%',
        width: '100%',
        maxWidth: 480,
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            maxWidth: '100%',
        },
    },
    submitButton: {
        height: 36,
        marginTop: theme.spacing(4),
        width: 152,
        [theme.breakpoints.down('sm')]: {
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
    const inputEl = useRef<HTMLInputElement>(null);
    const md = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (showAddDeviceScreen && inputEl.current) {
            inputEl.current.focus();
        }
    }, [showAddDeviceScreen]);

    const onSerialNumberChange: OnChangeHandler = useCallback((event) => {
        setErrorMsg('');
        setSerialNumber(event.target.value);
    }, []);

    const onSubmit = useCallback((serial: string): void => {
        setErrorMsg('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (serial !== '123') {
                setErrorMsg('Device not found.');
                if (inputEl.current) {
                    inputEl.current.focus();
                }
            } else {
                setDeviceAdded(true);
                setShowAddDeviceScreen(false);
                setTimeout(() => {
                    setShowDeviceAddedScreen(true);
                }, slideAnimationDurationMs);
            }
        }, 2000);
    }, []);

    return (
        <>
            <AppBar data-cy={'blui-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy={'toolbar-menu'}
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Verify on Submit
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <Slide
                        direction={'right'}
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
                                inputRef={inputEl}
                                label={'Serial Number'}
                                value={serialNumber}
                                onChange={onSerialNumberChange}
                                variant={'filled'}
                                error={Boolean(errorMsg)}
                                helperText={errorMsg}
                                type={'search'}
                                onKeyUp={(event): void => {
                                    if (event.key === 'Enter') {
                                        onSubmit(serialNumber);
                                    }
                                }}
                                disabled={loading || showDeviceAddedScreen}
                                id={'serial-number'}
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
                                    disableElevation={loading}
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
                        direction={'left'}
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
