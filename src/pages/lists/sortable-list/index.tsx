import React, { useCallback, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import createStyles from '@material-ui/core/styles/createStyles';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import SortIcon from '@material-ui/icons/Sort';
import CheckIcon from '@material-ui/icons/Check';

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
            padding: `0 ${theme.spacing(2)}px`,
        },
        container: {
            maxWidth: 818,
            padding: theme.spacing(3),
            margin: '0 auto',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
                padding: 0,
                margin: 0,
            },
        },
        list: {
            marginTop: theme.spacing(3),
            boxShadow: theme.shadows[1],
            borderRadius: 4,
            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
                boxShadow: 'none',
                borderRadius: 0,
            },
        },
        sortButtonMobile: {
            color: theme.palette.common.white,
            paddingRight: 0,
        },
        sortButtonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        dragHandleIconButton: {
            backgroundColor: 'transparent',
            [theme.breakpoints.down('sm')]: {
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
            <IconButton disableRipple classes={{ root: classes.dragHandleIconButton }}>
                <DragHandle />
            </IconButton>
        }
        title={listItem}
    />
));

export const SortableListEdit = SortableContainer(({ list, isSorting, classes }: SortableListEditProps) => (
    <List
        dense
        disablePadding
        component={'nav'}
        classes={{ root: classes.list }}
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
                divider={'full'}
            />
        ))}
    </List>
));

export const SortableList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [list, setList] = useState<string[]>(itemsList);
    const [sortable, setSortable] = useState<boolean>(false);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: OnSortEndProps): void => {
            setList(arrayMove(list, oldIndex, newIndex));
            setIsSorting(false);
        },
        [list, setList]
    );

    return (
        <div className={classes.sortableList}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                        Sortable List
                    </Typography>
                    <Spacer />
                    {isMobile && (
                        <IconButton
                            data-cy="sort-done"
                            classes={{ root: classes.sortButtonMobile }}
                            onClick={(): void => setSortable(!sortable)}
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
                {sortable && (
                    <SortableListEdit
                        list={list}
                        onSortEnd={onSortEnd}
                        useDragHandle={true}
                        isSorting={isSorting}
                        onSortStart={(): void => setIsSorting(true)}
                        helperClass={classes.dragging}
                        classes={classes}
                    />
                )}
                {!sortable && (
                    <List
                        dense
                        className={'list'}
                        data-testid="list"
                        disablePadding
                        component={'nav'}
                        classes={{ root: classes.list }}
                    >
                        {list.map((listItem: string, i: number) => (
                            <InfoListItem
                                data-testid="infoListItem"
                                classes={{ root: classes.infoListItem }}
                                hidePadding
                                key={`item-${i}`}
                                title={listItem}
                                divider={list.length - 1 !== i ? 'full' : undefined}
                                iconAlign={'center'}
                            />
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};
