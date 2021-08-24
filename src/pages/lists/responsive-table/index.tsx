import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTheme } from '@material-ui/core/styles';

import { Menu as MenuIcon } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';

import './index.css';
import { makeStyles } from '@material-ui/core';

export type Item = {
    id: number;
    name: string;
    description: string;
};

const useStyles = makeStyles(() => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
}));

const generateRandomItem = (): Item[] => {
    const listOfItems = [];
    for (let i = 0; i < 10; i++) {
        const index = Math.ceil(Math.random() * 100);
        listOfItems.push({
            id: index,
            name: `Item ${index}`,
            description: `Item ${index} occured`,
        });
    }
    return listOfItems;
};

const list = generateRandomItem();

export const ResponsiveTable = (): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.paper,
                minHeight: '100vh',
            }}
        >
            <AppBar data-cy="pxb-toolbar" position="sticky" classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
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
                    <Typography variant="h6" color="inherit">
                        Responsive Table
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="body1" color="inherit" style={{ textAlign: 'center', padding: '1.5rem 0 0.5rem' }}>
                Resize your browser to view responsiveness
            </Typography>
            <Hidden smUp>
                <List disablePadding component="nav">
                    {list.map(
                        (item, i): JSX.Element => (
                            <InfoListItem hidePadding key={i} title={item.name} subtitle={item.description} />
                        )
                    )}
                </List>
            </Hidden>
            <Hidden xsDown>
                <Table id="responsive-list-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(
                            (item, i): JSX.Element => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">{item.description}</TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </Hidden>
        </div>
    );
};
