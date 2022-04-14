import React, { useCallback, useState } from 'react';
import { AppBar, Avatar, Badge, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { AccountCircle, Apps, ExitToApp, LockOpen, Settings, VpnKey } from '@mui/icons-material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Spacer, UserMenu } from '@brightlayer-ui/react-components';
import { Chip } from './Chip';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@brightlayer-ui/colors';

const avatarImage = require('../../../assets/avatar_40.png');
const menuGroupItems = [
    {
        items: [
            {
                title: 'Change Password',
                icon: <VpnKey />,
                onClick: (): void => {},
            },
            {
                title: 'Preferences',
                icon: <Settings />,
                onClick: (): void => {},
            },
            {
                title: 'Log Out',
                icon: <ExitToApp />,
                onClick: (): void => {},
            },
        ],
    },
];
const avatarTitle = 'Chima Thabani';
const avatarSubtitile = 'CThabani@example.com';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    appBarContainer: {
        maxWidth: 960,
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}`,
    },
    appBar: {
        marginBottom: theme.spacing(3),
        '&:last-child': {
            marginBottom: 0,
        },
    },
    appBarHeader: {
        maxWidth: 600,
        margin: `${theme.spacing(5)} auto ${theme.spacing(3)}`,
        [theme.breakpoints.down('lg')]: {
            padding: `0 ${theme.spacing(2)}`,
        },
    },
    badge: {
        backgroundColor: colors.green[500],
        color: colors.green[500],
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    paper: {
        marginTop: theme.spacing(1),
    },
    subtitle: {
        marginTop: theme.spacing(-0.5),
    },
    textContainer: {
        marginLeft: theme.spacing(2.5),
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
}));

export const InAnAppBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [chipToggled, setChipToggled] = useState(false);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const toggleChip = useCallback((): void => {
        setChipToggled((oldValue) => !oldValue);
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="toolbar" position={'sticky'}>
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
                        In an App Bar
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div>
                <div className={classes.appBarHeader}>
                    <Typography variant={'body1'}>
                        Click on each avatar to see the account menu. Resize the screen to view the account menu / user
                        menu rendered responsively.
                    </Typography>
                </div>
                <div className={classes.appBarContainer}>
                    {/* Generic Icon Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'} size="large">
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Generic Icon Avatar
                                </Typography>
                                <Typography variant={'body1'} className={classes.subtitle} noWrap>
                                    Shared / Anonymous Account / Unauthenticated
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar />}
                                data-cy={'generic-avatar-menu'}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Log In',
                                                icon: <LockOpen />,
                                                onClick: (): void => {},
                                            },
                                            {
                                                title: 'Register',
                                                icon: <Apps />,
                                                onClick: (): void => {},
                                            },
                                            {
                                                title: 'About',
                                                icon: <InfoIcon />,
                                                onClick: (): void => {},
                                            },
                                        ],
                                    },
                                ]}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                                onOpen={(): void => {}}
                                onClose={(): void => {}}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Basic Letter Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'} size="large">
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Basic Letter Avatar
                                </Typography>
                                <Typography variant={'body1'} className={classes.subtitle} noWrap>
                                    Showing User’s Initials
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar>CT</Avatar>}
                                menuGroups={menuGroupItems}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                                onOpen={(): void => {}}
                                onClose={(): void => {}}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Image Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'} size="large">
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Image Avatar
                                </Typography>
                                <Typography variant={'body1'} className={classes.subtitle} noWrap>
                                    Showing A Custom Profile Picture
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar alt="Chima Thabani" src={avatarImage} />}
                                menuGroups={menuGroupItems}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                                onOpen={(): void => {}}
                                onClose={(): void => {}}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Status Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'} size="large">
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Status Avatar
                                </Typography>
                                <Typography variant={'body1'} className={classes.subtitle} noWrap>
                                    Avatar with Status Indicator
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                        classes={{ dot: classes.badge }}
                                    >
                                        {<Avatar alt="Chima Thabani" src={avatarImage} />}
                                    </Badge>
                                }
                                menuGroups={menuGroupItems}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                                onOpen={(): void => {}}
                                onClose={(): void => {}}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Text Menu Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} size="large">
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Text Menu
                                </Typography>
                                <Typography variant={'body1'} className={classes.subtitle} noWrap>
                                    Calling Out the User Name
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                onClick={toggleChip}
                                avatar={
                                    <Chip
                                        variant="outlined"
                                        icon={<AccountCircle style={{ color: colors.gray[500], marginLeft: '4px' }} />}
                                        label="Admin"
                                        rightIcon={
                                            chipToggled ? (
                                                <ExpandLessIcon fontSize={'small'} />
                                            ) : (
                                                <ExpandMoreOutlinedIcon fontSize={'small'} />
                                            )
                                        }
                                        highlight={chipToggled}
                                    />
                                }
                                menuGroups={menuGroupItems}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                                onOpen={(): void => {}}
                                onClose={(): void => {}}
                            />
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        </div>
    );
};
