import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, List, Drawer, Hidden, makeStyles, createStyles, Avatar } from "@material-ui/core";
import { MoreVert, NotificationsActive, Notifications, Done, GetApp, Close } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import * as colors from '@pxblue/colors';
import alarms, { formatDate, Alarm } from './alarmData';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: '100%',
      maxWidth: 600,
      margin: 'auto',
      userSelect: 'none',
      cursor: 'pointer'
    },
    active: {},
    avatar: {
      color: colors.black[500],
      background: 'transparent',
      '&$active': {
        color: colors.white[50],
        background: colors.red[500]
      }
    },
  })
);

export const BottomSheet = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Hidden mdUp={true}>
            <IconButton
              color={'inherit'}
              onClick={(): void => {
                dispatch({ type: TOGGLE_DRAWER, payload: true });
              }}
              edge={'start'}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" color="inherit">
            Basic Bottom Sheet
          </Typography>
          <Spacer />
          <IconButton color="inherit" edge={'end'} onClick={(): void => setShowMenu(true)}>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {
          alarms.map((alarm: Alarm, i: number) => (
            <InfoListItem
              key={`alarm_${i}`}
              statusColor={alarm.active ? colors.red[500] : 'inherit'}
              title={`${alarm.active ? 'ACTIVE: ' : ''}${alarm.details}`}
              subtitle={formatDate(alarm.date)}
              icon={<Avatar className={`${classes.avatar} ${alarm.active ? classes.active : ''}`}>
                {alarm.active ? <NotificationsActive /> : <Notifications />}
              </Avatar>}
            />
          )
          )}
      </List>
      <Drawer
        anchor={'bottom'}
        transitionDuration={250}
        open={showMenu}
        onClose={(): void => setShowMenu(false)}
        classes={{ paper: classes.paper }}
      >
        <List disablePadding>
          <InfoListItem
            dense
            onClick={(): void => setShowMenu(false)}
            icon={<Done />}
            title={'Acknowledge All'}
          />
          <InfoListItem
            dense
            onClick={(): void => setShowMenu(false)}
            icon={<GetApp />}
            title={'Export'}
          />
          <InfoListItem
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
