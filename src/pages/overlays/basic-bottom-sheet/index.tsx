import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    Drawer,
    useMediaQuery,
    Avatar,
    useTheme,
    Theme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { MoreVert, NotificationsActive, Notifications, Done, GetApp, Close } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import * as colors from '@brightlayer-ui/colors';
import alarms, { formatDate, Alarm } from './alarmData';
import { InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
        paper: {
            width: '100%',
            maxWidth: 600,
            margin: 'auto',
            userSelect: 'none',
            cursor: 'pointer',
        },
        active: {},
        avatar: {
            color: theme.palette.text.primary,
            background: 'transparent',
            '&$active': {
                color: colors.white[50],
                background: theme.palette.error.main,
            },
        },
    })
);

export const BasicBottomSheet = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Basic Bottom Sheet
                    </Typography>
                    <Spacer />
                    <IconButton
                        data-cy="toolbar-action-menu"
                        color={'inherit'}
                        edge={'end'}
                        onClick={(): void => setShowMenu(true)}
                        size="large"
                    >
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List disablePadding>
                {alarms.map((alarm: Alarm, i: number) => (
                    <InfoListItem
                        key={`alarm_${i}`}
                        statusColor={alarm.active ? theme.palette.error.main : 'inherit'}
                        title={`${alarm.active ? 'ACTIVE: ' : ''}${alarm.details}`}
                        subtitle={formatDate(alarm.date)}
                        icon={
                            <Avatar className={`${classes.avatar} ${alarm.active ? classes.active : ''}`}>
                                {alarm.active ? <NotificationsActive /> : <Notifications />}
                            </Avatar>
                        }
                    />
                ))}
            </List>
            <Drawer
                data-cy="bottom-sheet"
                anchor={'bottom'}
                transitionDuration={250}
                open={showMenu}
                onClose={(): void => setShowMenu(false)}
                classes={{ paper: classes.paper }}
            >
                <List disablePadding>
                    <InfoListItem
                        data-cy="ack"
                        dense
                        onClick={(): void => setShowMenu(false)}
                        icon={<Done />}
                        title={'Acknowledge All'}
                    />
                    <InfoListItem
                        data-cy="export"
                        dense
                        onClick={(): void => setShowMenu(false)}
                        icon={<GetApp />}
                        title={'Export'}
                    />
                    <InfoListItem
                        data-cy="cancel"
                        dense
                        onClick={(): void => setShowMenu(false)}
                        icon={<Close />}
                        title={'Cancel'}
                    />
                </List>
            </Drawer>
        </div>
    );
};
