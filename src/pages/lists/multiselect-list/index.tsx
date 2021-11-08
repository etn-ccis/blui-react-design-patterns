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
import { InfoListItem, Spacer } from '@pxblue/react-components';

import * as colors from '@pxblue/colors';

export type ListItemType = {
    id: number;
    name: string;
    checked: boolean;
    day: string;
};

const category = ['High Humidity', 'Battery Service', 'Bypass Over Frequency'];
const days = ['Today', 'Yesterday'];

const createItem = (index: number, name: string, day: string): ListItemType => ({
    id: index,
    name: name,
    checked: false,
    day: day,
});

const generatedList: ListItemType[] = [];

for (let i = 0; i < 5; i++) {
    if (i < 3) {
        generatedList.push(createItem(i, category[i], 'Today'));
    } else {
        generatedList.push(createItem(i, category[i - 3], 'Yesterday'));
    }
}

const result = generatedList.reduce((r, a) => {
    r[a.day] = r[a.day] || [];
    r[a.day].push(a);
    return r;
}, Object.create(null));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbarRoot: {
            padding: 0,
        },
        listItemRoot: {
            backgroundColor: 'rgba(0, 123, 193, 0.05)',
        },
        card: {
            marginBottom: `${theme.spacing(3)}px`,
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
    const [selectedItems2, setSelectedItems2] = useState<ListItemType[]>([]);

    const onSelect = useCallback(
        (item: ListItemType): void => {
            switch (item.day) {
                case 'Yesterday': {
                    if (!selectedItems2.includes(item)) {
                        setSelectedItems2([...selectedItems2, item]);
                    } else {
                        const index = selectedItems2.indexOf(item);
                        setSelectedItems2(selectedItems2.filter((_: ListItemType, i: number) => i !== index));
                    }
                    break;
                }
                case 'Today':
                default: {
                    if (!selectedItems.includes(item)) {
                        setSelectedItems([...selectedItems, item]);
                    } else {
                        const index = selectedItems.indexOf(item);
                        setSelectedItems(selectedItems.filter((_: ListItemType, i: number) => i !== index));
                    }
                    break;
                }
            }
        },
        [selectedItems, selectedItems2]
    );

    const isSelected = useCallback(
        (item: ListItemType): boolean => {
            switch (item.day) {
                case 'Yesterday': {
                    return selectedItems2.includes(item);
                }
                case 'Today':
                default: {
                    return selectedItems.includes(item);
                }
            }
        },
        [selectedItems, selectedItems2]
    );

    // const isSelected = useCallback((item: ListItemType): boolean => selectedItems.includes(item), [selectedItems]);

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

    const getCardContent = (day: string): JSX.Element => (
        <div>
            <Card classes={{ root: classes.card }}>
                <CardContent classes={{ root: classes.cardContent }}>
                    {result[day].map((resultItem: ListItemType, index: number) => (
                        <div key={`result-item-${index}`}>
                            <div>
                                {index === 0 ? (
                                    <div className="panel-header">
                                        <InfoListItem
                                            key={`list-header`}
                                            classes={{
                                                root:
                                                    list.length !== 0
                                                        ? classes.panelHeaderRoot1
                                                        : classes.panelHeaderRoot2,
                                                title: classes.panelHeaderTitle,
                                            }}
                                            icon={
                                                list.length !== 0 ? (
                                                    <Checkbox
                                                        classes={{ indeterminate: classes.checkboxIndeterminate }}
                                                        indeterminate={
                                                            day === 'Today'
                                                                ? selectedItems.length > 0 &&
                                                                  selectedItems.length < list.length
                                                                : selectedItems2.length > 0 &&
                                                                  selectedItems2.length < list.length
                                                        }
                                                        checked={
                                                            day === 'Today'
                                                                ? list.length > 0 &&
                                                                  selectedItems.length === list.length
                                                                : list.length > 0 &&
                                                                  selectedItems2.length === list.length
                                                        }
                                                        onChange={selectAll}
                                                        name="checkbox-header-cell"
                                                        color="primary"
                                                        size="medium"
                                                        data-cy={'table-header-checkbox'}
                                                    />
                                                ) : undefined
                                            }
                                            title={
                                                day === 'Today' ? (
                                                    selectedItems.length > 0 ? (
                                                        <Typography color={'primary'} variant={'subtitle2'}>
                                                            {day} (
                                                            {selectedItems.length > 0 ? selectedItems.length : ''})
                                                        </Typography>
                                                    ) : (
                                                        <Typography color={'primary'} variant={'subtitle2'}>
                                                            {day}
                                                        </Typography>
                                                    )
                                                ) : selectedItems2.length > 0 ? (
                                                    <Typography color={'primary'} variant={'subtitle2'}>
                                                        {day} ({selectedItems2.length > 0 ? selectedItems2.length : ''})
                                                    </Typography>
                                                ) : (
                                                    <Typography color={'primary'} variant={'subtitle2'}>
                                                        {day}
                                                    </Typography>
                                                )
                                            }
                                            divider={'full'}
                                            dense
                                            hidePadding
                                        />
                                    </div>
                                ) : undefined}
                            </div>
                            <InfoListItem
                                key={index}
                                data-cy="infoListItem"
                                icon={
                                    <Checkbox
                                        value={resultItem.name}
                                        onChange={(): void => onSelect(resultItem)}
                                        checked={isSelected(resultItem)}
                                        name="checkbox-col-cell"
                                        color="primary"
                                        size="medium"
                                    />
                                }
                                classes={{
                                    icon: classes.listItemIcon,
                                    root: isSelected(resultItem) ? classes.listItemRoot : '',
                                }}
                                hidePadding
                                title={resultItem.name}
                                divider={result[day].length - 1 !== index || isMobile ? 'full' : undefined}
                            />
                        </div>
                    ))}
                    {result[day].length === 0 ? (
                        <InfoListItem hidePadding divider={isMobile ? 'full' : undefined} title={'No Results.'} />
                    ) : undefined}
                </CardContent>
            </Card>
        </div>
    );

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
                    <Spacer />
                    <Hidden mdUp={true}>
                        {list.length !== 0 ? (
                            <IconButton data-cy="delete-icon" color={'inherit'} onClick={onDelete} edge={'end'}>
                                <DeleteIcon />
                            </IconButton>
                        ) : (
                            ''
                        )}
                    </Hidden>
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

                {days.map((day, index) => (
                    <div key={`item-${index}`}>{getCardContent(day)}</div>
                ))}
            </div>
        </div>
    );
};
