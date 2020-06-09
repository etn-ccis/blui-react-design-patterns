import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ComputerIcon from '@material-ui/icons/Computer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { EmptyState } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Hidden } from '@material-ui/core';

const options = ['Delete', 'View Details'];
const ITEM_HEIGHT = 48;

export const ActionList = (): JSX.Element => {
    const dispatch = useDispatch();

    const createItem = (index: number): any => ({ id: index, name: `Item ${index}`, details: `Item ${index} occured` });

    const createRandomItem = (): any => {
        const int = parseInt(`${Math.random() * 100}`, 10);
        return createItem(int);
    };

    const generatedList = [];

    for (let i = 0; i < 10; i++) {
        generatedList.push(createRandomItem());
    }

    const [list, setList] = useState<any[]>(generatedList);
    const [menuPosition, setMenuPosition] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState<any>(null);
    const [activeMenu, setActiveMenu] = useState<any>(null);

    const onAddItem = (): void => {
        setList([...list, createRandomItem()]);
    };

    const onMenuClick = (event: any, i: number): void => {
        setMenuPosition(event.currentTarget);
        setActiveMenu(i);
    };

    const onMenuClose = (): void => {
        setMenuPosition(null);
        setActiveMenu(null);
    };

    const onMenuItemClick = (option: any, i: number): void => {
        if (option === 'Delete') {
            const tempList = list;
            tempList.splice(i, 1);
            setList(tempList);
        }
        onMenuClose();
    };

    const onRemoveAll = (): void => {
        setList([]);
    };

    const onSelected = (item: any): void => {
        setSelectedIndex(item);
    };

    const isSelected = (item: any): any => selectedIndex === item;

    const getEmptyComponent = (): any => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                height: 'calc(100vh - 128px)',
            }}
        >
            <EmptyState
                icon={<ComputerIcon style={{ fontSize: '100px' }}/>}
                title={'No Items Found'}
                actions={
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: '10px' }}
                        onClick={(): void => onAddItem()}
                    >
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
                <Toolbar data-cy="pxb-toolbar">
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
                        Action List
                    </Typography>
                    <div style={{ flex: '1 1 0px' }} />
                    <IconButton
                        id="remove-all-button"
                        data-cy="toolbar-delete"
                        color="inherit"
                        aria-label="Delete"
                        onClick={(): void => {
                            onRemoveAll();
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        id="add-item-button"
                        data-cy="toolbar-add"
                        color="inherit"
                        aria-label="add"
                        onClick={(): void => {
                            onAddItem();
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {list.length < 1 && getEmptyComponent()}
            <List className="list" data-cy="list-content" style={{ paddingTop: '0px' }} component="nav">
                {list.map((item: any, i: number): any => (
                    <ListItem
                        key={`item_${i}`}
                        button
                        className={isSelected(i) ? 'selected' : ''}
                        onClick={(): any => onSelected(i)}
                    >
                        <ListItemText primary={item.name} secondary={item.details}></ListItemText>
                        <IconButton data-cy="action-menu" onClick={(evt: any): any => onMenuClick(evt, i)}>
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Menu
                id="long-menu"
                anchorEl={menuPosition}
                open={Boolean(menuPosition)}
                onClose={onMenuClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={(): void => onMenuItemClick(option, activeMenu)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
