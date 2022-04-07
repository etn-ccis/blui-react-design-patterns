import React from 'react';
import { Badge, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Spacer, ThreeLiner } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { getBodyFiller } from '../utils/utils';

const backgroundImage = require('../../../assets/collapsible_app_bar_demo.jpg');
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
        [theme.breakpoints.down('md')]: {
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
    bodyContent: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}`,
    },
    toolbarRightContent: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

export const Collapsible = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
                    {md ? null : (
                        <IconButton
                            data-cy="toolbar-menu"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            color={'inherit'}
                            edge={'start'}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Spacer />
                    <ThreeLiner
                        classes={{ title: classes.title, subtitle: classes.subtitle, info: classes.info }}
                        className={classes.liner}
                        title={'Timeline'}
                        subtitle={'Online'}
                        info={'Gary Steel Works'}
                        animationDuration={300}
                    />
                    <div className={classes.toolbarRightContent}>
                        <IconButton color={'inherit'} size="large">
                            <HelpIcon />
                        </IconButton>
                        <IconButton color={'inherit'} size="large">
                            <Badge color="error" badgeContent={88}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color={'inherit'} size="large">
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.bodyContent} id={'page-body'}>
                {getBodyFiller()}
            </div>
        </div>
    );
};
