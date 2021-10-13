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
    useTheme,
} from '@material-ui/core';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import SortIcon from '@material-ui/icons/Sort';
import CheckIcon from '@material-ui/icons/Check';

import { OnSortEndProps, SortableListEditProps, SortableListItemProps } from './types';
import * as Colors from '@pxblue/colors';

const itemsList: string[] = ['Item 0', 'Item 1', 'Item 2'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dragging: {
            boxShadow: theme.shadows[4],
        },
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
    })
);

const DragHandle = SortableHandle(() => <DragHandleIcon style={{ cursor: 'pointer' }} />);

const SortableListItem = SortableElement(({ listItem, ...other }: SortableListItemProps) => (
    <InfoListItem
        backgroundColor={Colors.white[50]}
        {...other}
        icon={
            <IconButton disableRipple style={{ backgroundColor: 'transparent' }}>
                <DragHandle />
            </IconButton>
        }
        title={listItem}
    />
));

export const SortableListEdit = SortableContainer(({ list }: SortableListEditProps) => (
    <List
        disablePadding
        component={'nav'}
        style={{
            marginTop: '24px',
            boxShadow:
                '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            cursor: 'grabbing',
        }}
    >
        {list.map((listItem: string, i: number) => (
            <SortableListItem
                key={`item-${i}`}
                data-cy={`sortable-row-${i}`}
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
    const [list, setList] = useState<string[]>(itemsList);
    const [sortable, setSortable] = useState<boolean>(false);

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: OnSortEndProps): void => {
            setList(arrayMove(list, oldIndex, newIndex));
        },
        [list, setList]
    );

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                </Toolbar>
            </AppBar>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '766px',
                    margin: '24px auto',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{ marginTop: theme.spacing(3) }}
                        onClick={(): void => setSortable(!sortable)}
                        startIcon={sortable ? <CheckIcon /> : <SortIcon />}
                    >
                        <Typography noWrap color={'inherit'}>
                            {sortable ? 'Done' : 'Sort'}
                        </Typography>
                    </Button>
                </div>
                {sortable && (
                    <SortableListEdit
                        list={list}
                        onSortEnd={onSortEnd}
                        useDragHandle={true}
                        helperClass={classes.dragging}
                    />
                )}
                {!sortable && (
                    <List
                        className={'list'}
                        disablePadding
                        component={'nav'}
                        style={{
                            marginTop: '24px',
                            boxShadow:
                                '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                        }}
                    >
                        {list.map((listItem: string, i: number) => (
                            <InfoListItem hidePadding key={`item-${i}`} title={listItem} divider={'full'} />
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};
