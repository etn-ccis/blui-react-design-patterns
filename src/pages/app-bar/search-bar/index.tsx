import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material Icons
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';

// Handles Drawer
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

// Other
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { listItems as presidents, President } from '../../../assets/list';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { DRAWER_WIDTH } from '../../../assets/constants';
import clsx from 'clsx';

const reversedPresidentList = presidents.reverse();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbar: {
            transition: 'all 250ms ease-in-out',
        },
        regularBar: {
            opacity: 1,
            '&$searchActive': {
                opacity: 0,
            },
        },
        searchbar: {
            background: theme.palette.background.paper,
            right: 0,
            width: 0,
            '& ::-ms-clear': {
                width: 0,
                height: 0,
            },
            '&$searchActive': {
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
            },
        },
        searchActive: {},
        searchfield: {
            flex: 1,
        },
    })
);

export const searchResults = (searchString: string): President[] => {
    const q = searchString.toLowerCase().trim();
    return reversedPresidentList.filter((item: President): boolean => {
        if (
            item.president
                .toLowerCase()
                .trim()
                .includes(q)
        ) {
            return true;
        }
        if (
            item.party
                .toLowerCase()
                .trim()
                .includes(q)
        ) {
            return true;
        }
        if (
            item.took_office
                .toLowerCase()
                .trim()
                .includes(q)
        ) {
            return true;
        }
        return false;
    });
};

export const SearchBar = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    const [list, setList] = useState(reversedPresidentList);
    const [searchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (searchActive) {
            if (query === '') {
                setList(reversedPresidentList);
            } else {
                setList(searchResults(query));
            }
        }
    }, [query, searchActive]);

    useEffect(() => {
        if (!searchActive) {
            setQuery('');
            setList(reversedPresidentList);
        }
    }, [searchActive]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            {/* The Regular App Bar */}
            <AppBar
                position={'sticky'}
                className={clsx(classes.appbar, classes.regularBar, searchActive && classes.searchActive)}
            >
                <Toolbar>
                    <Hidden mdUp={true}>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Search Bar
                    </Typography>
                    <Spacer />
                    <IconButton color={'inherit'} onClick={(): void => setSearchActive(true)} edge={'end'}>
                        <Search />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Search Bar */}
            <AppBar
                className={clsx(classes.appbar, classes.searchbar, searchActive && classes.searchActive)}
                position={'fixed'}
                color={'default'}
            >
                <Toolbar>
                    <IconButton color={'inherit'} edge={'start'} disabled>
                        <Search />
                    </IconButton>
                    {searchActive && ( // this is to enable auto focus on mounting
                        <TextField
                            className={classes.searchfield}
                            value={query}
                            placeholder={'Search'}
                            onChange={(evt): void => setQuery(evt.target.value)}
                            InputProps={{ disableUnderline: true }}
                            autoFocus
                        />
                    )}
                    <IconButton color={'inherit'} onClick={(): void => setSearchActive(false)} edge={'end'}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* List */}
            <List disablePadding>
                {list.map((item, index) => (
                    <ListItem key={`item-${index}`}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText
                            primary={item.president}
                            secondary={
                                <>
                                    <Typography variant={'body2'}>{item.party}</Typography>
                                    <Typography variant={'body2'}>{item.took_office}</Typography>
                                </>
                            }
                            secondaryTypographyProps={{ component: 'div' }}
                        />
                    </ListItem>
                ))}
                {list.length < 1 && (
                    <InfoListItem icon={<Error />} title={'0 results'} subtitle={'No matching presidents'} />
                )}
            </List>
        </div>
    );
};
