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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ComputerIcon from '@material-ui/icons/Computer';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { EmptyState, InfoListItem, Spacer } from '@pxblue/react-components';

export type ListItem = {
    id: number;
    name: string;
    details: string;
    checked: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            maxWidth: '500px',
            boxSizing: 'border-box',
            position: 'fixed',
            bottom: 0,
            left: '50%',
            background: '#fff',
            transition: 'all 0.2s cubic- bezier(0.4, 0.0, 0.2, 1)',
            opacity: 0,
            padding: theme.spacing(0.5),
            paddingLeft: theme.spacing(4),
            visibility: 'hidden',
            boxShadow: theme.shadows[10],
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                left: 0,
                right: 0,
                maxWidth: 'none',
            },
        },
        snackbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: '36px',
            opacity: 1,
        },
        active: {
            opacity: 1,
            visibility: 'visible',
        },
        emptyStateContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            height: 'calc(100vh - 128px)',
        },
    })
);

export const MultiselectList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

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
                icon={<ComputerIcon style={{ fontSize: '100px' }} />}
                title={'No Items Found'}
                actions={
                    <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={onAddItem}>
                        <AddIcon style={{ marginRight: '5px' }} />
                        Add an Item
                    </Button>
                }
            />
        </div>
    );

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
                    <Typography variant="h6" data-cy="pxb-toolbar" color="inherit">
                        Multiselect List
                    </Typography>
                    <Spacer />
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
            <footer
                data-cy="snackbar"
                className={clsx(classes.snackbar, selectedItems.length > 0 && classes.active, classes.footer)}
            >
                <Typography>{selectedItems.length} selected items</Typography>
                <div>
                    <IconButton id="remove-items-button" onClick={onDelete} data-cy="snackbar-delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton id="cancel-button" onClick={onCancel} data-cy="snackbar-cancel">
                        <CancelIcon />
                    </IconButton>
                </div>
            </footer>
        </div>
    );
};
