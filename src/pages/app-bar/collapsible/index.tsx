import React from 'react';
import { Badge, Hidden, IconButton, Toolbar, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, Spacer, ThreeLiner } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const backgroundImage = require('../../../assets/collapsible_app_bar_demo.jpg').default;
const linearGradientOverlayImage = `linear-gradient(to bottom, rgba(0, 123, 193, 1) 22.4%, rgba(0, 123, 193, 0.2) 100%), url(${backgroundImage})`;

const useStyles = makeStyles((theme: Theme) => ({
    title: {},
    subtitle: {},
    info: {},
    liner: {
        top: 0,
        position: 'absolute',
        flexGrow: 1,
        marginLeft: 0,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 56,
        },
    },
    expanded: {
        '& $liner': {
            top: 80,
        },
    },
    collapsed: {
        '& $title': {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        '& $subtitle': {
            fontSize: 0,
        },
        '& $info': {
            fontSize: '1rem',
            marginTop: '-0.25rem',
            fontWeight: 400,
        },
        '& $backgroundGradient': {
            backgroundImage: 'none',
        },
    },
    toolbarGutters: {
        paddingLeft: 16,
        paddingRight: 4,
    },
    backgroundGradient: {
        backgroundImage: `${linearGradientOverlayImage}`,
        backgroundPosition: 'center',
    },
}));

export const Collapsible = (): JSX.Element => {
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
                backgroundImage={backgroundImage}
                variant={'snap'}
                classes={{
                    collapsed: classes.collapsed,
                    expanded: classes.expanded,
                    background: classes.backgroundGradient,
                }}
            >
                <Toolbar data-cy={'toolbar'} classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
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
                    <ThreeLiner
                        classes={{ title: classes.title, subtitle: classes.subtitle, info: classes.info }}
                        className={classes.liner}
                        title={'Timeline'}
                        subtitle={'Online'}
                        info={'Gary Steel Works'}
                        animationDuration={300}
                    />
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
