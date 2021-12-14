import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { AppBar, Slide } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Language, Email, Sms, MoreVert, Edit, ArrowBack } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import { InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import { LocalActionsScoreCard } from './scorecard';
import { LanguageSelect } from './select-language';
import { LanguageSelectMobile } from './select-language-mobile';
import { DeviceEdit } from './device-edit';
import { DeviceEditMobile } from './device-edit-mobile';

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
        display: 'flex',
        justifyContent: 'space-between',
    },
    listItemText: {
        marginLeft: 0,
    },
    accordionContainer: {
        maxWidth: 768,
        margin: '0 auto',
        padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            margin: `0 auto ${theme.spacing(3)}px auto`,
            padding: 0,
        },
    },
    accordionRoot: {
        marginBottom: theme.spacing(2),
        borderRadius: 4,
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            marginBottom: theme.spacing(2),
        },
        '& .MuiAccordionSummary-root': {
            height: theme.spacing(6),
            minHeight: theme.spacing(6),
            '&.Mui-expanded': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            boxShadow: 'none',
            borderRadius: 0,
            '&:before': {
                display: 'none',
            },
            '& .MuiAccordionSummary-root': {
                height: theme.spacing(6),
                minHeight: theme.spacing(6),
                '&.Mui-expanded': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    margin: 0,
                },
            },
        },
    },
    accordionSummary: {
        pointerEvents: 'none',
    },
    accordionDetails: {
        display: 'block',
        padding: 0,
    },
    listItemTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    menu: {
        width: 154,
    },
    menuList: {
        padding: 0,
        '&>*': { height: theme.spacing(6) },
    },
}));

const getTitle = (deviceStatus: string, device: string, classes: Record<string, any>): ReactNode => (
    <div className={classes.listItemTitle}>
        <Typography variant={'subtitle1'} noWrap>
            {deviceStatus}
        </Typography>
        <Typography variant={'body1'} noWrap>
            : &nbsp;{device}
        </Typography>
    </div>
);

type Screens =
    | 'localItemActionScreen'
    | 'batteryServiceScreen'
    | 'editDeviceScreen'
    | 'mobileLanguageSelectScreen'
    | 'desktopLanguageSelectScreen';

export const ActionListLocalActions = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(theme);

    const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(false);
    const [isSmsNotificationsEnabled, setIsSmsNotificationsEnabled] = useState(true);
    const [activeScreen, setActiveScreen] = useState<Screens>('localItemActionScreen');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showDeviceEditDialog, setShowDeviceEditDialog] = useState(false);
    const [subTitle, setSubTitle] = useState('A2 Max Reveal');
    const [language, setLanguage] = useState('english');

    const inputEl = useRef<HTMLInputElement>(null);
    const slideAnimationDurationMs = 250;
    const exitSlideAnimationDurationMs = 0;

    const onShowBatteryServiceDetailsClick = useCallback((): void => {
        setActiveScreen('batteryServiceScreen');
    }, []);

    const onBackNavigation = useCallback((): void => {
        setActiveScreen('localItemActionScreen');
    }, []);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (): void => {
        setAnchorEl(null);
    };

    const handleEditDeviceClick = useCallback((): void => {
        if (isMobile) setActiveScreen('editDeviceScreen');
        if (!isMobile) setShowDeviceEditDialog(true);
    }, [isMobile]);

    useEffect(() => {
        if (activeScreen === 'editDeviceScreen' && inputEl.current) {
            inputEl.current.focus();
        }
    }, [activeScreen]);

    const getToolbarIcon = useCallback((): ReactNode => {
        if (activeScreen === 'localItemActionScreen') {
            return (
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
            );
        }
        return (
            <IconButton
                data-cy="toolbar-menu"
                color={'inherit'}
                onClick={onBackNavigation}
                edge={'start'}
                style={{ marginRight: 20 }}
            >
                <ArrowBack />
            </IconButton>
        );
    }, [activeScreen]);

    const getToolbarTitle = useCallback((): string => {
        let tempTitle = '';
        switch (activeScreen) {
            case 'localItemActionScreen':
                tempTitle = 'Local Item Actions';
                break;
            case 'batteryServiceScreen':
                tempTitle = 'Battery Service';
                break;
            case 'editDeviceScreen':
                tempTitle = 'Device';
                break;
            case 'mobileLanguageSelectScreen':
                tempTitle = 'Language';
                break;
            default:
                tempTitle = 'Local Item Actions';
                break;
        }
        return tempTitle;
    }, [activeScreen]);

    const getSubtitleByLanguage = useCallback((): string => {
        let tempSubTitle = '';
        switch (language) {
            case 'english':
                tempSubTitle = 'English (United States)';
                break;
            case 'deutsch':
                tempSubTitle = 'Deutsch';
                break;
            case 'espanol':
                tempSubTitle = 'Español';
                break;
            case 'francais':
                tempSubTitle = 'Français';
                break;
            default:
                tempSubTitle = 'English (United States)';
        }
        return tempSubTitle;
    }, [language]);

    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {getToolbarIcon()}
                    <Typography variant={'h6'} color={'inherit'}>
                        {getToolbarTitle()}
                    </Typography>
                    <Spacer />
                </Toolbar>
            </AppBar>
            <Slide
                direction={'right'}
                in={activeScreen === 'localItemActionScreen'}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: slideAnimationDurationMs, exit: exitSlideAnimationDurationMs }}
            >
                <div className={classes.accordionContainer}>
                    <Accordion
                        key={'today'}
                        data-testid="accordion"
                        defaultExpanded={true}
                        classes={{ root: classes.accordionRoot }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant={'subtitle2'} color={'primary'}>
                                Today
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetails }}>
                            <List className={'list'} disablePadding>
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    title={getTitle('Battery Service', 'Eaton GH142', classes)}
                                    data-testid="infoListItem"
                                    divider={'full'}
                                    hidePadding
                                    onClick={onShowBatteryServiceDetailsClick}
                                    chevron
                                />
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    data-testid="infoListItem"
                                    title={getTitle('Bypass Over Frequency', 'A2 Max Reveal', classes)}
                                    divider={'full'}
                                    hidePadding
                                    rightComponent={
                                        <>
                                            <IconButton edge={'end'} onClick={openMenu}>
                                                <MoreVert />
                                            </IconButton>
                                            <Menu
                                                classes={{ paper: classes.menu, list: classes.menuList }}
                                                id="more-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={closeMenu}
                                            >
                                                <MenuItem onClick={closeMenu}>Edit</MenuItem>
                                                <MenuItem onClick={closeMenu}>Delete</MenuItem>
                                                <MenuItem onClick={closeMenu}>Export</MenuItem>
                                            </Menu>
                                        </>
                                    }
                                />
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    data-testid="infoListItem"
                                    title={getTitle('Device', subTitle, classes)}
                                    subtitleSeparator={' '}
                                    hidePadding
                                    rightComponent={
                                        <IconButton edge={'end'} onClick={handleEditDeviceClick}>
                                            <Edit />
                                        </IconButton>
                                    }
                                    divider={isMobile ? 'full' : undefined}
                                />
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        key={'Notifications'}
                        data-testid="accordion"
                        defaultExpanded={true}
                        TransitionProps={{ in: true }}
                        classes={{ root: classes.accordionRoot }}
                    >
                        <AccordionSummary classes={{ root: classes.accordionSummary }}>
                            <Typography variant={'subtitle2'} color={'primary'}>
                                Notifications
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetails }}>
                            <List className={'list'} disablePadding>
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    title={'Email Notifications'}
                                    data-testid="infoListItem"
                                    subtitle={isEmailNotificationsEnabled ? 'Enabled' : 'Disabled'}
                                    rightComponent={
                                        <Switch
                                            checked={isEmailNotificationsEnabled}
                                            onChange={(): void => {
                                                setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled);
                                            }}
                                        />
                                    }
                                    divider={'partial'}
                                    icon={<Email />}
                                    iconAlign="left"
                                />
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    data-testid="infoListItem"
                                    title={'SMS Notifications'}
                                    subtitle={isSmsNotificationsEnabled ? 'Enabled' : 'Disabled'}
                                    rightComponent={
                                        <Switch
                                            checked={isSmsNotificationsEnabled}
                                            onChange={(): void => {
                                                setIsSmsNotificationsEnabled(!isSmsNotificationsEnabled);
                                            }}
                                        />
                                    }
                                    icon={<Sms />}
                                    iconAlign="left"
                                    divider={isMobile ? 'full' : undefined}
                                />
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        key={'Locale'}
                        data-testid="accordion"
                        defaultExpanded={true}
                        TransitionProps={{ in: true }}
                        classes={{ root: classes.accordionRoot }}
                        onChange={(event: any): void => {
                            event.preventDefault();
                        }}
                    >
                        <AccordionSummary classes={{ root: classes.accordionSummary }}>
                            <Typography variant={'subtitle2'} color={'primary'}>
                                Locale
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetails }}>
                            <List className={'list'} disablePadding>
                                <InfoListItem
                                    classes={{
                                        listItemText: classes.listItemText,
                                    }}
                                    data-testid="infoListItem"
                                    title={'Language'}
                                    subtitle={getSubtitleByLanguage()}
                                    icon={<Language />}
                                    hidePadding
                                    iconAlign="left"
                                    rightComponent={
                                        isMobile ? undefined : (
                                            <LanguageSelect
                                                language={language}
                                                updateLanguage={(updatedLanguage): void => {
                                                    setLanguage(updatedLanguage);
                                                }}
                                            />
                                        )
                                    }
                                    chevron
                                    onClick={
                                        isMobile
                                            ? (): void => {
                                                  setActiveScreen('mobileLanguageSelectScreen');
                                              }
                                            : undefined
                                    }
                                    divider={isMobile ? 'full' : undefined}
                                />
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Slide>
            <Slide
                direction={'left'}
                in={activeScreen === 'batteryServiceScreen'}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: slideAnimationDurationMs, exit: exitSlideAnimationDurationMs }}
            >
                <div>
                    <LocalActionsScoreCard />
                </div>
            </Slide>
            <Slide
                direction={'left'}
                in={activeScreen === 'editDeviceScreen'}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: slideAnimationDurationMs, exit: exitSlideAnimationDurationMs }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
                    <DeviceEditMobile
                        navigateBack={(): void => onBackNavigation()}
                        subTitle={subTitle}
                        updateSubTitle={(updatedSubTitle): void => {
                            setSubTitle(updatedSubTitle);
                        }}
                    />
                </div>
            </Slide>
            <Slide
                direction={'left'}
                in={activeScreen === 'mobileLanguageSelectScreen'}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: slideAnimationDurationMs, exit: exitSlideAnimationDurationMs }}
            >
                <div>
                    <LanguageSelectMobile
                        language={language}
                        updateLanguage={(updatedLanguage): void => {
                            setLanguage(updatedLanguage);
                        }}
                        navigateBack={(): void => onBackNavigation()}
                    />
                </div>
            </Slide>
            <DeviceEdit
                open={showDeviceEditDialog}
                handleClose={(): void => setShowDeviceEditDialog(false)}
                subTitle={subTitle}
                updateSubTitle={(updatedSubTitle): void => {
                    setSubTitle(updatedSubTitle);
                }}
            />
        </div>
    );
};
