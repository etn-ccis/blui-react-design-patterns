import React from 'react';
import { Badge, Hidden, IconButton, Toolbar, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles(() => ({
    toolbarGutters: {
        paddingLeft: 16,
        paddingRight: 4,
    },
}));

export const DropdownToolbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar
                expandedHeight={200}
                collapsedHeight={isMobile ? 56 : 64}
                scrollThreshold={136}
                animationDuration={300}
                variant={'snap'}
            >
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            color={'inherit'}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Spacer />
                    
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton color={'inherit'}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <Badge color="error" badgeContent={88}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={{ height: '2000px' }}></div>
        </div>
    );
};
