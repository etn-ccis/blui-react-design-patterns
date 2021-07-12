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
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { eulaDetails } from './data';
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
    eulaContainerStyle: {
        height: `calc(100vh - 100px)`,
        position: 'relative',
        padding: 0,
    },
    loadingOverlayContainerStyle: {
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
    eulaDetailsStyle: {
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    eulaDetailSectionStyle: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0',
        padding: `${theme.spacing(3)}px`,
    },
    loadingContainerStyle: {
        height: '100%',
        paddingTop: `${theme.spacing(1)}px`,
    },
    overlayContainerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: Colors.white[200],
        zIndex: 3,
        opacity: 0.2,
    },
    btnContainerStyle: {
        padding: `${theme.spacing(3)}px`,
    },
    reloadButtonStyle: {
        width: '100%',
    },
    eulaContentStyle: {
        paddingTop: `${theme.spacing(1)}px`,
    },
    eulaConfirmationCheckStyle: {
        padding: `0 ${theme.spacing(3)}px`,
    },
}));

export const SpinnerOverlays = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const spinnerCirlceSize = 96;
    const [checkboxState, setCheckboxState] = useState(false);
    const [eulaLoaded, setEulaLoaded] = useState(false);

    const changeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCheckboxState(event.target.checked);
    };

    useEffect(() => {
        let isEulaLoaded = true;

        setTimeout(() => {
            if (isEulaLoaded) {
                setEulaLoaded(true);
            }
        }, 3000);

        return (): void => {
            isEulaLoaded = false;
        };
    }, [checkboxState, eulaLoaded, setEulaLoaded]);

    const reloadEulaDetails = useCallback((): void => {
        setEulaLoaded(false);
        setCheckboxState(false);
    }, [checkboxState, eulaLoaded, setEulaLoaded]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                <Card className={classes.eulaContainerStyle}>
                    {!eulaLoaded && (
                        <div className={classes.loadingOverlayContainerStyle}>
                            <CircularProgress color="secondary" size={spinnerCirlceSize} />
                        </div>
                    )}
                    <div className={`${classes.eulaDetailsStyle} ${!eulaLoaded ? classes.overlayContainerStyle : ''}`}>
                        <div className={classes.eulaDetailSectionStyle}>
                            <div>
                                <Typography variant={'h6'}>{eulaDetails.title}</Typography>
                            </div>
                            {!eulaLoaded && (
                                <div className={classes.loadingContainerStyle}>
                                    <Typography variant="subtitle1">{eulaDetails.loadingMessage}</Typography>
                                </div>
                            )}
                            {eulaLoaded && <div className={classes.eulaContentStyle}>{eulaDetails.eulaContent}</div>}
                        </div>
                        <div className={classes.eulaConfirmationCheckStyle}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxState}
                                        onChange={changeCheckboxState}
                                        name="eulaConformation"
                                        color="primary"
                                    />
                                }
                                label={eulaDetails.eulaConfirmation}
                            />
                        </div>
                        <Divider />
                        <div className={classes.btnContainerStyle}>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                className={classes.reloadButtonStyle}
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
