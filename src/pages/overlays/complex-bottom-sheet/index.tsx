import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

import { IconToggle } from './IconToggle';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Spacer, InfoListItem } from '@pxblue/react-components';

import getEvents, { formatDate, Event } from './alarmData';
import { EmptyState } from './EmptyState';

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
            '&$active': {
                borderColor: theme.palette.error.main,
            },
        },
        avatar: {
            color: theme.palette.text.primary,
            background: 'transparent',
            '&$active': {
                color: 'white',
                background: theme.palette.error.main,
            },
        },
        alarmText: {
            fontWeight: 600,
            '&$active': {
                color: theme.palette.error.main,
            },
        },
        active: {},
        paper: {
            width: '100%',
            maxWidth: 600,
            margin: 'auto',
            userSelect: 'none',
        },
        sheetListItem: {
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
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
                        <Typography variant={'body1'} gutterBottom>
                            Sort By:
                        </Typography>
                        <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                            <IconToggle
                                iconComponent={<AccessTime />}
                                label={'Time'}
                                onClick={(): void => setCurrentSort(TYPES.TIME)}
                                active={currentSort === TYPES.TIME}
                            />
                            <IconToggle
                                iconComponent={<Info />}
                                label={'Type'}
                                onClick={(): void => setCurrentSort(TYPES.TYPE)}
                                active={currentSort === TYPES.TYPE}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem data-cy={'btm-sheet-show'} className={classes.sheetListItem}>
                        <Typography variant="body1" gutterBottom>
                            Show:
                        </Typography>
                        <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                            <IconToggle
                                iconComponent={<NotificationsActive />}
                                label={'Active Alarms'}
                                data-cy={'active-alarms'}
                                onClick={(): void => setShowActiveAlarms(!showActiveAlarms)}
                                active={showActiveAlarms}
                            />
                            <IconToggle
                                iconComponent={<Notifications />}
                                label={FILTERS.ALARM}
                                onClick={(): void => setShowAlarms(!showAlarms)}
                                active={showAlarms}
                            />
                            <IconToggle
                                iconComponent={<Settings />}
                                label={FILTERS.SETTINGS}
                                onClick={(): void => setShowSettings(!showSettings)}
                                active={showSettings}
                            />
                            <IconToggle
                                iconComponent={<Update />}
                                label={FILTERS.SESSION}
                                onClick={(): void => setShowSessions(!showSessions)}
                                active={showSessions}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <InfoListItem
                        data-cy="btm-sheet-cancel"
                        icon={<Close />}
                        title={'Close'}
                        dense
                        onClick={(): void => setShowMenu(false)}
                    />
                </List>
            </Drawer>
        </div>
    );
};
