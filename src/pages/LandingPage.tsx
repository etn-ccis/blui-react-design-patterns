import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import {
    IconButton,
    Hidden,
    useTheme,
    makeStyles,
    Theme,
    createStyles,
    Fade,
    Divider,
    Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../redux/actions';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageBackground: {
            backgroundColor: theme.palette.background.paper,
            minHeight: '100vh',
            position: 'relative',
        },
        body: {
            padding: theme.spacing(3),
            color: theme.palette.text.primary,
            paddingTop: '10vh',
            paddingBottom: theme.spacing(5),
        },
        content: {
            maxWidth: 600,
            margin: '0 auto',
        },
        spaced: {
            '& > *': {
                marginTop: theme.spacing(3),
            },
        },
        links: {
            columnCount: 2,
            columnGap: theme.spacing(8),
            '& > *': {
                display: 'inline-block',
                marginBottom: theme.spacing(1),
                verticalAlign: 'top',
            },
            [theme.breakpoints.down('xs')]: {
                columnCount: 1,
                '& > *': {
                    display: 'block',
                },
            },
        },
    })
);

export const LandingPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [displayTitle, setDisplayTitle] = useState(false);
    const [displayBody, setDisplayBody] = useState(false);
    const [displayLinks, setDisplayLinks] = useState(false);

    useEffect((): void => {
        setTimeout((): void => {
            setDisplayTitle(true);
        }, 300);
        setTimeout((): void => {
            setDisplayBody(true);
        }, 1000);
        setTimeout((): void => {
            setDisplayLinks(true);
        }, 1500);
    }, []);

    return (
        <div className={classes.pageBackground}>
            <Hidden mdUp>
                <AppBar position={'sticky'}>
                    <Toolbar>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={'h6'} color={'inherit'}>
                            PX Blue Design Patterns
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Hidden>
            <div className={classes.body}>
                <div className={clsx(classes.content, classes.spaced)}>
                    <Fade in={displayTitle} timeout={500}>
                        <Typography variant={'h2'}>
                            The <span style={{ color: theme.palette.primary.main }}>Patterns</span>.
                        </Typography>
                    </Fade>
                    <Fade in={displayBody} timeout={1500}>
                        <div className={classes.spaced}>
                            <Typography variant={'body1'}>
                                A <strong>design pattern</strong> is a common interaction or behavior that should be
                                consistent across applications. In general, we follow most of the design patterns and
                                behavior from the Material Design system. PX Blue design patterns are patterns that
                                extend/modify those from Material or are specific to PX Blue applications.
                            </Typography>

                            <Typography variant={'body1'}>
                                While everyone is encouraged to interact with the design pattern demos to become
                                familiar with the interactions and behaviors, this application is primarily intended for
                                <strong> React developers </strong> to provide examples of how to implement these
                                patterns in their own applications.
                            </Typography>
                            <Hidden mdUp>
                                <Button
                                    variant={'outlined'}
                                    disableElevation
                                    color={'primary'}
                                    onClick={(): void => {
                                        dispatch({ type: TOGGLE_DRAWER, payload: true });
                                    }}
                                >
                                    Explore PX Blue Design Patterns
                                </Button>
                            </Hidden>
                        </div>
                    </Fade>
                    <Fade in={displayLinks} timeout={1000}>
                        <div className={classes.spaced}>
                            <Divider />
                            <div className={classes.links}>
                                <Button
                                    target={'_blank'}
                                    href={'https://pxblue.github.io/development/frameworks-web/react'}
                                >
                                    React Getting Started Guide
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/patterns'}>
                                    Design Pattern Descriptions
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue-components.github.io/react/'}>
                                    PX Blue React Component Library
                                </Button>
                                <Button target={'_blank'} href={'https://github.com/pxblue'}>
                                    Visit Us on GitHub
                                </Button>
                                <Button target={'_blank'} href={'https://github.com/pxblue/react-design-patterns'}>
                                    Design Pattern Source on GitHub
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/roadmap'}>
                                    Release Roadmap
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/community/contactus'}>
                                    Send Feedback or Suggestions
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};
