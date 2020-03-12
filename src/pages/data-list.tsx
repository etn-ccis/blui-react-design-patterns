import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

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

export const ListValues = (): JSX.Element => {
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
                    <Typography variant="h6" color="inherit">
                        Key Value List
                    </Typography>
                </Toolbar>
            </AppBar>
            {list.length < 1}
            <List style={{ paddingTop: '0px' }} component="nav">
                {list.map((item: { key: string | number | undefined; value: React.ReactNode }) => (
                    <ListItem key={item.key} style={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItemText style={{ flex: '1' }} primary={unCamelCase(item.key)}></ListItemText>
                        <ListItemText
                            style={{ flex: '1', textAlign: 'end' }}
                            className="lastColumn"
                            secondary={item.value}
                        ></ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
