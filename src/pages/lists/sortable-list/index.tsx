import React, { useCallback, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { DragHandle as DragHandleIcon } from '@material-ui/icons';
import {
    AppBar,
    Button,
    createStyles,
    Hidden,
    IconButton,
    List,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import SortIcon from '@material-ui/icons/Sort';
import CheckIcon from '@material-ui/icons/Check';

import { OnSortEndProps, SortableListEditProps, SortableListItemProps } from './types';

const itemsList: string[] = ['Item 01', 'Item 02', 'Item 03'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sortableList: {
            backgroundColor: theme.palette.background.paper,
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
            maxWidth: 768,
            padding: `0 ${theme.spacing(2)}px`,
            margin: `${theme.spacing(3)}px auto`,
            [theme.breakpoints.down('xs')]: {
                maxWidth: '100%',
                padding: 0,
                margin: 0,
            },
        },
        list: {
            marginTop: theme.spacing(3),
            boxShadow: theme.shadows[1],
            borderRadius: 4,
            cursor: 'grabbing',
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
                boxShadow: 'none',
                borderRadius: 0,
            },
        },
        sortButtonMobile: {
            color: theme.palette.common.white,
        },
        sortButtonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        dragHandleIconButton: {
            backgroundColor: 'transparent',
            cursor: 'grabbing',
        },
        dragHandle: {
            cursor: 'pointer',
        },
        sortableListEdit: {
            cursor: 'grabbing',
        },
        infoListItem: {
            backgroundColor: theme.palette.common.white[50],
        },
    })
);

const DragHandle = SortableHandle((classes: Record<string, any>) => (
    <DragHandleIcon classes={{ root: classes.dragHandle }} />
));

const SortableListItem = SortableElement(({ listItem, classes, ...other }: SortableListItemProps) => (
    <InfoListItem
        {...other}
        classes={{ root: classes.infoListItem }}
        icon={
            <IconButton disableRipple classes={{ root: classes.dragHandleIconButton }}>
                <DragHandle classes={classes} />
            </IconButton>
        }
        title={listItem}
    />
));

export const SortableListEdit = SortableContainer(({ list, classes }: SortableListEditProps) => (
    <List dense disablePadding component={'nav'} classes={{ root: classes.list || classes.sortableListEdit }}>
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
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [list, setList] = useState<string[]>(itemsList);
    const [sortable, setSortable] = useState<boolean>(false);

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: OnSortEndProps): void => {
            setList(arrayMove(list, oldIndex, newIndex));
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
                            endIcon
                            onClick={(): void => setSortable(!sortable)}
                            startIcon={sortable ? <CheckIcon /> : <SortIcon />}
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
                        helperClass={classes.dragging}
                        classes={classes}
                    />
                )}
                {!sortable && (
                    <List dense className={'list'} disablePadding component={'nav'} classes={{ root: classes.list }}>
                        {list.map((listItem: string, i: number) => (
                            <InfoListItem hidePadding key={`item-${i}`} title={listItem} divider={'full'} />
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};
