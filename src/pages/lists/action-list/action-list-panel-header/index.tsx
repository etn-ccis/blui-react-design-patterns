import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Select from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';

type Item = {
    id: number;
    name: string;
    registeredBeforeDays: number;
    details: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    actionList: {
        minHeight: '100vh',
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    toolbarTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolBarSubtitle: {
        marginTop: theme.spacing(-1),
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
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
            boxShadow: 'none',
            borderRadius: 0,
        },
    },
    cardHeader: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    cardHeaderTitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    noListItem: {
        height: 56,
        padding: 0,
    },
    categoryName: {
        color: theme.palette.primary.main,
    },
    select: {
        backgroundColor: theme.palette.background.paper,
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
        },
        '&.MuiFilledInput-input': {
            padding: 0,
        },
    },
    selectedMenuItem: {
        minHeight: theme.spacing(6),
        '&.Mui-selected': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    dropDownIcon: {
        right: 0,
        color: theme.palette.text.primary,
    },
    dropDownControl: {
        minWidth: theme.spacing(11),
    },
    rightComponentChevron: {
        color: theme.palette.text.secondary,
    },
    menuProps: {
        width: 154,
        marginTop: theme.spacing(2),
    },
}));

const itemList: Item[] = [
    {
        id: 1,
        name: 'Item 01',
        registeredBeforeDays: 8,
        details: 'Registered 8 days ago',
    },
    {
        id: 2,
        name: 'Item 02',
        registeredBeforeDays: 15,
        details: 'Registered 15 days ago',
    },
    {
        id: 3,
        name: 'Item 03',
        registeredBeforeDays: 30,
        details: 'Registered 28 days ago',
    },
];

const ranges: number[] = [30, 15, 7];

export const ActionListPanelHeader = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const [range, setRange] = useState<string>(String(ranges[0]));
    const [list, setList] = useState(itemList);

    const handleOnChange = useCallback((selectedRange: number): void => {
        const tempList = itemList.filter((item) => item.registeredBeforeDays <= selectedRange);
        setList(tempList);
    }, []);

    const getCardHeaderTitle = (): JSX.Element => (
        <div className={classes.cardHeaderTitle}>
            <Typography classes={{ root: classes.categoryName }} variant="subtitle2">
                Category Name
            </Typography>
            <FormControl classes={{ root: classes.dropDownControl }} variant={'filled'}>
                <Select
                    classes={{ icon: classes.dropDownIcon, select: classes.select }}
                    data-cy={'range-selector'}
                    fullWidth
                    disableUnderline
                    value={range}
                    defaultValue={range}
                    labelId={'range-label'}
                    onChange={(event): void => {
                        setRange(String(event.target.value));
                        handleOnChange(Number(event.target.value));
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        classes: { paper: classes.menuProps },
                    }}
                >
                    {ranges.map((rangeItem) => (
                        <MenuItem key={rangeItem} value={rangeItem} classes={{ root: classes.selectedMenuItem }}>
                            <Typography variant="subtitle2">{`${rangeItem} Days`}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

    return (
        <div className={classes.actionList}>
            <AppBar data-cy={'blui-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <div className={classes.toolbarTextContainer}>
                        <Typography variant={'h6'} color={'inherit'}>
                            Global Action List
                        </Typography>
                        <Typography classes={{ root: classes.toolBarSubtitle }} variant={'body1'} color={'inherit'}>
                            In Panel Header
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card classes={{ root: classes.card }}>
                    <CardHeader classes={{ root: classes.cardHeader }} title={getCardHeaderTitle()} />
                    <CardContent classes={{ root: classes.cardContent }}>
                        {list.length ? (
                            list.map(
                                (item, i): JSX.Element => (
                                    <InfoListItem
                                        key={i}
                                        data-testid="infoListItem"
                                        classes={{
                                            rightComponent: classes.rightComponentChevron,
                                        }}
                                        hidePadding
                                        ripple
                                        title={item.name}
                                        subtitle={item.details}
                                        divider={list.length - 1 !== i || isMobile ? 'full' : undefined}
                                        chevron
                                    />
                                )
                            )
                        ) : (
                            <InfoListItem
                                data-testid="infoListItem"
                                classes={{
                                    root: classes.noListItem,
                                }}
                                hidePadding
                                ripple
                                title={
                                    <Typography variant="body2" align="center">
                                        No items found.
                                    </Typography>
                                }
                                divider={isMobile ? 'full' : undefined}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
