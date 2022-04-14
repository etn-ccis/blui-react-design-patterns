import React, { useCallback, useState } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardContent,
    Checkbox,
    Toolbar,
    Typography,
    IconButton,
    Theme,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { InfoListItem, Spacer } from '@brightlayer-ui/react-components';

import * as colors from '@brightlayer-ui/colors';

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
const categorizeList = (list: ListItemType[]): any =>
    list.reduce((r, a) => {
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
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                boxShadow: 'none',
                borderRadius: 0,
                marginBottom: theme.spacing(2),
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
            height: '36px',
            '&:hover': {
                backgroundColor: colors.red[300],
            },
        },
        deleteRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: theme.spacing(3),
        },
        exampleContainer: {
            padding: theme.spacing(3),
            margin: '0 auto',
            maxWidth: '816px',
            [theme.breakpoints.down('md')]: {
                padding: 0,
                boxShadow: 'none',
                borderRadius: 0,
                maxWidth: 'unset',
            },
        },
        listItemIcon: {
            marginLeft: theme.spacing(-1),
        },
        noResultListItem: {
            marginLeft: theme.spacing(0.5),
        },
        panelHeaderRoot1: {
            paddingLeft: theme.spacing(1),
            '& h6': {
                marginLeft: theme.spacing(1),
            },
        },
        panelHeaderRoot2: {
            paddingLeft: theme.spacing(2),
            '& h6': {
                marginLeft: theme.spacing(1),
            },
        },
        listItemTitle: {
            marginLeft: theme.spacing(1),
        },
        resetDataLink: {
            textDecoration: 'underline',
            color: theme.palette.primary.main,
            cursor: 'pointer',
        },
        resetListItem: {
            paddingLeft: theme.spacing(2.5),
        },
        toolbarGutters: {
            padding: `0 ${theme.spacing(2)}`,
        },
    })
);

export const MultiselectList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const [list, setList] = useState<ListItemType[]>(generatedList);
    const result = categorizeList(list);
    const [filteredResult, setFilteredResult] = useState(result);
    const [selectedItems1, setSelectedItems1] = useState<ListItemType[]>([]);
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
                    if (!selectedItems1.includes(item)) {
                        setSelectedItems1([...selectedItems1, item]);
                    } else {
                        const index = selectedItems1.indexOf(item);
                        setSelectedItems1(selectedItems1.filter((_: ListItemType, i: number) => i !== index));
                    }
                    break;
                }
            }
        },
        [selectedItems1, selectedItems2]
    );

    const isSelected = useCallback(
        (item: ListItemType): boolean => {
            switch (item.day) {
                case 'Yesterday': {
                    return selectedItems2.includes(item);
                }
                case 'Today':
                default: {
                    return selectedItems1.includes(item);
                }
            }
        },
        [selectedItems1, selectedItems2]
    );

    const isToday = useCallback((day: string): boolean => day === 'Today', []);

    const resetData = useCallback(
        (day: string): void => {
            const resetDayDetails = categorizeList(generatedList)[day];
            filteredResult[day] = resetDayDetails;
            setList(generatedList);
            setFilteredResult(filteredResult);
            if (isToday(day)) {
                setSelectedItems1([]);
            } else {
                setSelectedItems2([]);
            }
        },
        [filteredResult, selectedItems1, selectedItems2]
    );

    const onDelete = useCallback((): void => {
        const updatedList = [...list];

        selectedItems1.forEach((item: ListItemType) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        selectedItems2.forEach((item: ListItemType) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        const result1 = categorizeList(updatedList);

        setList(updatedList);
        setFilteredResult(result1);
        setSelectedItems1([]);
        setSelectedItems2([]);
    }, [list, filteredResult, selectedItems1, selectedItems2]);

    const selectAll = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const day = event.target.value;
        if (event.target.checked) {
            const newSelectedItems = filteredResult[day].filter((item: ListItemType) => item.day === day);
            if (isToday(day)) {
                setSelectedItems1(newSelectedItems);
            } else {
                setSelectedItems2(newSelectedItems);
            }
            return;
        }
        if (isToday(day)) {
            setSelectedItems1([]);
        } else {
            setSelectedItems2([]);
        }
    };
    const emptyCard = (day: string): JSX.Element => (
        <div>
            <Card classes={{ root: classes.card }}>
                <CardContent classes={{ root: classes.cardContent }}>
                    <div className="panel-header">
                        <InfoListItem
                            classes={{
                                root: isMobile ? classes.resetListItem : '',
                            }}
                            title={
                                <Typography color={'primary'} variant={'subtitle2'}>
                                    {day}
                                </Typography>
                            }
                            divider={'full'}
                            dense
                            hidePadding
                        />
                    </div>
                    <div>
                        <InfoListItem
                            data-cy="no-result"
                            hidePadding
                            divider={isMobile ? 'full' : undefined}
                            classes={{
                                root: isMobile ? classes.resetListItem : '',
                            }}
                            title={
                                <Typography data-cy={'empty-table'}>
                                    No results.{' '}
                                    <span
                                        className={classes.resetDataLink}
                                        onClick={(): void => resetData(day)}
                                        data-cy={'reset'}
                                    >
                                        Reset data.
                                    </span>
                                </Typography>
                            }
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
    const getCardContent = (day: string): JSX.Element => (
        <div>
            {filteredResult[day] ? (
                <Card classes={{ root: classes.card }}>
                    <CardContent classes={{ root: classes.cardContent }}>
                        {filteredResult[day].map((resultItem: ListItemType, index: number) => (
                            <div key={`result-item-${index}`}>
                                <div>
                                    {index === 0 ? (
                                        <div className="panel-header">
                                            <InfoListItem
                                                key={`list-header`}
                                                classes={{
                                                    root:
                                                        filteredResult[day].length !== 0
                                                            ? classes.panelHeaderRoot1
                                                            : classes.panelHeaderRoot2,
                                                }}
                                                icon={
                                                    filteredResult[day].length !== 0 ? (
                                                        <Checkbox
                                                            classes={{ indeterminate: classes.checkboxIndeterminate }}
                                                            indeterminate={
                                                                isToday(day)
                                                                    ? selectedItems1.length > 0 &&
                                                                      selectedItems1.length < filteredResult[day].length
                                                                    : selectedItems2.length > 0 &&
                                                                      selectedItems2.length < filteredResult[day].length
                                                            }
                                                            checked={
                                                                isToday(day)
                                                                    ? filteredResult[day].length > 0 &&
                                                                      selectedItems1.length ===
                                                                          filteredResult[day].length
                                                                    : filteredResult[day].length > 0 &&
                                                                      selectedItems2.length ===
                                                                          filteredResult[day].length
                                                            }
                                                            onChange={selectAll}
                                                            value={day}
                                                            name="checkbox-header-cell"
                                                            color="primary"
                                                            size="medium"
                                                            data-cy={'table-header-checkbox'}
                                                            data-testid={'checkboxHeader'}
                                                        />
                                                    ) : undefined
                                                }
                                                title={
                                                    isToday(day) ? (
                                                        selectedItems1.length > 0 ? (
                                                            <Typography color={'primary'} variant={'subtitle2'}>
                                                                {day} (
                                                                {selectedItems1.length > 0 ? selectedItems1.length : ''}
                                                                )
                                                            </Typography>
                                                        ) : (
                                                            <Typography color={'primary'} variant={'subtitle2'}>
                                                                {day}
                                                            </Typography>
                                                        )
                                                    ) : selectedItems2.length > 0 ? (
                                                        <Typography color={'primary'} variant={'subtitle2'}>
                                                            {day} (
                                                            {selectedItems2.length > 0 ? selectedItems2.length : ''})
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
                                    data-testid="infoListItem"
                                    data-cy={'list-content'}
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
                                        title: classes.listItemTitle,
                                        root: isSelected(resultItem) ? classes.listItemRoot : '',
                                    }}
                                    hidePadding
                                    title={resultItem.name}
                                    divider={filteredResult[day].length - 1 !== index || isMobile ? 'full' : undefined}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ) : (
                emptyCard(day)
            )}
        </div>
    );

    return (
        <div>
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <Typography variant={'h6'} data-cy={'blui-toolbar'} color={'inherit'}>
                        Multiselect List
                    </Typography>
                    <Spacer />
                    {md ? null : selectedItems1.length !== 0 || selectedItems2.length !== 0 ? (
                        <IconButton data-cy="delete-btn" color={'inherit'} onClick={onDelete} edge={'end'} size="large">
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        ''
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.exampleContainer}>
                {isMobile ? null : (
                    <div className={classes.deleteRow}>
                        <Button
                            data-testid="deleteButton"
                            data-cy="delete-btn"
                            variant={'contained'}
                            color={'inherit'}
                            className={classes.deleteBtn}
                            startIcon={<DeleteIcon />}
                            disabled={selectedItems1.length === 0 && selectedItems2.length === 0}
                            onClick={onDelete}
                        >
                            DELETE
                        </Button>
                    </div>
                )}
                {days.map((day, index) => (
                    <div key={`item-${index}`}>{getCardContent(day)}</div>
                ))}
            </div>
        </div>
    );
};
