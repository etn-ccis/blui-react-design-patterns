import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton, Typography, Button, ButtonGroup, Tooltip, Card } from '@material-ui/core';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Menu, Refresh } from '@material-ui/icons';
import { ScorecardPlaceholder } from './components/ScorecardPlaceholder';
import { ListItemDensePlaceholder, ListItemPlaceholder } from './components/ListItemPlaceholder';
import { HeroBannerPlaceholder } from './components/HeroBannerPlaceholder';
import { Spacer } from '@pxblue/react-components';

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
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    label: {
        marginRight: theme.spacing(2),
    },
    selected: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
        color: theme.palette.primary.main,
    },
}));

export const Skeletons = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [animationStyle, setAnimationStyle] = useState<'pulse' | 'wave'>('pulse');

    const refreshData = (): void => {
        setIsLoading(true);

        // setTimeout((): void => {
        //     setIsLoading(false);
        // }, 3000);
    };

    useEffect(() => {
        refreshData();
    }, []);

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
                        Skeletons
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Refresh'}>
                        <IconButton edge={'end'} color={'inherit'} onClick={refreshData}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <div className={classes.exampleContainer}>
                <div className={classes.buttonRow}>
                    <Typography variant={'subtitle1'} className={classes.label}>
                        Animation Style
                    </Typography>
                    <ButtonGroup color="primary">
                        <Button
                            onClick={(): void => setAnimationStyle('pulse')}
                            className={animationStyle === 'pulse' ? classes.selected : ''}
                        >
                            Pulse
                        </Button>
                        <Button
                            onClick={(): void => setAnimationStyle('wave')}
                            className={animationStyle === 'wave' ? classes.selected : ''}
                        >
                            Wave
                        </Button>
                    </ButtonGroup>
                </div>
                <Typography variant={'h6'} className={classes.title}>
                    Scorecard
                </Typography>
                {isLoading && (
                    <div>
                        <ScorecardPlaceholder animation={animationStyle} />
                    </div>
                )}
                {!isLoading && <div>put loaded scorecard content here</div>}

                <Typography variant={'h6'} className={classes.title}>
                    List Items
                </Typography>
                {isLoading && (
                    <div>
                        <Card style={{ marginBottom: theme.spacing(2) }}>
                            <ListItemPlaceholder animation={animationStyle} divider />
                            <ListItemPlaceholder animation={animationStyle} divider />
                            <ListItemPlaceholder animation={animationStyle} />
                        </Card>
                        <Card>
                            <ListItemDensePlaceholder animation={animationStyle} divider />
                            <ListItemDensePlaceholder animation={animationStyle} divider />
                            <ListItemDensePlaceholder animation={animationStyle} />
                        </Card>
                    </div>
                )}
                {!isLoading && <div>put loaded list item content here</div>}

                <Typography variant={'h6'} className={classes.title}>
                    Hero Banner
                </Typography>
                {isLoading && (
                    <div>
                        <HeroBannerPlaceholder animation={animationStyle} />
                    </div>
                )}
                {!isLoading && <div>put loaded hero banner content here</div>}
            </div>
        </div>
    );
};
