import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { Menu as MenuIcon } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@brightlayer-ui/react-components';

import './index.css';
import makeStyles from '@mui/styles/makeStyles';

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
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.paper,
                minHeight: '100vh',
            }}
        >
            <AppBar data-cy="blui-toolbar" position="sticky" classes={{ root: classes.appbarRoot }}>
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
                    <Typography variant="h6" color="inherit">
                        Responsive Table
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="body1" color="inherit" style={{ textAlign: 'center', padding: '1.5rem 0 0.5rem' }}>
                Resize your browser to view responsiveness
            </Typography>
            {sm ? null : (
                <List disablePadding component="nav">
                    {list.map(
                        (item, i): JSX.Element => (
                            <InfoListItem hidePadding key={i} title={item.name} subtitle={item.description} />
                        )
                    )}
                </List>
            )}
            {smDown ? null : (
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
            )}
        </div>
    );
};
