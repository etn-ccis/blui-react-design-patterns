import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Hidden } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';

export function unCamelCase(val: any): any {
    return val
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        .replace(/^./, (str: string) => str.toUpperCase());
}
export function ObjectToList(obj: any): any {
    const list = [];
    for (const key in obj) {
        list.push({ key: key, value: obj[key] });
    }
    return list;
}

export const DataList = (): JSX.Element => {
    const dispatch = useDispatch();
    const items = {
        georgeWashington: 1789,
        johnAdams: 1796,
        thomasJefferson: 1800,
        jamesMadison: 1808,
        jamesMonroe: 1812,
    };

    const list = ObjectToList(items);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Hidden mdUp={true}>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '-12px',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit">
                        Data List
                    </Typography>
                </Toolbar>
            </AppBar>
            <List style={{ paddingTop: '0px' }} component="nav">
                {list.map((item: { key: string | number | undefined; value: React.ReactNode }) => (
                    <ListItem key={item.key} style={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItemText style={{ flex: '1' }} primary={unCamelCase(item.key)}></ListItemText>
                        <ListItemText
                            style={{ flex: '1', textAlign: 'end' }}
                            secondary={item.value}
                        ></ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
