import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { AppBar, Slide } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Language, Email, Sms, MoreVert, Edit, ArrowBack } from '@mui/icons-material';
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
        padding: `0 ${theme.spacing(2)}`,
        display: 'flex',
        justifyContent: 'space-between',
    },
    listItemText: {
        marginLeft: 0,
    },
    accordionContainer: {
        maxWidth: 768,
        margin: '0 auto',
        padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            margin: `0 auto ${theme.spacing(3)} auto`,
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
        [theme.breakpoints.down('md')]: {
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
    changeBackgroundColor: {
        [theme.breakpoints.up('md')]: {
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
    deviceEditMobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
        },
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

const getTitle = (deviceStatus: string, device: string, isMobile: boolean, classes: Record<string, any>): ReactNode => (
    <div className={classes.listItemTitle}>
        <Typography variant={'subtitle1'} noWrap>
            {deviceStatus}
        </Typography>
        {!isMobile && (
            <Typography variant={'body1'} noWrap>
                : &nbsp;{device}
            </Typography>
        )}
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
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
            return md ? null : (
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
            );
        }
        return (
            <IconButton
                data-cy="toolbar-menu"
                color={'inherit'}
                onClick={onBackNavigation}
                edge={'start'}
                style={{ marginRight: 20 }}
                size="large"
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
                tempSubTitle = 'Deutsch (Germany)';
                break;
            case 'espanol':
                tempSubTitle = 'Español (Spain)';
                break;
            case 'francais':
                tempSubTitle = 'Français (France)';
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
                                    title={getTitle('Battery Service', 'Eaton GH142', isMobile, classes)}
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
                                    title={getTitle('Bypass Over Frequency', 'A2 Max Reveal', isMobile, classes)}
                                    divider={'full'}
                                    hidePadding
                                    rightComponent={
                                        <>
                                            <IconButton edge={'end'} onClick={openMenu} size="large">
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
                                    title={getTitle('Device', subTitle, isMobile, classes)}
                                    subtitleSeparator={' '}
                                    hidePadding
                                    rightComponent={
                                        <IconButton edge={'end'} onClick={handleEditDeviceClick} size="large">
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
                                        root: classes.changeBackgroundColor,
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
                <div className={classes.deviceEditMobileContainer}>
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
