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
import { EmptyState, Spacer, InfoListItem } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Hidden, useTheme } from '@material-ui/core';

type Option = 'Delete' | 'View Details';
type Item = {
    id: number;
    name: string;
    details: string;
};

const options: Option[] = ['Delete', 'View Details'];

export const ActionList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const createItem = (index: number): Item => ({
        id: index,
        name: `Item ${index}`,
        details: `Item ${index} occured`,
    });

    const createRandomItem = (): Item => {
        const int = parseInt(`${Math.random() * 100}`, 10);
        return createItem(int);
    };

    const generatedList = [];

    for (let i = 0; i < 10; i++) {
        generatedList.push(createRandomItem());
    }

    const [list, setList] = useState<Item[]>(generatedList);
    const [menuPosition, setMenuPosition] = useState<any>(null);
    const [activeMenu, setActiveMenu] = useState<number>(-1);

    const onAddItem = (): void => {
        setList([...list, createRandomItem()]);
    };

    const onMenuClick = (event: any, i: number): void => {
        setMenuPosition(event.currentTarget);
        setActiveMenu(i);
    };

    const onMenuClose = (): void => {
        setMenuPosition(null);
        setActiveMenu(-1);
    };

    const onMenuItemClick = (option: Option, i: number): void => {
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

    const getEmptyComponent = (): JSX.Element => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                height: 'calc(100vh - 64px)',
            }}
        >
            <EmptyState
                icon={<ComputerIcon style={{ fontSize: '100px' }} />}
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
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                    <Spacer />
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
                        edge={'end'}
                        onClick={(): void => {
                            onAddItem();
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {list.length < 1 && getEmptyComponent()}
            <List className="list" data-cy="list-content" disablePadding component="nav">
                {list.map(
                    (item: any, i: number): JSX.Element => (
                        <InfoListItem
                            key={i}
                            hidePadding
                            ripple
                            title={item.name}
                            subtitle={item.details}
                            onClick={(): void => {
                                /* handle item onClick */
                            }}
                            rightComponent={
                                <IconButton
                                    data-cy="action-menu"
                                    onClick={(evt: any): void => onMenuClick(evt, i)}
                                    edge={'end'}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        />
                    )
                )}
            </List>
            <Menu
                id="long-menu"
                anchorEl={menuPosition}
                open={Boolean(menuPosition)}
                onClose={onMenuClose}
                PaperProps={{
                    style: {
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
