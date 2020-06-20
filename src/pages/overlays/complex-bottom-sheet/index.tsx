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

const FILTERS = {
    TIME: 'time',
    TYPE: 'type',
};

const TYPES = {
    ALARM: 'alarm',
    SESSION: 'session',
    SETTINGS: 'settings',
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
);

const eventList = getEvents(20);

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

    const sortedEvents = (events: Event[]): Event[] => {
        switch (currentSort) {
            case FILTERS.TYPE:
                return events.sort((a, b) => {
                    // primary sort by type
                    if (a.type < b.type) {
                        return -1;
                    } else if (a.type > b.type) {
                        return 1;
                    } else {
                        // secondary sort by alarm active and/or date
                        if (a.type !== TYPES.ALARM) {
                            return b.date - a.date;
                        } else {
                            if (a.active && !b.active) {
                                return -1;
                            } else if (b.active && !a.active) {
                                return 1;
                            } else {
                                return b.date - a.date;
                            }
                        }
                    }
                });
            case FILTERS.TIME:
            default:
                return events.sort((a, b) => b.date - a.date);
        }
    };

    const filteredEvents = (events: Event[]): Event[] => {
        return events.filter((item) => {
            if (!showActiveAlarms && item.type === TYPES.ALARM && item.active) {
                return false;
            }
            if (!showAlarms && item.type === TYPES.ALARM && !item.active) {
                return false;
            }
            if (!showSettings && item.type === TYPES.SETTINGS) {
                return false;
            }
            if (!showSessions && item.type === TYPES.SESSION) {
                return false;
            }
            return true;
        });
    };

    useEffect(() => {
        setList(sortedEvents(list));
    }, [currentSort]);

    // useEffect(() => {
    //     setList(filteredEvents(list));
    // }, [showActiveAlarms, showAlarms, showSettings, showSessions, filteredEvents, list]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit">
                        Complex Bottom Sheet
                    </Typography>
                    <Spacer />
                    <IconButton data-cy="action-menu" color={'inherit'} onClick={() => setShowMenu(true)} edge={'end'}>
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <List data-cy="list-content" disablePadding>
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
                    />
                ))}
            </List>

            {/* Custom/Complex Bottom Sheet Definition */}
            <Drawer
                anchor={'bottom'}
                transitionDuration={250}
                open={showMenu}
                onClose={() => setShowMenu(false)}
                // className={classes.drawer}
                classes={{ paper: classes.paper }}
            >
                <List disablePadding>
                    <ListItem data-cy="btm-sheet-sort" className={classes.sheetListItem}>
                        <Typography variant="body1" gutterBottom>
                            Sort By:
                        </Typography>
                        <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                            <IconToggle
                                iconComponent={<AccessTime />}
                                label={'Time'}
                                onClick={() => setCurrentSort(FILTERS.TIME)}
                                active={currentSort === FILTERS.TIME}
                            />
                            <IconToggle
                                iconComponent={<Info />}
                                label={'Type'}
                                onClick={(): void => setCurrentSort(FILTERS.TYPE)}
                                active={currentSort === FILTERS.TYPE}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem data-cy="btm-sheet-show" className={classes.sheetListItem}>
                        <Typography variant="body1" gutterBottom>
                            Show:
                        </Typography>
                        <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                            <IconToggle
                                iconComponent={<NotificationsActive />}
                                label="Active Alarms"
                                data-cy="active-alarms"
                                onClick={() => setShowActiveAlarms(!showActiveAlarms)}
                                active={showActiveAlarms}
                            />
                            <IconToggle
                                iconComponent={<Notifications />}
                                label={TYPES.ALARM}
                                onClick={() => setShowAlarms(!showAlarms)}
                                active={showAlarms}
                            />
                            <IconToggle
                                iconComponent={<Settings />}
                                label={TYPES.SETTINGS}
                                onClick={() => setShowSettings(!showSettings)}
                                active={showSettings}
                            />
                            <IconToggle
                                iconComponent={<Update />}
                                label={TYPES.SESSION}
                                onClick={() => setShowSessions(!showSessions)}
                                active={showSessions}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <InfoListItem icon={<Close />} title={'Close'} dense onClick={() => setShowMenu(false)} />
                </List>
            </Drawer>
        </div>
    );
};