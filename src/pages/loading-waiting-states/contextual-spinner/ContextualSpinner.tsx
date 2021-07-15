import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton, Typography, Button, Fab, CircularProgress } from '@material-ui/core';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Menu, PlayArrow } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        minHeight: '100vh',
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    exampleContainer: {
        margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
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

    const handleLoginClick = (): void => {
        setIsLoginLoading(true);
        setTimeout(() => {
            setIsLoginLoading(false);
        }, 3000);
    };

    const handleStartRoutineClick = (): void => {
        setShouldAnimate(true);
        setIsStartRoutineLoading(true);
        setTimeout(() => {
            setIsStartRoutineLoading(false);
        }, 3000);
    };

    return (
        <div className={classes.root}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                            <Menu />
                        </IconButton>
                    </Hidden>
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
                    variant={'contained'}
                    color="primary"
                    className={classes.loginButton}
                    onClick={handleLoginClick}
                >
                    {isLoginLoading ? <CircularProgress size={'20px'} color={'inherit'} /> : 'Login'}
                </Button>
                <br />
                <Fab
                    variant={isStartRoutineLoading ? 'round' : 'extended'}
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
                        <>
                            <PlayArrow
                                className={clsx([
                                    classes.playArrow,
                                    shouldAnimate
                                        ? isStartRoutineLoading
                                            ? classes.hideAnimation
                                            : classes.showAnimation
                                        : '',
                                ])}
                            />
                            Start Routine
                        </>
                    )}
                </Fab>
            </div>
        </div>
    );
};
