import React from 'react';
import { Badge, Hidden, IconButton, Toolbar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, Spacer, ThreeLiner } from '@pxblue/react-components';

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
            top: 64,
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
            fontWeight: 400,
            marginTop: '-0.25rem',
        },
    },
    toolbarGutters: {
        paddingLeft: 16,
        paddingRight: 4,
    },
    backgroundGradient: {
        backgroundImage: `${linearGradientOverlayImage}`,
        backgroundSize: 'unset',
        backgroundPosition: 'center',
    },
}));

export const Collapsible = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar
                expandedHeight={200}
                collapsedHeight={64}
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
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton color={'inherit'} edge={'start'}>
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
            <div style={{ height: '80vh' }}></div>
        </div>
    );
};
