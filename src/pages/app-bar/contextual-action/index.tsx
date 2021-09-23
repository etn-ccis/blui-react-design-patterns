import React, { useCallback, useState } from 'react';
import {
    AppBar,
    Button,
    Checkbox,
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
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@pxblue/colors';
import clsx from 'clsx';

export type ListItemType = {
    id: number;
    name: string;
    ip: string;
    checked: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    appbar: {
        transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter }),
    },
    appbarRoot: {
        padding: 0,
    },
    contextualAppBar: {
        backgroundColor: colors.black[500],
        color: colors.white[50],
        right: 0,
        width: 0,
        opacity: 0,
        '&$contextualBarActive': {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                opacity: 1,
            },
        },
    },
    contextualBarActive: {},
    checkboxCell: {
        padding: `0 0 0 ${theme.spacing(1)}px`,
        minWidth: '56px',
        [theme.breakpoints.down('sm')]: {
            padding: `0 0 0 ${theme.spacing(1)}px`,
        },
    },
    checkboxIndeterminate: {
        color: theme.palette.primary.main,
    },
    contextualTableRow: {
        backgroundColor: colors.white[50],
    },
    dataCell: {
        minWidth: '150px',
    },
    deleteBtn: {
        color: theme.palette.error.main,
        border: `1px solid ${theme.palette.error.main}`,
    },
    deleteRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: `${theme.spacing(2)}px`,
    },
    noResult: {
        padding: `${theme.spacing(2)}px`,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    noteText: {
        color: theme.palette.text.secondary,
        marginTop: `${theme.spacing(3)}px`,
    },
    resetTableLink: {
        textDecoration: 'underline',
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    rowSelected: {
        backgroundColor: `rgba(${theme.palette.primary.main}, 0.05)`,
    },
    sticky: {
        position: 'sticky',
        left: 0,
    },
    secondaryToolbar: {
        padding: `0 ${theme.spacing(2)}px`,
    },
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
    toolbarGutters: {
        paddingLeft: 16,
        paddingRight: 4,
    },
}));

const createItem = (index: number, ip: string): ListItemType => ({
    id: index,
    name: `Device 0${index}`,
    ip: ip,
    checked: false,
});

const generatedList: ListItemType[] = [];

for (let i = 1; i < 5; i++) {
    generatedList.push(createItem(i, '192.168.0.1'));
}

export const ContextualAction = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const [list, setList] = useState<ListItemType[]>(generatedList);
    const [selectedItems, setSelectedItems] = useState<ListItemType[]>([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const onSelect = useCallback(
        (item: ListItemType): void => {
            if (!selectedItems.includes(item)) {
                setSelectedItems([...selectedItems, item]);
            } else {
                const index = selectedItems.indexOf(item);
                setSelectedItems(selectedItems.filter((_: ListItemType, i: number) => i !== index));
            }
        },
        [selectedItems]
    );

    const isSelected = useCallback((item: ListItemType): boolean => selectedItems.includes(item), [selectedItems]);

    const onDelete = useCallback((): void => {
        const updatedList = [...list];

        selectedItems.forEach((item: ListItemType) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        setList(updatedList);
        setSelectedItems([]);
    }, [list, selectedItems]);

    const resetTable = useCallback((): void => {
        setList(list);
    }, []);

    const onClose = useCallback((): void => {
        setSelectedItems([]);
    }, []);

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            const newSelectedItems = list.map((item) => item);
            setSelectedItems(newSelectedItems);
            return;
        }
        setSelectedItems([]);
    };

    const getTable = (): JSX.Element => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" className={clsx(classes.checkboxCell, classes.sticky)}>
                            <Checkbox
                                classes={{ indeterminate: classes.checkboxIndeterminate }}
                                indeterminate={selectedItems.length > 0 && selectedItems.length < list.length}
                                checked={list.length > 0 && selectedItems.length === list.length}
                                onChange={selectAll}
                                name="checkbox-header-cell"
                                color="primary"
                                size="medium"
                            />
                        </TableCell>
                        <TableCell className={classes.dataCell}>Name</TableCell>
                        <TableCell className={classes.dataCell}>IP Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row, index) => (
                        <TableRow
                            key={index}
                            hover={false}
                            classes={{ root: classes.contextualTableRow, selected: classes.rowSelected }}
                            selected={isSelected(row)}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                className={clsx(classes.checkboxCell, classes.sticky)}
                            >
                                <Checkbox
                                    value={row.name}
                                    onChange={(): void => onSelect(row)}
                                    checked={isSelected(row)}
                                    name="checkbox-col-cell"
                                    color="primary"
                                    size="medium"
                                />
                            </TableCell>
                            <TableCell className={classes.dataCell}>{row.name}</TableCell>
                            <TableCell className={classes.dataCell}>{row.ip}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <AppBar
                data-cy="primary-toolbar"
                position={'sticky'}
                classes={{ root: classes.appbarRoot }}
                className={clsx(classes.appbar, selectedItems.length !== 0 && isMobile && classes.contextualBarActive)}
            >
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
            <AppBar
                data-cy="contextual-bar"
                className={clsx(
                    classes.appbar,
                    classes.contextualAppBar,
                    selectedItems.length !== 0 && isMobile && classes.contextualBarActive
                )}
                position={'fixed'}
                color={'default'}
            >
                <Toolbar classes={{ gutters: classes.secondaryToolbar }}>
                    <IconButton
                        data-cy="toolbar-close"
                        color={'inherit'}
                        edge={'start'}
                        style={{ marginRight: 20 }}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant={'h6'} color={'inherit'}>
                        {selectedItems.length} selected
                    </Typography>
                    <Spacer />
                    <IconButton data-cy="toolbar-delete" color={'inherit'} edge={'end'} onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div>
                <div className={classes.tableBody}>
                    <div className={classes.tableContainer}>
                        <Hidden smDown={true}>
                            <div className={classes.deleteRow}>
                                <Typography variant={'caption'} color={'inherit'}>
                                    {selectedItems.length} selected item(s)
                                </Typography>
                                <Button
                                    data-cy={'delete-btn'}
                                    variant={'outlined'}
                                    className={classes.deleteBtn}
                                    startIcon={<DeleteIcon />}
                                    disabled={selectedItems.length === 0}
                                    onClick={onDelete}
                                >
                                    Delete selected items
                                </Button>
                            </div>
                        </Hidden>
                        <div>{getTable()}</div>
                        {list.length === 0 ? (
                            <Typography className={classes.noResult}>
                                No items found.{' '}
                                <span className={classes.resetTableLink} onClick={resetTable}>
                                    Reset table
                                </span>
                            </Typography>
                        ) : undefined}

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
