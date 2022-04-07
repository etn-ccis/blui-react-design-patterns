import React, { useCallback, useState, useEffect } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Toolbar, useMediaQuery, IconButton, Typography, Button, Fab, CircularProgress } from '@mui/material';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Menu, PlayArrow } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    exampleContainer: {
        margin: `${theme.spacing(3)} ${theme.spacing(2)}`,
    },
    description: {
        marginBottom: theme.spacing(2),
    },
    loginButton: {
        marginBottom: theme.spacing(2),
        width: 90,
        height: 36,
    },
    startRoutineButton: {
        width: 156,
        height: 56,
        borderRadius: 29,
        transition: theme.transitions.create('width', { duration: theme.transitions.duration.standard }),
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        justifyContent: 'flex-start',
    },
    startRoutineLoadingButton: {
        width: 56,
        borderRadius: 29,
        paddingLeft: 18,
        transition: theme.transitions.create('width', { duration: theme.transitions.duration.standard }),
        justifyContent: 'flex-start',
    },
    playArrow: {
        marginRight: theme.spacing(1),
        opacity: 1,
    },
    '@keyframes show': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    '@keyframes hide': {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },
    showAnimation: {
        animationName: '$show',
        animationDuration: `${theme.transitions.duration.standard}ms`,
        animationTimingFunction: 'linear',
        animationIterationCount: 1,
    },
    hideAnimation: {
        animationName: '$hide',
        animationDuration: `${theme.transitions.duration.standard}ms`,
        animationTimingFunction: 'linear',
        animationIterationCount: 1,
    },
}));

export const ContextualSpinner = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isStartRoutineLoading, setIsStartRoutineLoading] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));
    let loginTimeout: ReturnType<typeof setTimeout>;
    let startRoutineTimeout: ReturnType<typeof setTimeout>;

    const handleLoginClick = useCallback((): void => {
        setIsLoginLoading(true);
        loginTimeout = setTimeout(() => {
            setIsLoginLoading(false);
            clearInterval(loginTimeout);
        }, 3000);
    }, []);

    const handleStartRoutineClick = useCallback((): void => {
        setShouldAnimate(true);
        setIsStartRoutineLoading(true);
        startRoutineTimeout = setTimeout(() => {
            setIsStartRoutineLoading(false);
            clearInterval(startRoutineTimeout);
        }, 3000);
    }, []);

    useEffect(
        () => (): void => {
            clearInterval(loginTimeout);
            clearInterval(startRoutineTimeout);
        },
        []
    );

    return (
        <div>
            <AppBar data-cy="blui-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Contextual Spinner
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.exampleContainer}>
                <Typography variant={'body1'} className={classes.description}>
                    Click on the buttons below to see the spinners.
                </Typography>
                <Button
                    data-cy={'login-btn'}
                    variant={'contained'}
                    color="primary"
                    className={classes.loginButton}
                    onClick={handleLoginClick}
                >
                    {isLoginLoading ? <CircularProgress size={'20px'} color={'inherit'} /> : 'Login'}
                </Button>
                <br />
                <Fab
                    data-cy={'start-btn'}
                    variant={isStartRoutineLoading ? 'circular' : 'extended'}
                    color="primary"
                    className={isStartRoutineLoading ? classes.startRoutineLoadingButton : classes.startRoutineButton}
                    onClick={handleStartRoutineClick}
                >
                    {isStartRoutineLoading ? (
                        <CircularProgress
                            size={'20px'}
                            color={'inherit'}
                            className={isStartRoutineLoading ? classes.showAnimation : classes.hideAnimation}
                        />
                    ) : (
                        <span
                            className={
                                shouldAnimate
                                    ? isStartRoutineLoading
                                        ? classes.hideAnimation
                                        : classes.showAnimation
                                    : ''
                            }
                            style={{ display: 'inherit' }}
                        >
                            <PlayArrow className={classes.playArrow} />
                            Start Routine
                        </span>
                    )}
                </Fab>
            </div>
        </div>
    );
};
