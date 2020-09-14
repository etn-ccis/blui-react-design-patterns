import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Hero, HeroBanner, InfoListItem, Spacer } from '@pxblue/react-components';
import * as Colors from '@pxblue/colors';
import Box from '@material-ui/core/Box';

import Close from '@material-ui/icons/Close';
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import AccessTime from '@material-ui/icons/AccessTime';
import Info from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import Update from '@material-ui/icons/Update';

import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import getEvents, { Event, formatDate } from './alarmData';
import { EmptyState } from './EmptyState';
import { useMediaQuery } from '@material-ui/core';

export const TYPES = {
    TIME: 'time',
    TYPE: 'type',
};

export const FILTERS = {
    ALARM: 'alarm',
    SESSION: 'session',
    SETTINGS: 'settings',
};

const eventList = getEvents(20);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
        alarmRow: {
            borderLeft: `${theme.spacing(0.5)}px solid transparent`,
        },
        avatar: {
            color: theme.palette.text.primary,
            background: 'transparent',
        },
        heroBanner: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        hero: {
            cursor: 'pointer',
            flex: 'unset',
            minWidth: 100,
        },
        activeIcon: {
            color: Colors.blue[500],
        },
        alarmText: {
            fontWeight: 600,
        },
        paper: {
            width: '100%',
            maxWidth: 600,
            margin: 'auto',
            userSelect: 'none',
        },
        sheetListItem: {
            width: '100%',
            flexDirection: 'column',
        },
        row: {
            cursor: 'pointer',
            width: '100%',
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
        },
        emptyStateContainer: {
            display: 'flex',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
            justifyContent: 'center',
        },
    })
);

export const sortedEvents = (events: Event[], sortby: string): Event[] => {
    switch (sortby) {
        case TYPES.TYPE:
            return events.sort((a, b) => {
                // primary sort by type
                if (a.type < b.type) {
                    return -1;
                } else if (a.type > b.type) {
                    return 1;
                }
                // secondary sort by alarm active and/or date
                if (a.type !== FILTERS.ALARM) {
                    return b.date - a.date;
                }
                if (a.active && !b.active) {
                    return -1;
                } else if (b.active && !a.active) {
                    return 1;
                }
                return b.date - a.date;
            });
        case TYPES.TIME:
        default:
            return events.sort((a, b) => b.date - a.date);
    }
};

export const filteredEvents = (events: Event[], config: any): Event[] => {
    const { showActiveAlarms, showAlarms, showSettings, showSessions } = config;
    return events.filter((item) => {
        if (!showActiveAlarms && item.type === FILTERS.ALARM && item.active) {
            return false;
        }
        if (!showAlarms && item.type === FILTERS.ALARM && !item.active) {
            return false;
        }
        if (!showSettings && item.type === FILTERS.SETTINGS) {
            return false;
        }
        if (!showSessions && item.type === FILTERS.SESSION) {
            return false;
        }
        return true;
    });
};

export const ComplexBottomSheet = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);

    const [showMenu, setShowMenu] = useState(false);
    const [list, setList] = useState(eventList);
    const [currentSort, setCurrentSort] = useState('time');
    const [showAlarms, setShowAlarms] = useState(true);
    const [showActiveAlarms, setShowActiveAlarms] = useState(true);
    const [showSettings, setShowSettings] = useState(true);
    const [showSessions, setShowSessions] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setList(
            filteredEvents(sortedEvents(eventList, currentSort), {
                showActiveAlarms,
                showAlarms,
                showSettings,
                showSessions,
            })
        );
    }, [currentSort, showActiveAlarms, showAlarms, showSettings, showSessions]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                    <Typography variant={'h6'} color={'inherit'} noWrap>
                        Complex Bottom Sheet
                    </Typography>
                    <Spacer />
                    <IconButton
                        data-cy={'action-menu'}
                        color={'inherit'}
                        onClick={(): void => setShowMenu(true)}
                        edge={'end'}
                    >
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {list.length > 0 && (
                <List disablePadding data-cy={'list-content'}>
                    {list.map((event, i) => (
                        <InfoListItem
                            key={i}
                            icon={
                                <>
                                    {event.type === 'alarm' && event.active && <NotificationsActive />}
                                    {event.type === 'alarm' && !event.active && <Notifications />}
                                    {event.type === 'settings' && <Settings />}
                                    {event.type === 'session' && <Update />}
                                </>
                            }
                            title={`${event.active ? 'ACTIVE: ' : ''}${event.details}`}
                            subtitle={formatDate(event.date)}
                            fontColor={event.active ? theme.palette.error.main : undefined}
                            avatar
                            statusColor={event.active ? theme.palette.error.main : 'transparent'}
                            iconColor={event.active ? undefined : theme.palette.text.primary}
                        />
                    ))}
                </List>
            )}

            {list.length === 0 && <EmptyState />}

            {/* Custom/Complex Bottom Sheet Definition */}
            <Drawer
                anchor={'bottom'}
                transitionDuration={250}
                open={showMenu}
                onClose={(): void => setShowMenu(false)}
                classes={{ paper: classes.paper }}
            >
                <List disablePadding>
                    <ListItem data-cy={'btm-sheet-sort'} className={classes.sheetListItem}>
                        <Typography variant={'overline'} style={{ width: '100%' }} gutterBottom>
                            Sort By:
                        </Typography>

                        <HeroBanner className={classes.heroBanner}>
                            <Hero
                                icon={<AccessTime />}
                                label={'Time'}
                                classes={
                                    currentSort === TYPES.TIME
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setCurrentSort(TYPES.TIME)}
                            />
                            <Hero
                                icon={<Info />}
                                label={'Type'}
                                classes={
                                    currentSort === TYPES.TYPE
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setCurrentSort(TYPES.TYPE)}
                            />
                        </HeroBanner>
                    </ListItem>
                    <Divider />
                    <ListItem data-cy={'btm-sheet-show'} className={classes.sheetListItem}>
                        <Typography variant="overline" style={{ width: '100%' }} gutterBottom>
                            Show:
                        </Typography>

                        <HeroBanner className={classes.heroBanner}>
                            <Hero
                                icon={<NotificationsActive />}
                                label={'Active Alarms'}
                                data-cy={'active-alarms'}
                                classes={
                                    showActiveAlarms
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setShowActiveAlarms(!showActiveAlarms)}
                            />
                            <Hero
                                icon={<Notifications />}
                                label={'Alarms'}
                                classes={
                                    showAlarms
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setShowAlarms(!showAlarms)}
                            />
                            <Hero
                                icon={<Settings />}
                                label={'Settings'}
                                classes={
                                    showSettings
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setShowSettings(!showSettings)}
                            />
                            <Hero
                                icon={<Update />}
                                label={'Sessions'}
                                classes={
                                    showSessions
                                        ? { root: classes.hero, label: classes.activeIcon, icon: classes.activeIcon }
                                        : { root: classes.hero }
                                }
                                onClick={(): void => setShowSessions(!showSessions)}
                            />
                        </HeroBanner>
                    </ListItem>

                    {!isMobile && <Divider />}
                    <Box
                        boxShadow={isMobile ? 8 : 0}
                        style={{ position: 'sticky', bottom: 0, background: Colors.white[50] }}
                    >
                        <InfoListItem
                            data-cy="btm-sheet-cancel"
                            icon={<Close />}
                            title={'Close'}
                            dense
                            onClick={(): void => setShowMenu(false)}
                        />
                    </Box>
                </List>
            </Drawer>
        </div>
    );
};
