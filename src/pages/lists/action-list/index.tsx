import React, { useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import { Spacer, InfoListItem } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme, Tooltip, useMediaQuery } from '@mui/material';
import { EmptyState } from './EmptyState';
import makeStyles from '@mui/styles/makeStyles';

type Option = 'Delete' | 'View Details';
type Item = {
    id: number;
    name: string;
    details: string;
};

const useStyles = makeStyles(() => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
}));

const createItem = (index: number): Item => ({
    id: index,
    name: `Item ${index}`,
    details: `Item ${index} details`,
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
    const classes = useStyles();

    const [list, setList] = useState<Item[]>(generatedList);
    const [menuPosition, setMenuPosition] = useState<null | HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar data-cy={'blui-toolbar'} classes={{ gutters: classes.toolbarGutters }}>
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
                            size="large"
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
                            size="large"
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
                                    size="large"
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
