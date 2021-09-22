import React from 'react';
import {
    AppBar,
    Button,
    Checkbox,
    FormControlLabel,
    Hidden,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@pxblue/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    tableBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableContainer: {
        overflow: 'auto',
        maxWidth: '800px',
        width: '100%',
        padding: `${theme.spacing(2)}px`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            padding: 0,
        },
    },
    deleteRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: `${theme.spacing(2)}px`,
    },
    deleteBtn: {
        color: theme.palette.error.main,
        border: `1px solid ${theme.palette.error.main}`
    },
    noteText: {
        color: colors.gray[500],
        marginTop: `${theme.spacing(3)}px`,
    },
    toolbarGutters: {
        paddingLeft: 16,
        paddingRight: 4,
    },
    checkboxCell: {
        padding: `0 0 0 ${theme.spacing(2.5)}px`,
        minWidth: '72px',
    },
    dataCell: {
        minWidth: '150px',
    },
    contextualTableRow: {
        backgroundColor: colors.white[50],
    },
    sticky: {
        position: "sticky",
        left: 0,
        background: colors.white[50],
    }
}));

const createData = (name: string, ip: string): any => ({ name, ip });

const rows = [createData('Device 01', '192.168.0.1'), createData('Device 02', '192.168.0.1'), createData('Device 03', '192.168.0.1'), createData('Device 04', '192.168.0.1')];

export const ContextualAction = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    const getTable = (): JSX.Element => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={clsx(classes.checkboxCell, classes.sticky)}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        name="checkbox-header-cell"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label=""
                            />
                        </TableCell>
                        <TableCell className={classes.dataCell}>Name</TableCell>
                        <TableCell className={classes.dataCell}>IP Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} hover={false} classes={{ root: classes.contextualTableRow }}>
                            <TableCell component="th" scope="row" className={clsx(classes.checkboxCell, classes.sticky)}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={true}
                                            name="checkbox-cell"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label=""
                                />
                            </TableCell>
                            <TableCell className={classes.dataCell}>
                                {row.name}
                            </TableCell>
                            <TableCell className={classes.dataCell}>
                                {row.ip}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                        Contextual App Bar
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <div className={classes.tableBody}>
                    <div className={classes.tableContainer}>
                        <Hidden smDown={true}>
                            <div className={classes.deleteRow}>
                                <Typography variant={'caption'} color={'inherit'}>
                                    0 selected item(s)
                                </Typography>
                                <Button
                                    data-cy={'delete-btn'}
                                    variant={'outlined'}
                                    className={classes.deleteBtn}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete selected items
                                </Button>
                            </div>
                        </Hidden>
                        <div>
                            {getTable()}
                        </div>
                        <Hidden smDown={true}>
                            <Typography variant="body2" className={classes.noteText}>
                                The contextual app bar is for mobile only.
                            </Typography>
                        </Hidden>
                    </div>
                </div>
            </div>
        </div>
    );
};
