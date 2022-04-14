import React from 'react';
import { Avatar, IconButton, Typography, Theme, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Dashboard, Notifications, ExitToApp, Settings, VpnKey } from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerNavGroup,
    DrawerLayout,
    NavItem,
    Spacer,
} from '@brightlayer-ui/react-components';
import CloseIcon from '@mui/icons-material/Close';
import { Device } from '@brightlayer-ui/icons-mui';

const backgroundImage = require('../../../assets/cubes_tile.png');
const linearGradientOverlayImage = `linear-gradient(to right, rgba(0, 123, 193, 1) 22.4%, rgba(0, 123, 193, 0.2) 100%), url(${backgroundImage})`;

const useStyles = makeStyles((theme: Theme) => ({
    avatarSize: {
        height: '48px',
        width: '48px',
    },
    backgroundGradient: {
        backgroundImage: `${linearGradientOverlayImage}`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
    },
    closeIcon: {
        marginRight: theme.spacing(-2),
        marginTop: theme.spacing(-4),
    },
    extendedHeader: {
        width: '100%',
        padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(0.5)}`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    headerDetails: {
        paddingTop: theme.spacing(2),
        position: 'relative',
    },
    subtitle: {
        marginTop: theme.spacing(-0.5),
    },
}));

type DrawerProps = {
    open: boolean;
    toggleDrawer: () => void;
};

const avatarImage = require('../../../assets/avatar_40.png');

export const BluiDrawer = (props: DrawerProps): JSX.Element => {
    const { open, toggleDrawer } = props;
    const theme = useTheme();
    const classes = useStyles(theme);
    const variant = 'temporary';
    const selected = '1';

    const navGroupItems1: NavItem[] = [
        {
            title: 'Dashboard',
            itemID: '1',
            icon: <Dashboard />,
            onClick: (): void => toggleDrawer(),
        },
        {
            title: 'Notifications',
            itemID: '2',
            icon: <Notifications />,
            onClick: (): void => toggleDrawer(),
        },
        {
            title: 'Locations',
            itemID: '3',
            icon: <LocationOnIcon />,
            onClick: (): void => toggleDrawer(),
        },
        {
            title: 'Analytics',
            itemID: '4',
            icon: <AssessmentIcon />,
            onClick: (): void => toggleDrawer(),
        },
        {
            title: 'Assets',
            itemID: '5',
            icon: <Device />,
            onClick: (): void => toggleDrawer(),
        },
    ];

    const navGroupItems2: NavItem[] = [
        {
            title: 'Change Password',
            itemID: '6',
            onClick: (): void => toggleDrawer(),
            icon: <VpnKey />,
        },
        {
            title: 'Preferences',
            itemID: '7',
            onClick: (): void => toggleDrawer(),
            icon: <Settings />,
        },
        {
            title: 'Logout',
            itemID: '8',
            onClick: (): void => toggleDrawer(),
            icon: <ExitToApp />,
        },
    ];

    const DrawerHeaderContent = (): JSX.Element => (
        <div className={classes.extendedHeader}>
            <div className={classes.header}>
                <Avatar alt="Chima Thabani" src={avatarImage} classes={{ root: classes.avatarSize }} />
                <IconButton
                    data-cy="toolbar-menu"
                    color={'inherit'}
                    edge={'end'}
                    classes={{ edgeEnd: classes.closeIcon }}
                    onClick={toggleDrawer}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.headerDetails}>
                <Typography variant={'h6'}>Chima Thabani</Typography>
                <Typography variant={'body1'} className={classes.subtitle}>
                    CThabani@example.com
                </Typography>
            </div>
        </div>
    );
    return (
        <DrawerLayout
            drawer={
                <Drawer
                    open={open}
                    width={292}
                    variant={variant}
                    condensed={false}
                    ModalProps={{
                        onBackdropClick: toggleDrawer,
                    }}
                    activeItem={selected}
                    activeItemBackgroundShape={'round'}
                >
                    <DrawerHeader
                        backgroundImage={backgroundImage}
                        classes={{ background: classes.backgroundGradient }}
                        backgroundOpacity={0.5}
                        titleContent={<DrawerHeaderContent />}
                        data-cy={'drawer-header'}
                    />
                    <DrawerBody>
                        <DrawerNavGroup items={navGroupItems1} />
                        <Spacer />
                        <DrawerNavGroup hidePadding title={'My Account'} items={navGroupItems2} />
                    </DrawerBody>
                </Drawer>
            }
        ></DrawerLayout>
    );
};
