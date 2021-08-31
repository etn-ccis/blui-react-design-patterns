import React, {useCallback, useEffect, useState} from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Hidden,
    IconButton,
    InputProps,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {Menu, Search} from '@material-ui/icons';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {TOGGLE_DRAWER} from '../../../redux/actions';

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
    },
    container: {
        width: '100%',
        maxWidth: 480,
        margin: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2),
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
    details: {
        marginTop: theme.spacing(1),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchIcon: {
        marginRight: theme.spacing(1),
        marginLeft:  -theme.spacing(0.5),
        fontSize: 16
    }
}));

export const VerifyOnSubmitValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [serialNumber, setSerialNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
  //  const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputId = 'passcode-input';

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
            }
        }, 2000);
    }

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
                    />

                    <div className={classes.buttonContainer}>
                        <Button
                            className={classes.submitButton}
                            color={'primary'}
                            variant={'contained'}
                            onClick={(): void => {
                                onSubmit(serialNumber)
                            }}
                            disabled={!serialNumber}
                        >
                            { !loading &&
                                <>
                                    <Search className={classes.searchIcon} />
                                    Find Device
                                </>
                            }
                            {loading && <CircularProgress style={{ height: 20, width: 20, color: theme.palette.background.paper }} />}
                        </Button>
                    </div>

                </div>
            </div>
        </>
    );
};
