import React from 'react';
import { AppBar, Toolbar, Typography, List, Hidden, IconButton, useTheme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import WarningIcon from '@material-ui/icons/Warning';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag, InfoListItemProps } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';

const createInfoListItemConfig = (index: number, randomStatus: string, tag?: boolean): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <NotificationIcon />,
                iconColor: tag ? colors.white[50] : colors.red[500],
                statusColor: tag ? colors.red[500] : 'transparent',
                rightComponent: tag ? <ListItemTag label={'new'} backgroundColor={colors.red[500]} /> : undefined,
            };
        case 'warning':
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <WarningIcon />,
                iconColor: colors.orange[500],
            };
        case 'normal':
        default:
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
            };
    }
};

const createRandomItem = (): InfoListItemProps => {
    const int = parseInt(`${Math.random() * 100}`, 10);
    switch (Math.floor(Math.random() * 5)) {
        case 0:
            return createInfoListItemConfig(int, 'alarm');
        case 1:
            return createInfoListItemConfig(int, 'alarm', true);
        case 2:
            return createInfoListItemConfig(int, 'warning');
        default:
            return createInfoListItemConfig(int, 'normal');
    }
};

const list: InfoListItemProps[] = [];

for (let i = 0; i < 20; i++) {
    list.push(createRandomItem());
}

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
                <Toolbar>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Status List
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <List className={'list'} disablePadding>
                {list.map((item, i) => (
                    <InfoListItem
                        iconColor={theme.palette.text.primary}
                        statusColor={'transparent'}
                        key={i}
                        avatar
                        divider={'partial'}
                        {...item}
                    />
                ))}
            </List>
        </div>
    );
};
