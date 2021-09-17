import React, { useCallback, useState } from 'react';
import {
    Badge,
    Card,
    Hidden,
    IconButton,
    InputProps,
    TextField,
    Toolbar /*, useMediaQuery*/,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar, EmptyState, InfoListItem, Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Search } from '@material-ui/icons';

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
    desktopSearchContainer: {
        display: 'flex',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}));

const data = ['Apple', 'Grape', 'Orange', 'Pineapple', 'Watermelon'];

export const PageWideSearch = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    // const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const search = (term: string): void => {
        if (term === '') {
            setSearchResults(data);
            return;
        }

        const tempSearchResults = data.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(tempSearchResults);
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
            <AppBar variant={'collapsed'}>
                <Toolbar data-cy={'toolbar'} classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            color={'inherit'}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Page Wide Search
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
            <div className={classes.bodyContent}>
                <div className={classes.desktopSearchContainer}>
                    <Spacer />
                    <TextField label="Search" variant="standard" value={searchTerm} onChange={onSearchTermChange} />
                </div>

                {searchResults.length > 0 && (
                    <Card>
                        {searchResults.map((item, index) => (
                            <InfoListItem
                                title={item}
                                key={index}
                                hidePadding
                                divider={index !== searchResults.length - 1 ? 'full' : undefined}
                            />
                        ))}
                    </Card>
                )}

                {searchResults.length === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: `calc(100vh - ${theme.spacing(8)}px)`,
                            marginTop: `-${theme.spacing(16)}px`,
                        }}
                    >
                        <EmptyState title={'No Results Found'} icon={<Search style={{ fontSize: '100px' }} />} />
                    </div>
                )}
            </div>
        </div>
    );
};
