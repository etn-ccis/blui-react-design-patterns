import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { InfoListItem } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import * as colors from '@pxblue/colors';

type Item = {
    id: number;
    name: string;
    registeredBeforeDays: number;
    details: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    actionList: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    toolbarTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolBarSubtitle: {
        marginTop: -theme.spacing(1),
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
    card: {
        marginTop: theme.spacing(3),
        boxShadow: theme.shadows[1],
        borderRadius: 4,
        [theme.breakpoints.down('sm')]: {
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
    infoListItem: {
        backgroundColor: theme.palette.common.white,
    },
    noListItem: {
        height: 54,
        padding: 0,
    },
    categoryName: {
        color: theme.palette.primary.main,
    },
    select: {
        backgroundColor: theme.palette.common.white,
        '&:focus': {
            backgroundColor: theme.palette.common.white,
        },
        '&.MuiFilledInput-input': {
            padding: 0,
        },
    },
    selectMenuItem: {
        backgroundColor: theme.palette.common.white,
        minHeight: theme.spacing(6),
        '&.Mui-selected': {
            backgroundColor: 'rgba(66, 78, 84, 0.05)',
        },
    },
    dropDownIcon: {
        right: 0,
        color: colors.black[500],
    },
    dropDownControl: {
        minWidth: theme.spacing(11),
    },
    rightComponentChevron: {
        color: colors.gray[500],
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [range, setRange] = useState<string>(String(ranges[0]));
    const [list, setList] = useState(itemList);

    const handleOnChange = (selectedRange: number): void => {
        const tempList = itemList.filter((item) => item.registeredBeforeDays <= selectedRange);
        setList(tempList);
    };

    const getCardHeaderTitle = (): JSX.Element => (
        <div className={classes.cardHeaderTitle}>
            <Typography classes={{ root: classes.categoryName }} variant="subtitle2">
                Category Name
            </Typography>
            <FormControl classes={{ root: classes.dropDownControl }} variant={'filled'}>
                <Select
                    classes={{ root: classes.select, icon: classes.dropDownIcon }}
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
                        getContentAnchorEl: null,
                        classes: { paper: classes.menuProps },
                    }}
                >
                    {ranges.map((rangeItem) => (
                        <MenuItem key={rangeItem} value={rangeItem} classes={{ root: classes.selectMenuItem }}>
                            <Typography variant="subtitle2">{`${rangeItem} Days`}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

    return (
        <div className={classes.actionList}>
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar data-cy={'pxb-toolbar'} classes={{ gutters: classes.toolbarGutters }}>
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
                    <div className={classes.toolbarTextContainer}>
                        <Typography variant={'h6'} color={'inherit'}>
                            Global Action Lists
                        </Typography>
                        <Typography classes={{ root: classes.toolBarSubtitle }} variant={'body1'} color={'inherit'}>
                            On Panel Header
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
                                            root: classes.infoListItem,
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
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
