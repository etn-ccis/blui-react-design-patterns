import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, useTheme, Theme, Fade, Divider, Button, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
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
            [theme.breakpoints.down('sm')]: {
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
    const md = useMediaQuery(theme.breakpoints.up('md'));

    useEffect((): void => {
        setTimeout((): void => {
            setDisplayTitle(true);
        }, 250);
        setTimeout((): void => {
            setDisplayBody(true);
        }, 500);
        setTimeout((): void => {
            setDisplayLinks(true);
        }, 1250);
    }, []);

    return (
        <div className={classes.pageBackground}>
            {md ? null : (
                <AppBar position={'sticky'}>
                    <Toolbar>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={'h6'} color={'inherit'}>
                            Brightlayer UI Design Patterns
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
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
                                behavior from the Material Design system. Brightlayer UI design patterns are patterns
                                that extend/modify those from Material or are specific to Brightlayer UI applications.
                            </Typography>
                            <Typography variant={'body1'}>
                                While everyone is encouraged to interact with the design pattern demos to become
                                familiar with the interactions and behaviors, this application is primarily intended for
                                <strong> React developers </strong> to provide examples of how to implement these
                                patterns in their own applications.
                            </Typography>
                            {md ? null : (
                                <Button
                                    variant={'outlined'}
                                    disableElevation
                                    color={'primary'}
                                    onClick={(): void => {
                                        dispatch({ type: TOGGLE_DRAWER, payload: true });
                                    }}
                                >
                                    Explore Brightlayer UI Design Patterns
                                </Button>
                            )}
                        </div>
                    </Fade>
                    <Fade in={displayLinks} timeout={1000}>
                        <div className={classes.spaced}>
                            <Divider />
                            <div className={classes.links}>
                                <Button
                                    target={'_blank'}
                                    href={'https://brightlayer-ui.github.io/development/frameworks-web/react'}
                                >
                                    React Getting Started Guide
                                </Button>
                                <Button target={'_blank'} href={'https://brightlayer-ui.github.io/patterns'}>
                                    Design Pattern Descriptions
                                </Button>
                                <Button target={'_blank'} href={'https://brightlayer-ui-components.github.io/react/'}>
                                    Brightlayer UI React Component Library
                                </Button>
                                <Button target={'_blank'} href={'https://github.com/brightlayer-ui'}>
                                    Visit Us on GitHub
                                </Button>
                                <Button
                                    target={'_blank'}
                                    href={'https://github.com/brightlayer-ui/react-design-patterns'}
                                >
                                    Design Pattern Source on GitHub
                                </Button>
                                <Button target={'_blank'} href={'https://brightlayer-ui.github.io/roadmap'}>
                                    Release Roadmap
                                </Button>
                                <Button target={'_blank'} href={'https://brightlayer-ui.github.io/community/contactus'}>
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
