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
    Snackbar,
    SnackbarContent,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import clsx from 'clsx';

import MenuIcon from '@mui/icons-material/Menu';
import CartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { english } from './translations/english';
import { DRAWER_WIDTH } from '../../assets/constants';
import { Drawer } from './Drawer';
import './translations/i18n';

import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';

const useStyles = makeStyles((theme: Theme) => ({
    snackbar: {
        [theme.breakpoints.up('md')]: {
            left: `calc((100vw - ${DRAWER_WIDTH}px)/2 + ${DRAWER_WIDTH}px);`,
        },
    },
    snackbarAction: {
        margin: 'auto',
        marginLeft: theme.spacing(-1),
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
        marginLeft: theme.spacing(1),
    },
    rightComponent: {
        marginLeft: 0,
        marginRight: theme.spacing(2),
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    listItemButtonRoot: {
        textAlign: 'right',
    },
}));

export const I18N = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t, i18n } = useTranslation();
    const [fruits] = useState(
        Object.keys(english.translations.FRUITS).map((fruit) => ({
            name: fruit,
            price: Math.round((Math.random() + Number.EPSILON) * 1000) / 100,
        }))
    );

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set<string>());
    const [lang, setLang] = useState('en');
    const isRTL = (): boolean => lang === 'ar';
    const getDirection = (): 'rtl' | 'ltr' => (isRTL() ? 'rtl' : 'ltr');
    const dispatch = useDispatch();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const changeLanguage = useCallback(
        (lng) => {
            setLang(lng);
            void i18n.changeLanguage(lng);
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
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Drawer
                    open={drawerOpen}
                    R2L={isRTL()}
                    lang={lang}
                    drawerToggler={(): void => {
                        setDrawerOpen(!drawerOpen);
                    }}
                    translator={t}
                />
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy={'toolbar-menu'}
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={isRTL() ? 'end' : 'start'}
                            style={{ marginRight: isRTL() ? '' : 20, marginLeft: isRTL() ? 20 : '' }}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography data-cy={'toolbar-title'} variant={'h6'} color={'inherit'}>
                        {t('I18N')}
                    </Typography>
                    <Spacer />
                    <Tooltip title={t('VIEW_I18N_SIDE_NAV') || ''}>
                        <IconButton
                            data-cy={'R2L-menu'}
                            color={'inherit'}
                            onClick={(): void => setDrawerOpen(!drawerOpen)}
                            edge={isRTL() ? 'start' : 'end'}
                            className={clsx(isRTL() && classes.RTL)}
                            size="large"
                        >
                            <MenuOpenIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Toolbar>
                <Select
                    data-cy={'change-language'}
                    value={lang}
                    onChange={(event): void => changeLanguage(String(event.target.value))}
                    style={{ padding: theme.spacing(0.5), minWidth: theme.spacing(20), marginLeft: theme.spacing(0.5) }}
                    variant="standard"
                >
                    <MenuItem value={'en'}>{t('LANGUAGES.ENGLISH')}</MenuItem>
                    <MenuItem value={'ar'}>{t('LANGUAGES.ARABIC')}</MenuItem>
                    <MenuItem value={'zh'}>{t('LANGUAGES.CHINESE')}</MenuItem>
                    <MenuItem value={'fr'}>{t('LANGUAGES.FRENCH')}</MenuItem>
                    <MenuItem value={'de'}>{t('LANGUAGES.GERMAN')}</MenuItem>
                    <MenuItem value={'pt'}>{t('LANGUAGES.PORTUGUESE')}</MenuItem>
                    <MenuItem value={'es'}>{t('LANGUAGES.SPANISH')}</MenuItem>
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
                {fruits.map((fruit, index) => (
                    <InfoListItem
                        data-cy={'list-item-row'}
                        key={index}
                        onClick={(): void => selectFruit(fruit.name)}
                        ripple={true}
                        style={{ textAlign: isRTL() ? 'right' : 'left' }}
                        title={t(`FRUITS.${fruit.name}`)}
                        subtitle={t('CURRENCY', { price: fruit.price })}
                        icon={
                            <Checkbox
                                checked={selectedItems.has(fruit.name)}
                                onChange={(): void => selectFruit(fruit.name)}
                            />
                        }
                        classes={{
                            rightComponent: isRTL() ? classes.rightComponent : undefined,
                            listItemButtonRoot: isRTL() ? classes.listItemButtonRoot : undefined,
                        }}
                    />
                ))}
            </List>

            <Snackbar
                open={selectedItems.size > 0}
                classes={{ root: classes.snackbar }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
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
                                    size="large"
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
