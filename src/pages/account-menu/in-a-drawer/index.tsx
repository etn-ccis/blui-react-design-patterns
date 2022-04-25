import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { BluiDrawer } from './Drawer';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100vh - ${theme.spacing(8)})`,
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - ${theme.spacing(7)})`,
        },
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}`,
    },
    buttonContainer: {
        width: '100%',
        height: `calc(100vh - ${theme.spacing(8)})`,
        display: 'flex',
        padding: 0,
        overflow: 'auto',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - ${theme.spacing(7)})`,
        },
    },
    centerButton: {
        margin: 'auto',
        display: 'flex',
        zIndex: 4,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const InADrawer = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="toolbar" position={'sticky'}>
                <BluiDrawer
                    open={drawerOpen}
                    toggleDrawer={(): void => {
                        setDrawerOpen(!drawerOpen);
                    }}
                />
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
                    <Typography variant={'h6'} color={'inherit'}>
                        In a Drawer
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.buttonContainer}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    startIcon={<MenuOpenIcon />}
                    className={classes.centerButton}
                    onClick={(): void => setDrawerOpen(!drawerOpen)}
                    data-cy={'toggle-drawer'}
                >
                    <Typography noWrap color={'inherit'}>
                        Open Drawer
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
