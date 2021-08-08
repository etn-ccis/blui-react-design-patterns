import React, {useState}from 'react';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Hidden,
    IconButton
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Drawer } from './Drawer';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
        },
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}px`,
    },
    buttonContainer: {
        width: '100%',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        display: 'flex',
        padding: 0,
        overflow: 'auto',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
        },
    },
    centerButton: {
        margin: 'auto',
        display: 'flex',
        zIndex: 4,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}));

export const InADrawer = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
            <Drawer
                    open={drawerOpen}
                    drawerToggler={(): void => {
                        setDrawerOpen(!drawerOpen);
                    }}
                />
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
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
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        In a Drawer
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div  className={classes.buttonContainer}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    startIcon={<MenuOpenIcon/>}
                    className={classes.centerButton}
                    onClick={(): void => setDrawerOpen(!drawerOpen)}
                >
                    <Typography noWrap color={'inherit'}>
                    Open Drawer
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
