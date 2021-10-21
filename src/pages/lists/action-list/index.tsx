import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Spacer, InfoListItem } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

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
        padding: '0 16px',
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
    infoListItem: {
        backgroundColor: theme.palette.common.white,
    },
    categoryName: {
        color: theme.palette.primary.main,
    },
    select: {
        '&:focus': {
            backgroundColor: 'white',
        },
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

const countries: number[] = [30, 15, 7];

export const ActionList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [countryCode, setCountryCode] = useState<string>(String(countries[0]));
    const [list, setList] = useState(itemList);

    const handleOnChange = (selectedRange: number): void => {
        const tempList = itemList.filter((item) => item.registeredBeforeDays <= selectedRange);
        setList(tempList);
    };

    const getCardHeaderTitle = (): JSX.Element => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography classes={{ root: classes.categoryName }} variant="subtitle2">
                Category Name
            </Typography>
            <FormControl variant={'filled'} style={{ width: 200, marginRight: theme.spacing(2) }}>
                <Select
                    classes={{ root: classes.select }}
                    style={{ backgroundColor: 'white' }}
                    data-cy={'country-selector'}
                    fullWidth
                    disableUnderline
                    value={countryCode}
                    defaultValue={countryCode}
                    labelId={'country-code-label'}
                    onChange={(event): void => {
                        setCountryCode(String(event.target.value));
                        handleOnChange(Number(event.target.value));
                    }}
                >
                    {countries.map((country) => (
                        <MenuItem key={country} value={country} style={{ backgroundColor: 'white' }}>
                            {`${country} Days`}
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
                    <Typography variant={'h6'} color={'inherit'}>
                        Action List
                    </Typography>
                    <Spacer />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card classes={{ root: classes.card }}>
                    <CardHeader classes={{ root: classes.cardHeader }} title={getCardHeaderTitle()} />
                    <List data-cy={'list-content'} disablePadding component="nav" className={'list'}>
                        {list.map(
                            (item, i): JSX.Element => (
                                <InfoListItem
                                    key={i}
                                    classes={{ root: classes.infoListItem }}
                                    hidePadding
                                    ripple
                                    title={item.name}
                                    subtitle={item.details}
                                    divider={list.length - 1 !== i || isMobile ? 'full' : undefined}
                                    chevron
                                />
                            )
                        )}
                    </List>
                </Card>
            </div>
        </div>
    );
};
