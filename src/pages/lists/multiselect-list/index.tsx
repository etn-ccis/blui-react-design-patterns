import React, { useCallback, useState } from 'react';
import {
    makeStyles,
    createStyles,
    AppBar,
    Button,
    Card,
    CardContent,
    Checkbox,
    Toolbar,
    Typography,
    IconButton,
    Hidden,
    Theme,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { InfoListItem } from '@pxblue/react-components';

import * as colors from '@pxblue/colors';

export type ListItemType = {
    id: number;
    name: string;
    checked: boolean;
};

const category = ['High Humidity', 'Battery Service', 'Bypass Over Frequency'];

const createItem = (index: number, name: string): ListItemType => ({
    id: index,
    name: name,
    checked: false,
});

const generatedList: ListItemType[] = [];

for (let i = 0; i < 3; i++) {
    generatedList.push(createItem(i, category[i]));
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbarRoot: {
            padding: 0,
        },
        listItemRoot: {
            backgroundColor: 'rgba(0, 123, 193, 0.05)',
        },
        card: {
            [theme.breakpoints.down('sm')]: {
                boxShadow: 'none',
                borderRadius: 0,
            },
        },
        cardContent: {
            padding: 0,
            '&:last-child': {
                paddingBottom: 0,
            },
        },
        checkboxIndeterminate: {
            color: theme.palette.primary.main,
        },
        deleteBtn: {
            backgroundColor: theme.palette.error.main,
            color: colors.white[50],
        },
        deleteRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: `${theme.spacing(3)}px`,
        },
        exampleContainer: {
            padding: `${theme.spacing(3)}px`,
            margin: '0 auto',
            maxWidth: '816px',
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                boxShadow: 'none',
                borderRadius: 0,
                maxWidth: 'unset',
            },
        },
        listItemIcon: {
            marginLeft: `-${theme.spacing(1)}px`,
        },
        noResultListItem: {
            marginLeft: `${theme.spacing(0.5)}px`,
        },
        panelHeaderRoot1: {
            paddingLeft: `${theme.spacing(1)}px`,
        },
        panelHeaderRoot2: {
            paddingLeft: `${theme.spacing(2)}px`,
        },
        panelHeaderTitle: {
            color: colors.blue[500],
        },
        toolbarGutters: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    })
);

export const MultiselectList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [list, setList] = useState<ListItemType[]>(generatedList);
    const [selectedItems, setSelectedItems] = useState<ListItemType[]>([]);

    const onSelect = useCallback(
        (item: ListItemType): void => {
            if (!selectedItems.includes(item)) {
                setSelectedItems([...selectedItems, item]);
            } else {
                const index = selectedItems.indexOf(item);
                setSelectedItems(selectedItems.filter((_: ListItemType, i: number) => i !== index));
            }
        },
        [selectedItems]
    );

    const isSelected = useCallback((item: ListItemType): boolean => selectedItems.includes(item), [selectedItems]);

    const onDelete = useCallback((): void => {
        const updatedList = [...list];

        selectedItems.forEach((item: ListItemType) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        setList(updatedList);
        setSelectedItems([]);
    }, [list, selectedItems]);

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            const newSelectedItems = list.map((item) => item);
            setSelectedItems(newSelectedItems);
            return;
        }
        setSelectedItems([]);
    };

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <Typography variant={'h6'} data-cy={'pxb-toolbar'} color={'inherit'}>
                        Multiselect List
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.exampleContainer}>
                <Hidden smDown={true}>
                    <div className={classes.deleteRow}>
                        <Button
                            data-cy={'delete-btn'}
                            variant={'contained'}
                            color={'inherit'}
                            className={classes.deleteBtn}
                            startIcon={<DeleteIcon />}
                            disabled={selectedItems.length === 0}
                            onClick={onDelete}
                        >
                            DELETE
                        </Button>
                    </div>
                </Hidden>
                <Card classes={{ root: classes.card }}>
                    <CardContent classes={{ root: classes.cardContent }}>
                        <div className="panel-header">
                            <InfoListItem
                                key={`list-header`}
                                classes={{ root: list.length !== 0 ? classes.panelHeaderRoot1 : classes.panelHeaderRoot2, title: classes.panelHeaderTitle }}
                                icon={
                                    list.length !== 0 ?
                                    <Checkbox
                                        classes={{ indeterminate: classes.checkboxIndeterminate }}
                                        indeterminate={selectedItems.length > 0 && selectedItems.length < list.length}
                                        checked={list.length > 0 && selectedItems.length === list.length}
                                        onChange={selectAll}
                                        name="checkbox-header-cell"
                                        color="primary"
                                        size="medium"
                                        data-cy={'table-header-checkbox'}
                                    /> : undefined
                                }
                                title={
                                    selectedItems.length > 0 ? (
                                        <Typography color={'primary'} variant={'subtitle2'}>
                                            Today ({selectedItems.length > 0 ? selectedItems.length : ''})
                                        </Typography>
                                    ) : (
                                        <Typography color={'primary'} variant={'subtitle2'}>
                                            Today
                                        </Typography>
                                    )
                                }
                                divider={'full'}
                                dense
                                hidePadding
                            />
                        </div>
                        {list.map((item, index) => (
                            <InfoListItem
                                key={index}
                                data-testid="infoListItem"
                                icon={
                                    <Checkbox
                                        value={item.name}
                                        onChange={(): void => onSelect(item)}
                                        checked={isSelected(item)}
                                        name="checkbox-col-cell"
                                        color="primary"
                                        size="medium"
                                    />
                                }
                                classes={{ icon: classes.listItemIcon, root: isSelected(item) ? classes.listItemRoot : '' }}
                                hidePadding
                                title={item.name}
                                divider={list.length - 1 !== index || isMobile ? 'full' : undefined}
                            />
                        ))}
                        {list.length === 0 ? (
                            <InfoListItem
                                hidePadding
                                title={'No Results.'}
                            />
                        ) : undefined}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
