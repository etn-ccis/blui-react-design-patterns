import React, { useState, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import { Spacer, InfoListItem } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Hidden, useTheme, Tooltip } from '@material-ui/core';
import { EmptyState } from './EmptyState';

type Option = 'Delete' | 'View Details';
type Item = {
    id: number;
    name: string;
    details: string;
};

const createItem = (index: number): Item => ({
    id: index,
    name: `Item ${index}`,
    details: `Item ${index} occured`,
});

const createRandomItem = (): Item => {
    const int = parseInt(`${Math.random() * 100}`, 10);
    return createItem(int);
};

const generatedList: Item[] = [];

for (let i = 0; i < 10; i++) {
    generatedList.push(createRandomItem());
}

const options: Option[] = ['Delete', 'View Details'];

export const ActionList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [list, setList] = useState<Item[]>(generatedList);
    const [menuPosition, setMenuPosition] = useState<null | HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const onAddItem = useCallback((): void => {
        setList([...list, createRandomItem()]);
    }, [list, setList]);

    const onMenuClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number): void => {
            setMenuPosition(event.currentTarget);
            setActiveIndex(i);
        },
        [setMenuPosition, setActiveIndex]
    );

    const onMenuClose = useCallback((): void => {
        setMenuPosition(null);
        setActiveIndex(-1);
    }, [setMenuPosition, setActiveIndex]);

    const onMenuItemClick = useCallback(
        (option: Option, i: number): void => {
            if (option === 'Delete') {
                const tempList = list;
                tempList.splice(i, 1);
                setList(tempList);
            }
            onMenuClose();
        },
        [list, onMenuClose]
    );

    const onRemoveAll = useCallback((): void => {
        setList([]);
    }, [setList]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position={'sticky'}>
                <Toolbar data-cy={'pxb-toolbar'}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Action List
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Remove all items'}>
                        <IconButton
                            id={'remove-all-button'}
                            data-cy={'toolbar-delete'}
                            color={'inherit'}
                            aria-label={'Delete'}
                            onClick={onRemoveAll}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Add a new item'}>
                        <IconButton
                            id={'add-item-button'}
                            data-cy={'toolbar-add'}
                            color={'inherit'}
                            aria-label={'add'}
                            edge={'end'}
                            onClick={onAddItem}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {list.length < 1 && <EmptyState onAddItem={onAddItem} />}
            <List data-cy={'list-content'} disablePadding component="nav" className={'list'}>
                {list.map(
                    (item, i): JSX.Element => (
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
                                    data-cy={'action-menu'}
                                    onClick={(evt): void => onMenuClick(evt, i)}
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
                id={'long-menu'}
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
                    <MenuItem key={option} onClick={(): void => onMenuItemClick(option, activeIndex)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
