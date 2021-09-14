import React, {useState} from 'react';
import { AppBar, Drawer, Hidden, List, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DropdownToolbar, InfoListItem } from '@pxblue/react-components';
// import { useDispatch } from 'react-redux';
// import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@pxblue/colors';

const menuGroups = [
    {
        items: [
            { title: 'All Locations', onClick: (): void => { } },
            { title: 'Gary Steel Works', onClick: (): void => { } },
            { title: 'US Steel', onClick: (): void => { } },
        ],
    },
];

// const bottomSheet = (): JSX.Element => (
//     <Drawer anchor={'bottom'} open={true}>
//         <List>
//         {['All Locations', 'Gary Steel Works', 'US Steel'].map((text) => (
//           <ListItem button key={text}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
// );

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            padding: `0px ${theme.spacing(2)}px`,
        },
    },
    appBarContainer: {
        maxWidth: 960,
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}px`,
    },
    appBar: {
        marginBottom: `${theme.spacing(3)}px`,
        '&:last-child': {
            marginBottom: 0,
        },
    },
    appBarHeader: {
        maxWidth: 600,
        margin: `${theme.spacing(5)}px auto ${theme.spacing(3)}px`,
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    },
    badge: {
        backgroundColor: colors.green[500],
        color: colors.green[500],
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    paper: {
        marginTop: `${theme.spacing(1)}px`,
    },
    subtitle: {
        marginTop: `-${theme.spacing(0.5)}px`,
    },
    textContainer: {
        marginLeft: `${theme.spacing(2.5)}px`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
}));

export const PxbDropdownToolbar = (): JSX.Element => {
    // const dispatch = useDispatch();
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
                                // dispatch({ type: TOGGLE_DRAWER, payload: true });
                                setShowMenu(true)
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
                            /* eslint-disable-next-line no-console */
                            // onClick={(): void => {console.log('clicked'); setShowMenu(true)}}
                            onOpen={(): void => {
                                /* eslint-disable-next-line no-console */
                                console.log('clicked');
                                setShowMenu(true)
                            }}
                            onClose={(): void => {
                                /* eslint-disable-next-line no-console */
                                console.log('clicked false');
                                setShowMenu(false)
                            }}
                            
                        >
                            
                        </DropdownToolbar>
                    </Hidden>
                    <div />
                </Toolbar>
            </AppBar>
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
        </div>
    );
};
