import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, Hidden, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';

export type ListItem = {
    id: number;
    name: string;
    details: string;
    status: string;
};

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();

    const createItem = (index: number, randomStatus: string): ListItem => ({
        id: index,
        name: `Item ${index}`,
        details: `Status: ${randomStatus}`,
        status: randomStatus,
    });

    const createRandomItem = (): ListItem => {
        const int = parseInt(`${Math.random() * 100}`, 10);
        const randomStatus = Math.random() >= 0.3 ? 'normal' : 'alarm';
        return createItem(int, randomStatus);
    };

    const list: ListItem[] = [];

    for (let i = 0; i < 10; i++) {
        list.push(createRandomItem());
    }

    return (
        <div>
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
            <List className="list" style={{ padding: 0 }}>
                {list.map((item, i) => (
                    <InfoListItem
                        key={`item_${i}`}
                        icon={<HomeIcon />}
                        iconColor={colors.black[500]}
                        title={item.name}
                        subtitle={item.details}
                        statusColor={item.status === 'alarm' ? colors.red[500] : 'transparent'}
                    />
                ))}
            </List>
        </div>
    );
};
