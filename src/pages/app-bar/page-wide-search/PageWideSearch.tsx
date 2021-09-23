import React, { useCallback, useState } from 'react';
import {
    Badge,
    Card,
    Divider,
    Hidden,
    IconButton,
    InputProps,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, InfoListItem, Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Close, Search } from '@material-ui/icons';
import * as PXBColors from '@pxblue/colors';

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
    },
    toolbarRightContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    appBar: {
        zIndex: 10000,
    },
    mobileAppbar: {
        height: theme.spacing(7),
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
        margin: `0 ${theme.spacing(4)}px`,
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            borderRadius: 0,
        },
    },
    noResults: {
        margin: `0 ${theme.spacing(4)}px`,
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(4),
        },
    },
}));

const data = ['Apple', 'Grape', 'Orange', 'Pineapple', 'Watermelon'];

export const PageWideSearch = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const search = (term: string): void => {
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
    };

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
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            color={'inherit'}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        {isMobile ? 'Page Search' : 'Page Wide Search'}
                    </Typography>
                    <Spacer />
                    <div className={classes.toolbarRightContent}>
                        <IconButton color={'inherit'}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <Badge color="error" badgeContent={88}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {isMobile && (
                <AppBar variant={'collapsed'} className={classes.mobileAppbar} elevation={0}>
                    <Toolbar className={classes.mobileSearchToolbar}>
                        <TextField
                            placeholder="Search"
                            variant="standard"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <Search style={{ marginRight: theme.spacing(4), color: PXBColors.gray[500] }} />
                                ),
                                endAdornment: searchTerm.length > 0 && (
                                    <Close
                                        onClick={(): void => {
                                            setSearchTerm('');
                                            search('');
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            color: PXBColors.gray[500],
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
                            placeholder="Search"
                            variant="standard"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            InputProps={{
                                startAdornment: <Search style={{ color: PXBColors.gray[500], marginRight: 8 }} />,
                            }}
                        />
                    </div>
                )}

                {searchResults.length > 0 && (
                    <Card className={classes.resultsCard}>
                        {searchResults.map((item, index) => (
                            <InfoListItem
                                title={
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    <div dangerouslySetInnerHTML={{ __html: item }} />
                                }
                                key={index}
                                hidePadding
                                divider={index !== searchResults.length - 1 ? 'full' : undefined}
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
