import React from 'react';
import { Drawer as MuiDrawer, Typography, List, Theme, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { TFunction } from 'i18next';

// Load moment.js locales
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/zh-cn';
import 'moment/locale/ar';
import 'moment/locale/pt';

import BoltIcon from '@mui/icons-material/OfflineBolt';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import ErrorIcon from '@mui/icons-material/Error';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

import { english } from './translations/english';
import './translations/i18n';
import { InfoListItem } from '@brightlayer-ui/react-components';

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

type IconArrayType = Array<{ icon: React.ReactNode; flipRTL: boolean }>;

const iconArray: IconArrayType = [
    { icon: <HomeIcon />, flipRTL: false },
    { icon: <FolderIcon />, flipRTL: false },
    { icon: <ErrorIcon />, flipRTL: true },
    { icon: <SettingsIcon />, flipRTL: false },
    { icon: <HelpIcon />, flipRTL: true },
];

const menuItems = english.translations.MENU_ITEMS;

type DrawerProps = {
    R2L: boolean;
    open: boolean;
    drawerToggler: () => void;
    translator: TFunction;
    lang: string;
};

export const Drawer = (props: DrawerProps): JSX.Element => {
    const { R2L, open, drawerToggler, translator: t, lang } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <MuiDrawer
            open={open}
            onClose={drawerToggler}
            classes={{ paper: classes.drawer }}
            anchor={R2L ? 'left' : 'right'}
        >
            <div className={classes.flexVert} style={{ height: '100%', width: '100%' }}>
                <div dir={R2L ? 'rtl' : 'ltr'} className={clsx(classes.flexVertBottom, classes.header)}>
                    <BoltIcon style={{ fontSize: '64px', transform: 'rotate(42deg)' }} />
                    <div style={{ padding: theme.spacing(0.5) }}>
                        <Typography variant={'h5'} color={'inherit'}>
                            {t('Brightlayer')} UI
                        </Typography>
                        <Typography variant={'subtitle1'} color={'inherit'}>
                            {t('I18N')}
                        </Typography>
                        <Typography variant={'subtitle1'} color={'inherit'}>
                            {moment()
                                .locale(lang === 'zh' ? 'zh-cn' : lang)
                                .format('LL')}
                        </Typography>
                    </div>
                </div>
                <div>
                    <List dir={R2L ? 'rtl' : 'ltr'} disablePadding>
                        {Object.keys(menuItems).map((menuItem, index) => (
                            <InfoListItem
                                dense
                                title={t(`MENU_ITEMS.${menuItem}`)}
                                icon={
                                    <div className={clsx({ [classes.RTL]: R2L && iconArray[index].flipRTL })}>
                                        {iconArray[index].icon}
                                    </div>
                                }
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
