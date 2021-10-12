import React, { useCallback, useState } from 'react';
import { AppBar, Drawer, Hidden, List, ListItem, ListItemText, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DropdownToolbar } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            padding: `0px ${theme.spacing(2)}px`,
        },
    },
    paper: {
        marginTop: `${theme.spacing(1)}px`,
    },
    arrowDown: {
        '& svg': {
            transform: 'none',
        },
    },
    arrowUp: {
        '& svg': {
            transform: 'rotate(180deg)',
        },
    },
}));

export const PxbDropdownToolbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [subtitle, setSubtitle] = useState<string>('Subtitle');

    const updateToolbar = useCallback((subtitleText: string, hideBottomSheet?: boolean): void => {
        if (hideBottomSheet) {
            setShowMenu(false);
        }
        setSubtitle(subtitleText);
    }, []);

    const menuGroups = [
        {
            items: [
                {
                    title: 'All Locations',
                    onClick: (): void => {
                        updateToolbar('All Locations');
                    },
                },
                {
                    title: 'Gary Steel Works',
                    onClick: (): void => {
                        updateToolbar('Gary Steel Works');
                    },
                },
                {
                    title: 'US Steel',
                    onClick: (): void => {
                        updateToolbar('US Steel');
                    },
                },
            ],
        },
    ];

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }} data-cy={'toolbar'}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown={true}>
                        <DropdownToolbar title={'Title'} subtitle={subtitle} menuGroups={menuGroups}></DropdownToolbar>
                    </Hidden>
                    <Hidden smUp={true}>
                        <DropdownToolbar
                            title={'Title'}
                            subtitle={subtitle}
                            classes={{
                                subtitleContent: showMenu ? classes.arrowUp : classes.arrowDown,
                            }}
                            menu={
                                <React.Fragment key={'bottom'}>
                                    <Drawer
                                        data-cy="bottom-sheet"
                                        anchor={'bottom'}
                                        transitionDuration={250}
                                        open={showMenu}
                                        onClose={(): void => setShowMenu(false)}
                                        classes={{ paper: classes.paper }}
                                    >
                                        <List>
                                            {menuGroups[0].items.map((text) => (
                                                <ListItem
                                                    button
                                                    key={text.title}
                                                    onClick={(): void => updateToolbar(text.title, true)}
                                                >
                                                    <ListItemText primary={text.title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Drawer>
                                </React.Fragment>
                            }
                            onOpen={(): void => {
                                setShowMenu(true);
                            }}
                            onClose={(): void => {
                                setShowMenu(false);
                            }}
                        ></DropdownToolbar>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
};
