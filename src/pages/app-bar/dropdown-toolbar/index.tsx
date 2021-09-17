import React, { useState } from 'react';
import { AppBar, Drawer, Hidden, List, ListItem, ListItemText, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DropdownToolbar } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const menuGroups = [
    {
        items: [
            { title: 'All Locations', onClick: (): void => {} },
            { title: 'Gary Steel Works', onClick: (): void => {} },
            { title: 'US Steel', onClick: (): void => {} },
        ],
    },
];

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
}));

export const PxbDropdownToolbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
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
                        <DropdownToolbar
                            title={'Appbar Title'}
                            subtitle={'Dropdown Toolbar'}
                            menuGroups={menuGroups}
                        ></DropdownToolbar>
                    </Hidden>
                    <Hidden smUp={true}>
                        <DropdownToolbar
                            title={'Appbar Title'}
                            subtitle={'Dropdown Toolbar'}
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
                                            {['All Locations', 'Gary Steel Works', 'US Steel'].map((text) => (
                                                <ListItem button key={text} onClick={(): void => setShowMenu(false)}>
                                                    <ListItemText primary={text} />
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
                    <div />
                </Toolbar>
            </AppBar>
        </div>
    );
};
