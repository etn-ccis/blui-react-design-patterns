import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AppBar,
    Button,
    Checkbox,
    IconButton,
    List,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Hidden,
    Tooltip,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { english } from './translations/english';
import { DRAWER_WIDTH } from '../../assets/constants';
import { Drawer } from './Drawer';
import './translations/i18n';
require('typeface-noto-sans');

const useStyles = makeStyles((theme: Theme) => ({
    snackbar: {
        [theme.breakpoints.up('md')]: {
            left: `calc((100vw - ${DRAWER_WIDTH}px)/2 + ${DRAWER_WIDTH}px);`,
        },
    },
    snackbarAction: {
        margin: 'auto',
        marginLeft: -theme.spacing(),
        paddingRight: theme.spacing(2),
        paddingLeft: 0,
    },
    icon: {
        fontSize: 16,
        margin: 4,
    },
    RTL: { transform: 'scaleX(-1)' },
    RTLButtonStartIcon: {
        marginRight: theme.spacing(-0.5),
        marginLeft: theme.spacing(),
    },
    rightComponent: {
        marginLeft: 0,
        marginRight: theme.spacing(2),
    },
}));

export const I18N = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t, i18n } = useTranslation();
    const fruits = english.translations.FRUITS;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set<string>());
    const [lang, setLang] = useState('en');
    const isRTL = (): boolean => lang === 'ar';
    const getDirection = (): 'rtl' | 'ltr' => (isRTL() ? 'rtl' : 'ltr');
    const dispatch = useDispatch();

    const changeLanguage = useCallback(
        (lng) => {
            setLang(lng);
            i18n.changeLanguage(lng);
        },
        [i18n]
    );

    useEffect(() => {
        changeLanguage('en');
    }, [changeLanguage]);

    const selectFruit = useCallback(
        (fruit: string): void => {
            const selected = new Set(selectedItems);
            if (selected.has(fruit)) {
                selected.delete(fruit);
            } else {
                selected.add(fruit);
            }
            setSelectedItems(selected);
        },
        [selectedItems]
    );

    return (
        <div dir={getDirection()} style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position={'sticky'}>
                <Drawer
                    open={drawerOpen}
                    R2L={isRTL()}
                    drawerToggler={(): void => {
                        setDrawerOpen(!drawerOpen);
                    }}
                    translator={t}
                />
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton data-cy='toolbar-menu'
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={isRTL() ? 'end' : 'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        {t('I18N')}
                    </Typography>
                    <Spacer />
                    <Tooltip title={t('VIEW_I18N_SIDE_NAV') || ''}>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => setDrawerOpen(!drawerOpen)}
                            edge={isRTL() ? 'start' : 'end'}
                            className={clsx(isRTL() && classes.RTL)}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Toolbar>
                <Select
                    value={lang}
                    onChange={(event): void => changeLanguage(String(event.target.value))}
                    style={{ padding: theme.spacing(0.5), minWidth: theme.spacing(20), marginLeft: theme.spacing(0.5) }}
                >
                    <MenuItem value={'en'}>{t('LANGUAGES.ENGLISH')}</MenuItem>
                    <MenuItem value={'es'}>{t('LANGUAGES.SPANISH')}</MenuItem>
                    <MenuItem value={'de'}>{t('LANGUAGES.GERMAN')}</MenuItem>
                    <MenuItem value={'ar'}>{t('LANGUAGES.ARABIC')}</MenuItem>
                    <MenuItem value={'fr'}>{t('LANGUAGES.FRENCH')}</MenuItem>
                    <MenuItem value={'pt'}>{t('LANGUAGES.PORTUGUESE')}</MenuItem>
                    <MenuItem value={'zh'}>{t('LANGUAGES.CHINESE')}</MenuItem>
                </Select>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    style={{ margin: theme.spacing(2) }}
                    classes={isRTL() ? { startIcon: classes.RTLButtonStartIcon } : undefined}
                    startIcon={<CartIcon className={clsx(classes.icon, isRTL() && classes.RTL)} />}
                >
                    <Typography noWrap color={'inherit'}>
                        {t('ADD_TO_CART')}
                    </Typography>
                </Button>
            </Toolbar>

            <List id={'item-list'}>
                {Object.keys(fruits).map((fruit, index) => (
                    <InfoListItem
                        key={index}
                        onClick={(): void => selectFruit(fruit)}
                        ripple={true}
                        style={{ textAlign: isRTL() ? 'right' : 'left' }}
                        title={t(`FRUITS.${fruit}`)}
                        subtitle={t('MORE_INFO')}
                        icon={<Checkbox checked={selectedItems.has(fruit)} onChange={(): void => selectFruit(fruit)} />}
                        rightComponent={<ArrowForwardIosIcon className={clsx(classes.icon, isRTL() && classes.RTL)} />}
                        classes={{ rightComponent: isRTL() ? classes.rightComponent : undefined }}
                    />
                ))}
            </List>

            <Snackbar open={selectedItems.size > 0} classes={{ root: classes.snackbar }}>
                <SnackbarContent
                    action={
                        <>
                            <Tooltip title={t('DESELECT_ALL') || ''}>
                                <IconButton
                                    onClick={(): void => {
                                        setSelectedItems(new Set());
                                    }}
                                    color={'inherit'}
                                    id={'deselect-all-button'}
                                    data-cy={'snackbar-deselect-all'}
                                >
                                    <CancelIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                    message={`${selectedItems.size} ${t('ITEMS')}`}
                    classes={{ action: clsx(isRTL() && classes.snackbarAction) }}
                />
            </Snackbar>
        </div>
    );
};
