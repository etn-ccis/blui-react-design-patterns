import React from 'react';
import { AppBar, Avatar, Badge, Hidden, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Spacer, UserMenu } from '@pxblue/react-components';
import { Email, Settings, VpnKey } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@pxblue/colors';
const avatarImage = require('../../../assets/avatar_40.png').default;

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    appBarContainer: {
        maxWidth: 960,
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}px`,
    },
    appBar: {
        marginBottom: `${theme.spacing(3)}px`,
        '&:last-child': {
            marginBottom: 0,
        },
    },
    appBarHeader: {
        maxWidth: 600,
        margin: `${theme.spacing(5)}px auto ${theme.spacing(3)}px`,
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    },
    badge: {
        backgroundColor: colors.green[500],
        color: colors.green[500],
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    iconButton: {
        paddingLeft: `${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(4)}px`,
    },
    subtitle: {
        [theme.breakpoints.down('md')]: {
            width: '192px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
    }
}));

export const InAnAppBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        In an App Bar
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div>
                <div className={classes.appBarHeader}>
                    <Typography variant={'body1'} color="inherit">
                        Click on each avatar to see the account menu. Resize the screen to view the account menu / user menu rendered responsively.
                    </Typography>
                </div>
                <div className={classes.appBarContainer}>
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} className={classes.iconButton}>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <Typography variant={'h6'} color={'inherit'}>
                                    Generic Icon Avatar
                                </Typography>
                                <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                                    Shared / Anonymous Account
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar />}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Log In',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'Register',
                                                icon: <Email />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <Email />,
                                            }
                                        ],
                                    },
                                ]}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Second Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} className={classes.iconButton}>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <Typography variant={'h6'} color={'inherit'}>
                                    Basic Letter Avatar
                                </Typography>
                                <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                                    Showing User’s Initials
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar>CT</Avatar>}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Change Password',
                                                icon: <VpnKey />,
                                            },
                                            {
                                                title: 'Preferences',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <Email />,
                                            }
                                        ],
                                    },
                                ]}
                                menuTitle='Chima Thabani'
                                menuSubtitle='CThabani@example.com'
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Third Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} className={classes.iconButton}>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <Typography variant={'h6'} color={'inherit'}>
                                    Image Avatar
                                </Typography>
                                <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                                    Showing A Custom Profile Picture
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar alt="Chima Thabani" src={avatarImage} />}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Change Password',
                                                icon: <VpnKey />,
                                            },
                                            {
                                                title: 'Preferences',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <Email />,
                                            }
                                        ],
                                    },
                                ]}
                                menuTitle='Chima Thabani'
                                menuSubtitle='CThabani@example.com'
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Fourth Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} className={classes.iconButton}>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <Typography variant={'h6'} color={'inherit'}>
                                    Status Avatar
                                </Typography>
                                <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
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
                                        classes={{ dot: classes.badge }}>
                                        {<Avatar alt="Chima Thabani" src={avatarImage} />}
                                    </Badge>
                                }
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Change Password',
                                                icon: <VpnKey />,
                                            },
                                            {
                                                title: 'Preferences',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <Email />,
                                            }
                                        ],
                                    },
                                ]}
                                menuTitle='Chima Thabani'
                                menuSubtitle='CThabani@example.com'
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Fifth Example */}
                    {/* <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'} className={classes.iconButton}>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <Typography variant={'h6'} color={'inherit'}>
                                    Text Menu
                                </Typography>
                                <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                                    Calling Out the User Name
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        icon={<AccountCircle />}
                                        label="Admin"
                                    />
                                }
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Change Password',
                                                icon: <VpnKey />,
                                            },
                                            {
                                                title: 'Preferences',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <Email />,
                                            }
                                        ],
                                    },
                                ]}
                                menuTitle='Chima Thabani'
                                menuSubtitle='CThabani@example.com'
                            />
                        </Toolbar>
                    </AppBar> */}
                </div>
            </div>
        </div>
    );
};
