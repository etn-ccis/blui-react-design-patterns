import React, { useState } from 'react';
import { AppBar, Drawer, Hidden, List, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DropdownToolbar, InfoListItem } from '@pxblue/react-components';
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
                                setShowMenu(true);
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smDown={true}>
                        <DropdownToolbar
                            title={'Appbar Title'}
                            subtitle={'Dropdown Toolbar'}
                            menuGroups={menuGroups}
                        ></DropdownToolbar>
                    </Hidden>
                    <Hidden mdUp={true}>
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
                                        <List disablePadding>
                                            <InfoListItem
                                                data-cy="list-1"
                                                dense
                                                onClick={(): void => setShowMenu(false)}
                                                title={'All Locations'}
                                            />
                                            <InfoListItem
                                                data-cy="list-2"
                                                dense
                                                onClick={(): void => setShowMenu(false)}
                                                title={'Gary Steel Works'}
                                            />
                                            <InfoListItem
                                                data-cy="list-3"
                                                dense
                                                onClick={(): void => setShowMenu(false)}
                                                title={'US Steel'}
                                            />
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
