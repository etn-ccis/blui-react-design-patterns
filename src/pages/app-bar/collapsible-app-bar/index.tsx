import React, { useState, useEffect, useCallback } from 'react';

import { Typography, List, Toolbar, IconButton, AppBar, Hidden, makeStyles, Theme, useTheme } from '@material-ui/core';
import { Person as PersonIcon, Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { listItems } from './list';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';

const MAX_APP_BAR_HEIGHT = 128; // Specified by Material Design

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    banner: {
        // IE 11 does not support background blend mode. To see the image, you need to reverse the order of the image and gradient in the background property below.
        background:
            'linear-gradient(rgba(0, 123, 193, 1), rgba(0, 75, 158, 1)), url(https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundBlendMode: 'soft-light',
        minHeight: MAX_APP_BAR_HEIGHT,
        color: '#fff',
        position: 'relative',
    },
    alignTopContent: {
        top: -theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            top: -theme.spacing(7),
        },
    },
    bannerMain: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    content: {
        position: 'absolute',
        left: theme.spacing(9),
        bottom: 28,
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    header: {
        transform: 'translateY(-120%)',
        transition: theme.transitions.create('all', { duration: theme.transitions.duration.standard }),
    },
    top: {
        transform: 'translateY(0)',
    },
    headerTitle: {
        fontWeight: 600,
        lineHeight: '1.6rem',
    },
    headerSubtitle: {
        marginTop: -2,
        fontWeight: 300,
        lineHeight: '1.2rem',
    },
    bannerActionItems: {
        display: 'flex',
        width: '100%',
        minHeight: theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            minHeight: theme.spacing(7),
        },
    },
}));

export const CollapsibleAppBar = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [list] = useState(listItems);
    const [headerActive, setHeaderActive] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const dispatch = useDispatch();

    const styleHeaderAndBanner = useCallback(() => {
        setOpacity(window.pageYOffset);
        if (window.pageYOffset > 70) {
            setHeaderActive(true);
        } else {
            setHeaderActive(false);
        }
    }, [setOpacity, setHeaderActive]);

    // When the page first gets loaded but with a pageYOffset, set the
    // header in the appropriate position.
    useEffect(() => {
        styleHeaderAndBanner();
    }, [styleHeaderAndBanner]);

    return (
        <div
            id={'scroll-area'}
            onWheel={styleHeaderAndBanner}
            style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}
        >
            <AppBar
                className={clsx(classes.header, headerActive && classes.top)}
                data-cy={'app-bar'}
                position={'sticky'}
                classes={{ root: classes.appbarRoot }}
            >
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
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
                    <div>
                        <Typography className={classes.headerTitle} variant={'h6'} color={'inherit'}>
                            President
                        </Typography>
                        <Typography className={classes.headerSubtitle} variant={'subtitle1'} color={'inherit'}>
                            Leader of the Free World
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={clsx(classes.banner, classes.alignTopContent)}>
                <Toolbar className={classes.bannerMain} data-cy={'banner'} classes={{ gutters: classes.toolbarGutters }}>
                    <div className={classes.bannerActionItems}>
                        <Hidden mdUp>
                            <IconButton
                                data-cy="toolbar-menu"
                                color={'inherit'}
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: true });
                                }}
                                style={{ marginRight: 20, marginLeft: -12 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    </div>
                </Toolbar>
                <div className={classes.content} style={{ opacity: 1 - opacity / MAX_APP_BAR_HEIGHT }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        President
                    </Typography>
                    <Typography variant={'body1'} color={'inherit'}>
                        Commander in Chief
                    </Typography>
                    <Typography variant={'body2'} color={'inherit'}>
                        Leader of the Free World
                    </Typography>
                </div>
            </div>
            <List component={'nav'} className={classes.alignTopContent}>
                {list.map(
                    (item, i): JSX.Element => (
                        <InfoListItem
                            avatar
                            icon={<PersonIcon />}
                            title={item.president}
                            subtitle={item.party}
                            info={item.took_office}
                            key={i}
                            statusColor={'transparent'}
                            iconColor={theme.palette.text.primary}
                        />
                    )
                )}
            </List>
        </div>
    );
};
