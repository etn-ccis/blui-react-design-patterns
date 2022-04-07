import React, { useCallback, useState } from 'react';
import {
    Badge,
    Card,
    Divider,
    IconButton,
    InputProps,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Close, Search } from '@mui/icons-material';

type OnChangeHandler = InputProps['onChange'];

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(0.5),
    },
    bodyContent: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}`,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    toolbarRightContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    appBar: {
        zIndex: theme.zIndex.appBar + 1,
    },
    mobileAppbar: {
        height: theme.spacing(7),
        backgroundColor: theme.palette.background.paper,
    },
    mobileSearchToolbar: {
        backgroundColor: theme.palette.background.paper,
        height: theme.spacing(7),
        overflowX: 'auto',
    },
    desktopSearchContainer: {
        display: 'flex',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    resultsCard: {
        margin: `0 ${theme.spacing(4)}`,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            borderRadius: 0,
        },
    },
    noResults: {
        margin: `0 ${theme.spacing(4)}`,
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(4),
        },
    },
    outlined: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '20px',
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#C52328',
                borderWidth: '2px',
            },
        },
    },
}));

const data = ['Apple', 'Grape', 'Orange', 'Pineapple', 'Watermelon'];

export const PageWideSearch = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const search = useCallback((term: string): void => {
        if (term === '') {
            setSearchResults(data);
            return;
        }

        const q = term.toLowerCase().trim();
        const filteredItems = [];
        for (const item of data) {
            if (!item.toLowerCase().trim().includes(q)) {
                continue;
            }
            const re = new RegExp(q, 'gi');
            filteredItems.push(item.replace(re, '<strong>$&</strong>'));
        }
        setSearchResults(filteredItems);
    }, []);

    const onSearchTermChange: OnChangeHandler = useCallback(
        (event) => {
            setSearchTerm(event.target.value);
            search(event.target.value);
        },
        [searchTerm]
    );

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar classes={{ root: classes.appBar }} variant={'collapsed'} position={'sticky'}>
                <Toolbar data-cy={'toolbar'} classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy="toolbar-menu"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            color={'inherit'}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        {isMobile ? 'Page Search' : 'Page Wide Search'}
                    </Typography>
                    <Spacer />
                    <div className={classes.toolbarRightContent}>
                        <IconButton color={'inherit'} size="large">
                            <HelpIcon />
                        </IconButton>
                        <IconButton color={'inherit'} size="large">
                            <Badge color="error" badgeContent={88}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color={'inherit'} size="large">
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {isMobile && (
                <AppBar variant={'collapsed'} classes={{ root: classes.mobileAppbar }} elevation={0}>
                    <Toolbar className={classes.mobileSearchToolbar} data-cy={'search-field'}>
                        <TextField
                            className={classes.outlined}
                            placeholder="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            InputProps={{
                                startAdornment: (
                                    <Search
                                        style={{
                                            marginRight: theme.spacing(4),
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                ),
                                endAdornment: searchTerm.length > 0 && (
                                    <Close
                                        onClick={(): void => {
                                            setSearchTerm('');
                                            search('');
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            color: theme.palette.text.secondary,
                                            marginLeft: theme.spacing(1),
                                        }}
                                    />
                                ),
                            }}
                            style={{ width: '100%' }}
                        />
                    </Toolbar>
                </AppBar>
            )}
            <Divider />
            <div className={classes.bodyContent}>
                {!isMobile && (
                    <div className={classes.desktopSearchContainer}>
                        <Spacer />
                        <TextField
                            data-cy={'search-field'}
                            placeholder="Search"
                            variant="standard"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            InputProps={{
                                startAdornment: (
                                    <Search
                                        style={{
                                            color: theme.palette.text.secondary,
                                            marginRight: theme.spacing(1),
                                        }}
                                    />
                                ),
                            }}
                        />
                    </div>
                )}

                {searchResults.length > 0 && (
                    <Card className={classes.resultsCard} elevation={isMobile ? 0 : undefined}>
                        {searchResults.map((item, index) => (
                            <InfoListItem
                                data-cy={'list-items'}
                                title={
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    <div dangerouslySetInnerHTML={{ __html: item }} />
                                }
                                key={index}
                                hidePadding
                                divider={isMobile || index !== searchResults.length - 1 ? 'full' : undefined}
                            />
                        ))}
                    </Card>
                )}

                {searchResults.length === 0 && (
                    <Typography className={classes.noResults} variant={'body1'}>
                        No results.
                    </Typography>
                )}
            </div>
        </div>
    );
};
