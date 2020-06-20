import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, Hidden, IconButton, useTheme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import WarningIcon from '@material-ui/icons/Warning';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';

export type ListItem = {
    id: number;
    name: string;
    details: string;
    status: string;
    tag?: string;
};

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const createItem = (index: number, randomStatus: string, tag?: boolean): ListItem => ({
        id: index,
        name: `Item ${index}`,
        details: `Status: ${randomStatus}`,
        status: randomStatus,
        tag: tag ? `new` : undefined,
    });

    const createRandomItem = (): ListItem => {
        const int = parseInt(`${Math.random() * 100}`, 10);
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                return createItem(int, 'alarm');
            case 1:
                return createItem(int, 'alarm', true);
            case 2:
                return createItem(int, 'warning');
            default:
                return createItem(int, 'normal');
        }
    };

    const list: ListItem[] = [];

    for (let i = 0; i < 20; i++) {
        list.push(createRandomItem());
    }

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Hidden mdUp={true}>
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
                    <Typography variant="h6" color="inherit">
                        Status List
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <List className="list" disablePadding>
                {list.map((item, i) => {
                    switch (item.status) {
                        case 'alarm':
                            if (item.tag) {
                                return (
                                    <InfoListItem
                                        key={`item_${i}`}
                                        icon={<NotificationIcon />}
                                        iconColor={colors.white[50]}
                                        title={item.name}
                                        subtitle={item.details}
                                        avatar
                                        statusColor={colors.red[500]}
                                        rightComponent={
                                            <ListItemTag label={item.tag} backgroundColor={colors.red[500]} />
                                        }
                                        divider={'partial'}
                                    />
                                );
                            }
                            return (
                                <InfoListItem
                                    key={`item_${i}`}
                                    icon={<NotificationIcon />}
                                    iconColor={colors.red[500]}
                                    title={item.name}
                                    subtitle={item.details}
                                    avatar
                                    statusColor={'transparent'}
                                    divider={'partial'}
                                />
                            );
                        case 'warning':
                            return (
                                <InfoListItem
                                    key={`item_${i}`}
                                    icon={<WarningIcon />}
                                    iconColor={colors.orange[500]}
                                    title={item.name}
                                    subtitle={item.details}
                                    avatar
                                    statusColor={'transparent'}
                                    divider={'partial'}
                                />
                            );
                        default:
                            return (
                                <InfoListItem
                                    key={`item_${i}`}
                                    icon={<HomeIcon />}
                                    iconColor={theme.palette.text.primary}
                                    title={item.name}
                                    subtitle={item.details}
                                    avatar
                                    statusColor={'transparent'}
                                    divider={'partial'}
                                />
                            );
                    }
                })}
            </List>
        </div>
    );
};
