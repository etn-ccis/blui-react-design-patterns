import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { eulaDetails } from './eulaText';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        maxWidth: '600px',
        margin: '0 auto',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
        },
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    eulaContainer: {
        height: `calc(100vh - 100px)`,
        position: 'relative',
        padding: 0,
    },
    loadingOverlayContainer: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    eulaDetails: {
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    eulaDetailSection: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0',
        padding: `${theme.spacing(3)}px`,
    },
    loadingContainer: {
        height: '100%',
        paddingTop: `${theme.spacing(1)}px`,
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: Colors.white[200],
        zIndex: 3,
        opacity: 0.2,
    },
    btnContainer: {
        padding: `${theme.spacing(3)}px`,
    },
    reloadButton: {
        width: '100%',
    },
    eulaContent: {
        paddingTop: `${theme.spacing(1)}px`,
    },
    eulaConfirmationCheck: {
        padding: `0 ${theme.spacing(3)}px`,
    },
}));

export const SpinnerOverlays = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const spinnerCircleSize = 96;
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [eulaLoaded, setEulaLoaded] = useState(false);

    const changeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEulaAccepted(event.target.checked);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!eulaLoaded) {
            timer = setTimeout(() => {
                setEulaLoaded(true);
            }, 3000);
        }
        return (): void => {
            clearTimeout(timer);
        };
    }, [eulaLoaded]);

    const reloadEulaDetails = useCallback((): void => {
        setEulaLoaded(false);
        setEulaAccepted(false);
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
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
                    <Typography variant={'h6'} color={'inherit'}>
                        Spinner Overlays
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card className={classes.eulaContainer}>
                    {!eulaLoaded && (
                        <div className={classes.loadingOverlayContainer}>
                            <CircularProgress color="secondary" size={spinnerCircleSize} />
                        </div>
                    )}
                    <div className={`${classes.eulaDetails} ${!eulaLoaded ? classes.overlayContainer : ''}`}>
                        <div className={classes.eulaDetailSection}>
                            <div>
                                <Typography variant={'h6'}>{eulaDetails.title}</Typography>
                            </div>
                            {!eulaLoaded && (
                                <div className={classes.loadingContainer}>
                                    <Typography variant="subtitle1">{eulaDetails.loadingMessage}</Typography>
                                </div>
                            )}
                            {eulaLoaded && <div className={classes.eulaContent}>{eulaDetails.eulaContent}</div>}
                        </div>
                        <div className={classes.eulaConfirmationCheck}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={eulaAccepted}
                                        onChange={changeCheckboxState}
                                        name="eulaConformation"
                                        color="primary"
                                    />
                                }
                                label="I have read and agree to the Terms & Conditions"
                            />
                        </div>
                        <Divider />
                        <div className={classes.btnContainer}>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                className={classes.reloadButton}
                                onClick={reloadEulaDetails}
                            >
                                <Typography noWrap color={'inherit'}>
                                    Reload
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
