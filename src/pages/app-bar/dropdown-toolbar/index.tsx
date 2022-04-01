import React from 'react';
import { AppBar, Hidden, Toolbar, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
// import { ToolbarMenu } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: 0,
        [theme.breakpoints.down('xl')]: {
            padding: `0px ${theme.spacing(2)}`,
        },
    },
    paper: {
        marginTop: theme.spacing(1),
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

export const BluiDropdownToolbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // const [showMenu, setShowMenu] = useState<boolean>(false);
    // const [subtitle, setSubtitle] = useState<string>('Subtitle');

    // const updateToolbar = useCallback((subtitleText: string, hideBottomSheet?: boolean): void => {
    //     if (hideBottomSheet) {
    //         setShowMenu(false);
    //     }
    //     setSubtitle(subtitleText);
    // }, []);

    // const menuGroups = [
    //     {
    //         items: [
    //             {
    //                 title: 'All Locations',
    //                 onClick: (): void => {
    //                     updateToolbar('All Locations');
    //                 },
    //             },
    //             {
    //                 title: 'Gary Steel Works',
    //                 onClick: (): void => {
    //                     updateToolbar('Gary Steel Works');
    //                 },
    //             },
    //             {
    //                 title: 'US Steel',
    //                 onClick: (): void => {
    //                     updateToolbar('US Steel');
    //                 },
    //             },
    //         ],
    //     },
    // ];

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
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    {/* <Hidden lgDown={true}>
                        <ToolbarMenu title={'Title'} subtitle={subtitle} menuGroups={menuGroups}></ToolbarMenu>
                    </Hidden>
                    <Hidden smUp={true}>
                        <ToolbarMenu
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
                        ></ToolbarMenu>
                    </Hidden> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};
