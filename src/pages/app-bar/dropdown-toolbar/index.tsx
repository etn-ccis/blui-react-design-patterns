import React, { useCallback, useState } from 'react';
import { AppBar, useMediaQuery, Toolbar, IconButton, ListItemText, Drawer, List, ListItem } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
// import { ToolbarMenu } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import Typography from '@mui/material/Typography';
import { ToolbarMenu } from '@brightlayer-ui/react-components';
import { GradeA } from '@brightlayer-ui/icons-mui';
import * as Colors from '@brightlayer-ui/colors';
const useStyles = makeStyles((theme: Theme) => ({
    textContent: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        // set margins to default to avoid the height of the app bar exceeding 56px on mobile
        '&.MuiListItemText-multiline': {
            marginTop: '0.25rem',
            marginBottom: '0.25rem',
        },
    },
    root: {
        marginTop: '-0.25rem',
        color: Colors.white[50],
    },
    paper: {
        marginTop: `${theme.spacing(1)}px`,
    },
}));

export const BluiDropdownToolbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // const anchorOriginHorizontal = 'left'
    // const anchorOriginVertical = 'bottom'
    // const transformOriginHorizontal = 'left'
    // const transformOriginVertical = 'top'
    const theme = useTheme();
    // const menuItems = [
    //     { title: 'Menu Item 1'},
    //     { title: 'Menu Item 2'},
    //     { title: 'Menu Item 3'}
    // ];

    // const menuGroups = [
    //     {
    //         items: menuItems,
    //     },
    // ];
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [subtitle, setSubtitle] = useState<string>('Subtitle');
    const updateToolbar = useCallback((subtitleText: string, hideBottomSheet?: boolean): void => {
        if (hideBottomSheet) {
            setShowMenu(false);
        }
        setSubtitle(subtitleText);
    }, []);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
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
            <AppBar color={'primary'}>
            <Toolbar>
                {md ? null : (
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
                        )}
                        {/* <Typography variant={'h6'} color={'inherit'}>
                            Toolbar Menu
                        </Typography> */}
                <ListItemText
                    className={classes.textContent}
                    primary={<Typography variant="h6">Title</Typography>}
                    secondary={
                        <ToolbarMenu
                            classes={{ root: classes.root }}
                            icon={<GradeA />}
                            label={subtitle}
                            menuGroups={menuGroups}
                            // MenuProps={{
                            //     anchorOrigin: {
                            //         horizontal: anchorOriginHorizontal,
                            //         vertical: anchorOriginVertical,
                            //     },
                            //     transformOrigin: {
                            //         horizontal: transformOriginHorizontal,
                            //         vertical: transformOriginVertical,
                            //     },
                            // }}
                            // menu={
                            //     <React.Fragment key={'bottom'}>
                            //         <Drawer
                            //             data-cy="bottom-sheet"
                            //             anchor={'bottom'}
                            //             transitionDuration={250}
                            //             open={showMenu}
                            //             onClose={(): void => setShowMenu(false)}
                            //             classes={{ paper: classes.paper }}
                            //         >
                            //             <List>
                            //                 {menuGroups[0].items.map((text) => (
                            //                     <ListItem
                            //                         button
                            //                         key={text.title}
                            //                         onClick={(): void => updateToolbar(text.title, true)}
                            //                     >
                            //                         <ListItemText primary={text.title} />
                            //                     </ListItem>
                            //                 ))}
                            //             </List>
                            //         </Drawer>
                            //     </React.Fragment>
                            // }
                            onOpen={(): void => {
                                setShowMenu(true);
                            }}
                            onClose={(): void => {
                                setShowMenu(false);
                            }}
                        ></ToolbarMenu>
                    }
                />
            </Toolbar>
        </AppBar>
        </div>
    );
};
