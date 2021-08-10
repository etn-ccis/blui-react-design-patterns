import React, { useState } from 'react';
import { Avatar, IconButton, Typography, makeStyles, Theme, useTheme } from '@material-ui/core';
import { Dashboard, Notifications, ExitToApp, Settings, VpnKey} from '@material-ui/icons';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// import {  } from '@material-ui/icons';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, DrawerLayout, DrawerFooter, NavItem } from '@pxblue/react-components';
import CloseIcon from '@material-ui/icons/Close';
import WebAssetIcon from '@material-ui/icons/WebAsset';
// import clsx from 'clsx';

const backgroundImage = require('../../../assets/topology_40.png').default;

const useStyles = makeStyles((theme: Theme) => ({
    closeIcon: {
        marginRight: `-${theme.spacing(2)}px`,
        marginTop: `-${theme.spacing(4)}px`,
    },

    subtitle: {
        marginTop: `-${theme.spacing(0.5)}px`,
    },
}));

type DrawerProps = {
    open: boolean;
    drawerToggler: () => void;
};

const avatarImage = require('../../../assets/avatar_40.png').default;

export const PxbDrawer = (props: DrawerProps): JSX.Element => {
    const { open, drawerToggler } = props;
    const theme = useTheme();
    const classes = useStyles(theme);
    // const [selected, setSelected] = useState('');
    const variant = 'temporary';
    const [selected, setSelected] = useState('1');
    // const isDarkMode = useDarkMode();

    const navGroupItems: NavItem[] = [
        {
            title: 'Dashboard',
            itemID: '1',
            icon: <Dashboard />,
            onClick: (): void => setSelected('1'),
        },
        {
            title: 'Notifications',
            itemID: '2',
            icon: <Notifications />,
            onClick: (): void => setSelected('2'),
        },
        {
            title: 'Locations',
            itemID: '3',
            icon: <LocationOnIcon />,
            onClick: (): void => setSelected('3'),
        },
        {
            title: 'Analytics',
            itemID: '4',
            icon: <AssessmentIcon />,
            onClick: (): void => setSelected('4'),
        },
        {
            title: 'Assets',
            itemID: '5',
            icon: <WebAssetIcon />,
            onClick: (): void => setSelected('5'),
        },
    ];
    return (
        <DrawerLayout
            drawer={
                <Drawer
                    open={open}
                    width={292}
                    variant={variant}
                    condensed={false}
                    ModalProps={{
                        onBackdropClick: drawerToggler,
                    }}
                    activeItem={selected}
                    activeItemBackgroundShape={'round'}
                >
                    <DrawerHeader
                        backgroundImage={backgroundImage}
                        backgroundOpacity={0.5}
                        // icon={<Avatar alt="Chima Thabani" src={avatarImage} />}
                        titleContent={
                            <div style={{width: '100%', padding: '16px 16px 4px'}}>
                                <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    zIndex: 1,
                                    // padding: '0 16px',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div>
                                    <Avatar alt="Chima Thabani" src={avatarImage} />
                                </div>
                                
                                <IconButton
                                    data-cy="toolbar-menu"
                                    color={'inherit'}
                                    edge={'end'}
                                    classes={{ edgeEnd: classes.closeIcon }}
                                    onClick={drawerToggler}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <div style={{paddingTop: '16px'}}>
                                    <Typography variant={'h6'} color={'inherit'}>
                                        Chima Thabani
                                    </Typography>
                                    <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                                        CThabani@example.com
                                    </Typography>
                                </div>
                            </div>
                            
                        }
                    />
                    <DrawerBody>
                        <DrawerNavGroup items={navGroupItems} />
                    </DrawerBody>
                    <DrawerFooter
                    divider={true}
                    >
                    <DrawerNavGroup
                            hidePadding
                            title={'My Account'}
                            items={[
                                {
                                    title: 'Change Password',
                                    itemID: 'change password',
                                    onClick: (): void => {},
                                    icon: <VpnKey />,
                                },
                                {
                                    title: 'Preferences',
                                    itemID: 'preferences',
                                    onClick: (): void => {},
                                    icon: <Settings />,
                                },
                                {
                                    title: 'Logout',
                                    itemID: 'logout',
                                    onClick: (): void => {},
                                    icon: <ExitToApp />,
                                },
                            ]}
                        />
                    </DrawerFooter>
                </Drawer>
            }
        >
        </DrawerLayout>
    );
};
