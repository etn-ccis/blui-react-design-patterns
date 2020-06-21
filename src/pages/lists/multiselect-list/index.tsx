import React, { useState } from 'react';
import {
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    Checkbox,
    IconButton,
    Hidden,
    Button,
    Theme,
    useTheme,
    Snackbar,
    Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ErrorIcon from '@material-ui/icons/Error';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { DRAWER_WIDTH } from '../../../assets/constants';
import { EmptyState, InfoListItem, Spacer } from '@pxblue/react-components';

export type ListItem = {
    id: number;
    name: string;
    details: string;
    checked: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackbar: {
            left: `calc((100vw - ${DRAWER_WIDTH}px)/2 + ${DRAWER_WIDTH}px);`,
            [theme.breakpoints.down('sm')]: {
                left: 'unset',
            },
        },
        emptyStateContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
        },
    })
);

export const MultiselectList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    function createItem(index: number, randomStatus: string): ListItem {
        return {
            id: index,
            name: `Item ${index}`,
            details: `Status: ${randomStatus}`,
            checked: false,
        };
    }

    function createRandomItem(): ListItem {
        const int = parseInt(`${Math.random() * 100}`, 10);
        const randomStatus = Math.random() >= 0.3 ? 'normal' : 'alarm';
        return createItem(int, randomStatus);
    }

    const generatedList = [];

    for (let i = 0; i < 10; i++) {
        generatedList.push(createRandomItem());
    }

    const [list, setList] = useState<ListItem[]>(generatedList);
    const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);

    function onSelect(item: ListItem): void {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const index = selectedItems.indexOf(item);
            setSelectedItems(selectedItems.filter((_: ListItem, i: number) => i !== index));
        }
    }

    function isSelected(item: ListItem): boolean {
        return selectedItems.includes(item);
    }

    function onAddItem(): void {
        setList([...list, createRandomItem()]);
    }

    function onDelete(): void {
        const updatedList = [...list];

        selectedItems.forEach((item: ListItem) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        setList(updatedList);
        setSelectedItems([]);
    }

    function onCancel(): void {
        list.forEach((item: ListItem): void => {
            item.checked = false;
        });
        setSelectedItems([]);
    }

    const getEmptyComponent = (): JSX.Element => (
        <div className={classes.emptyStateContainer}>
            <EmptyState
                icon={<ErrorIcon style={{ fontSize: '100px' }} />}
                title={'No Items Found'}
                actions={
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: theme.spacing() }}
                        onClick={onAddItem}
                        startIcon={<AddIcon />}
                    >
                        Add an Item
                    </Button>
                }
            />
        </div>
    );

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
                    <Typography variant="h6" data-cy="pxb-toolbar" color="inherit">
                        Multiselect List
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Add an item'}>
                        <IconButton
                            edge={'end'}
                            id="add-item-button"
                            data-cy="toolbar-add"
                            color="inherit"
                            aria-label="add"
                            onClick={onAddItem}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {list.length < 1 && getEmptyComponent()}
            <List data-cy="list-content" className="list">
                {list.map((item, index) => (
                    <InfoListItem
                        key={`listItem_${index}`}
                        icon={
                            <Checkbox
                                className="checkbox"
                                value={item.name}
                                onChange={(): void => onSelect(item)}
                                checked={isSelected(item)}
                            />
                        }
                        title={item.name}
                        subtitle={item.details}
                        chevron
                    >
                        {' '}
                    </InfoListItem>
                ))}
            </List>
            <Snackbar
                action={
                    <>
                        <Tooltip title={'Delete all'}>
                            <IconButton id="remove-items-button" onClick={onDelete} data-cy="snackbar-delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Cancel'}>
                            <IconButton id="cancel-button" onClick={onCancel} data-cy="snackbar-cancel">
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
                message={`${selectedItems.length} selected item${selectedItems.length > 1 ? 's' : ''}`}
                open={selectedItems.length > 0}
                classes={{ root: classes.snackbar }}
            />
        </div>
    );
};
