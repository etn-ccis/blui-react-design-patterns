import React from 'react';
import { Avatar, Drawer as MuiDrawer, IconButton, Typography, makeStyles, Theme, useTheme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    closeIcon: {
        marginRight: `-${theme.spacing(2)}px`,
        marginTop: `-${theme.spacing(2)}px`,
    },
    drawer: {
        maxWidth: '85%',
        width: 292,
    },
    drawerAvatar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    header: {
        // height: '180px',
        color: 'white',
        background: theme.palette.primary.main,
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(0.5)}px`,
    },
    flexVert: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    flexVertBottom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    subtitle: {
        marginTop: `-${theme.spacing(0.5)}px`,
    },
}));

type DrawerProps = {
    open: boolean;
    drawerToggler: () => void;
};

const avatarImage = require('../../../assets/avatar_40.png').default;

export const Drawer = (props: DrawerProps): JSX.Element => {
    const { open, drawerToggler } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <MuiDrawer
            open={open}
            onClose={drawerToggler}
            classes={{ paper: classes.drawer }}
            anchor='left'
        >
            <div className={classes.flexVert} style={{ height: '100%', width: '100%' }}>
                <div className={clsx(classes.flexVertBottom, classes.header)}>
                    <div className={classes.drawerAvatar}>
                        <Avatar alt="Chima Thabani" src={avatarImage} />
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            edge={'end'}
                            classes={{ edgeEnd: classes.closeIcon }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Typography variant={'h6'} color={'inherit'}>
                        Chima Thabani
                    </Typography>
                    <Typography variant={'body1'} color={'inherit'} className={classes.subtitle}>
                        CThabani@example.com
                    </Typography>
                </div>
                <div>
                    <Typography>Test</Typography>
                </div>
            </div>
        </MuiDrawer>
    );
};
