import React from 'react';
import { Drawer as MuiDrawer, Typography, List, makeStyles, Theme, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import BoltIcon from '@material-ui/icons/OfflineBolt';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import ErrorIcon from '@material-ui/icons/Error';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

import { english } from './translations/english';
import './translations/i18n';
import { InfoListItem } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        maxWidth: '85%',
        width: 350,
    },
    header: {
        height: '180px',
        color: 'white',
        background: theme.palette.primary.main,
        padding: theme.spacing(2),
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
    RTL: { transform: 'scaleX(-1)' },
}));

// eslint-disable-next-line react/jsx-key
const iconArray = [<HomeIcon />, <FolderIcon />, <ErrorIcon />, <SettingsIcon />, <HelpIcon />];

const menuItems = english.translations.MENU_ITEMS;

type DrawerProps = {
    R2L: boolean;
    open: boolean;
    drawerToggler: () => void;
    translator: TFunction;
};

export const Drawer = (props: DrawerProps): JSX.Element => {
    const { R2L, open, drawerToggler, translator: t } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <MuiDrawer
            open={open}
            onClose={drawerToggler}
            classes={{ paper: classes.drawer }}
            anchor={R2L ? 'right' : 'left'}
        >
            <div className={classes.flexVert} style={{ height: '100%', width: '100%' }}>
                <div dir={R2L ? 'rtl' : 'ltr'} className={clsx(classes.flexVertBottom, classes.header)}>
                    <BoltIcon style={{ fontSize: '64px', transform: 'rotate(42deg)' }} />
                    <div style={{ padding: theme.spacing(0.5) }}>
                        <Typography variant={'h5'} color={'inherit'}>
                            PX {t('BLUE')}
                        </Typography>
                        <Typography variant={'subtitle1'} color={'inherit'}>
                            {t('I18N')}
                        </Typography>
                    </div>
                </div>
                <div>
                    <List dir={R2L ? 'rtl' : 'ltr'} disablePadding>
                        {Object.keys(menuItems).map((menuItem, index) => (
                            <InfoListItem
                                dense
                                title={t(`MENU_ITEMS.${menuItem}`)}
                                icon={<div className={clsx(R2L && classes.RTL)}>{iconArray[index]}</div>}
                                key={menuItem}
                                onClick={drawerToggler}
                                style={R2L ? { textAlign: 'right' } : undefined}
                            />
                        ))}
                    </List>
                </div>
            </div>
        </MuiDrawer>
    );
};
