import React, { useCallback, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check';

import { OnSortEndProps, SortableListEditProps, SortableListItemProps } from './types';

const itemsList: string[] = ['Item 01', 'Item 02', 'Item 03'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sortableList: {
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
        },
        dragging: {
            boxShadow: theme.shadows[4],
        },
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: `0 ${theme.spacing(2)}`,
        },
        container: {
            maxWidth: 818,
            padding: theme.spacing(3),
            margin: '0 auto',
            [theme.breakpoints.down('md')]: {
                maxWidth: '100%',
                padding: 0,
                margin: 0,
            },
        },
        card: {
            marginTop: theme.spacing(3),
            boxShadow: theme.shadows[1],
            borderRadius: 4,
            [theme.breakpoints.down('md')]: {
                marginTop: 0,
                boxShadow: 'none',
                borderRadius: 0,
            },
        },
        sortButtonMobile: {
            color: theme.palette.common.white,
            marginRight: theme.spacing(-1),
        },
        sortButtonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        dragHandleIconButton: {
            backgroundColor: 'transparent',
            [theme.breakpoints.down('md')]: {
                marginLeft: 4,
            },
        },
        infoListItem: {
            backgroundColor: theme.palette.common.white,
        },
        sortableInfoListItem: {
            paddingLeft: 0,
            backgroundColor: theme.palette.common.white,
        },
        listItemText: {
            marginLeft: theme.spacing(2),
        },
    })
);

const DragHandle = SortableHandle(() => <DragHandleIcon />);

const SortableListItem = SortableElement(({ listItem, classes, ...other }: SortableListItemProps) => (
    <InfoListItem
        {...other}
        classes={{ root: classes.sortableInfoListItem, listItemText: classes.listItemText }}
        icon={
            <IconButton disableRipple classes={{ root: classes.dragHandleIconButton }} size="large">
                <DragHandle />
            </IconButton>
        }
        title={listItem}
    />
));

export const SortableListEdit = SortableContainer(({ list, isSorting, classes, isMobile }: SortableListEditProps) => (
    <List
        dense
        disablePadding
        component={'nav'}
        data-testid="sortableListEdit"
        style={{ cursor: isSorting ? 'grabbing' : 'default' }}
    >
        {list.map((listItem: string, i: number) => (
            <SortableListItem
                key={`item-${i}`}
                data-cy={`sortable-row-${i}`}
                classes={classes}
                index={i}
                listItem={listItem}
                divider={list.length - 1 !== i || isMobile ? 'full' : undefined}
            />
        ))}
    </List>
));

export const SortableList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [list, setList] = useState<string[]>(itemsList);
    const [sortable, setSortable] = useState<boolean>(false);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const arrayMove = useCallback((newList: string[], oldIndex: number, newIndex: number) => {
        const element = newList[oldIndex];
        newList.splice(oldIndex, 1);
        newList.splice(newIndex, 0, element);
        return newList;
    }, []);

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: OnSortEndProps): void => {
            setList(arrayMove(list, oldIndex, newIndex));
            setIsSorting(false);
        },
        [list, setList]
    );

    return (
        <div className={classes.sortableList}>
            <AppBar data-cy="blui-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <Typography variant={'h6'} color={'inherit'}>
                        Sortable List
                    </Typography>
                    <Spacer />
                    {isMobile && (
                        <IconButton
                            data-cy="sort-done"
                            classes={{ root: classes.sortButtonMobile }}
                            onClick={(): void => setSortable(!sortable)}
                            size="large"
                        >
                            {sortable ? <CheckIcon /> : <SortIcon />}
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                {!isMobile && (
                    <div className={classes.sortButtonContainer}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            onClick={(): void => setSortable(!sortable)}
                            startIcon={
                                sortable ? <CheckIcon data-cy="sort-done-btn" /> : <SortIcon data-cy="sort-btn" />
                            }
                        >
                            <Typography noWrap color={'inherit'}>
                                {sortable ? 'Done' : 'Sort'}
                            </Typography>
                        </Button>
                    </div>
                )}
                <Card classes={{ root: classes.card }}>
                    {sortable && (
                        <SortableListEdit
                            list={list}
                            onSortEnd={onSortEnd}
                            useDragHandle={true}
                            isSorting={isSorting}
                            onSortStart={(): void => setIsSorting(true)}
                            helperClass={classes.dragging}
                            classes={classes}
                            isMobile={isMobile}
                        />
                    )}
                    {!sortable && (
                        <List dense className={'list'} data-testid="list" disablePadding component={'nav'}>
                            {list.map((listItem: string, i: number) => (
                                <InfoListItem
                                    data-testid="infoListItem"
                                    classes={{ root: classes.infoListItem }}
                                    hidePadding
                                    key={`item-${i}`}
                                    title={listItem}
                                    divider={list.length - 1 !== i || isMobile ? 'full' : undefined}
                                    iconAlign={'center'}
                                />
                            ))}
                        </List>
                    )}
                </Card>
            </div>
        </div>
    );
};
