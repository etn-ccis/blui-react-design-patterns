import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    useMediaQuery,
    useTheme,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { eulaText } from './eulaText';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
        maxWidth: '450px',
        margin: '0 auto',
        height: `calc(100vh - ${theme.spacing(8)})`,
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - ${theme.spacing(7)})`,
            padding: 0,
        },
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    reloadButton: {
        width: '100%',
    },
    eulaContent: {
        flex: '1 1 0px',
        overflow: 'auto',
    },
    eulaConfirmationCheck: {
        flex: '0 0 auto',
        marginRight: 0,
        marginTop: theme.spacing(2),
    },
    card: {
        position: 'relative',
        padding: 0,
        width: '100%',
        height: '100%',
        maxWidth: '450px',
        maxHeight: '730px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'none',
            maxHeight: 'none',
            borderRadius: 0,
        },
    },
    cardTitle: {
        padding: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
        },
    },
    cardContent: {
        flex: '1 1 0px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
        },
    },
    cardActions: {
        padding: theme.spacing(3),
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    overlayBackground: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
    },
}));

export const SpinnerOverlays = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [eulaLoaded, setEulaLoaded] = useState(false);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
                    <Typography variant={'h6'} color={'inherit'}>
                        Spinner Overlays
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card className={classes.card}>
                    {!eulaLoaded && (
                        <div className={classes.overlayBackground}>
                            <CircularProgress size={96} />
                        </div>
                    )}
                    <CardHeader
                        title={<Typography variant={'h6'}>End User License Agreement</Typography>}
                        className={classes.cardTitle}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.eulaContent} variant={eulaLoaded ? 'body1' : 'subtitle1'}>
                            {eulaLoaded ? eulaText : 'Loading EULA...'}
                        </Typography>
                        <FormControlLabel
                            className={classes.eulaConfirmationCheck}
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
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.cardActions}>
                        <Button
                            data-cy={'reload'}
                            variant={'contained'}
                            color={'primary'}
                            className={classes.reloadButton}
                            onClick={reloadEulaDetails}
                        >
                            <Typography noWrap color={'inherit'}>
                                Reload
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};
