import React, { useState, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@brightlayer-ui/colors';
import ListItemText from '@mui/material/ListItemText';
import { ToolbarMenu } from '@brightlayer-ui/react-components';
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
        marginTop: `${theme.spacing(1)}`,
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}`,
    },
}));

export const BluiToolbarMenu = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [subtitle, setSubtitle] = useState<string>('Subtitle');
    const updateToolbar = useCallback(
        (subtitleText: string, hideBottomSheet?: boolean): void => {
            if (hideBottomSheet) {
                setShowMenu(false);
            }
            setSubtitle(subtitleText);
        },
        [showMenu, subtitle]
    );

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
            <AppBar data-cy="blui-toolbar" position={'sticky'}>
                {!md ? null : (
                    <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                        {md ? null : (
                            <IconButton
                                data-cy="toolbar-menu"
                                color={'inherit'}
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: true });
                                }}
                                edge={'start'}
                                style={{ marginRight: 20 }}
                                size="large"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <ListItemText
                            className={classes.textContent}
                            primary={<Typography variant="h6">Title</Typography>}
                            secondary={
                                <ToolbarMenu
                                    classes={{ root: classes.root }}
                                    label={subtitle}
                                    menuGroups={menuGroups}
                                    onOpen={(): void => {
                                        setShowMenu(true);
                                    }}
                                    onClose={(): void => {
                                        setShowMenu(false);
                                    }}
                                ></ToolbarMenu>
                            }
                        />
                        <div />
                    </Toolbar>
                )}
                {md ? null : (
                    <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                        {md ? null : (
                            <IconButton
                                data-cy="toolbar-menu"
                                color={'inherit'}
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: true });
                                }}
                                edge={'start'}
                                style={{ marginRight: 20 }}
                                size="large"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <ListItemText
                            className={classes.textContent}
                            primary={<Typography variant="h6">Title</Typography>}
                            secondary={
                                <ToolbarMenu
                                    classes={{ root: classes.root }}
                                    label={subtitle}
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
                            }
                        />
                        <div />
                    </Toolbar>
                )}
            </AppBar>
        </div>
    );
};
