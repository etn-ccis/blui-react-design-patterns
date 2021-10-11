import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
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
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Chevron from '@material-ui/icons/ChevronRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag, InfoListItemProps } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';
import { Maintenance } from '@pxblue/icons-mui';

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    timeStamp: {
        fontWeight: 700,
    },
    abbreviation: {
        fontWeight: 400,
        marginLeft: 4,
    },
    listItemTextWithoutIcon: {
        marginLeft: '-56px',
    },
    listItemText: {
        marginLeft: '0px',
    },
    accordionRoot: {
        width: '768px',
        boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        '& .MuiAccordionSummary-root': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: '48px',
            minHeight: '48px',
        },
    },
    accordionMobileRoot: {
        width: '100%',
        '& .MuiAccordionSummary-root': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: '48px',
            minHeight: '48px',
        },
    },
    accordionSummaryText: {
        color: colors.blue[500],
    },
    accordionDetails: {
        display: 'block',
        padding: 0,
    },
    toolbarRightContent: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

const getTitle = (deviceStatus: string, device: string, hasTimeStamp: boolean, isMobile = false): ReactNode => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            color: colors.black[500],
            fontWeight: 400,
            marginLeft: hasTimeStamp ? '33px' : 'auto',
        }}
    >
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

const getSubtitle = (
    station: string,
    location: string,
    hasTimeStamp: boolean,
    isMobile = false
): string | Array<string | JSX.Element> | undefined => [
    <div
        key="subtitle"
        style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: hasTimeStamp ? '32px' : 'auto',
        }}
    >
        <Typography variant="body2" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {station}{' '}
        </Typography>
        {!isMobile && (
            <Typography variant="caption">
                &nbsp; {`<`} &nbsp; {location}
            </Typography>
        )}
    </div>,
];

const getLeftComponent = (time: string, timePeriod: 'AM' | 'PM', date: string, hasIcon: boolean): ReactNode => (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: hasIcon ? '' : '-56px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ fontWeight: 700, fontSize: '12px' }}>{time}</Typography>
            <Typography variant={'caption'} style={{ fontWeight: 400, marginLeft: '4px' }}>
                {timePeriod}
            </Typography>
        </div>
        <Typography variant={'caption'}>{date}</Typography>
    </div>
);

const getRightComponent = (): ReactNode => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
        <ListItemTag
            label={'active'}
            backgroundColor={colors.red[500]}
            style={{ marginLeft: '16px', marginRight: '32px' }}
        />
        <Chevron color={'inherit'} role={'button'} />
    </div>
);

const getInfoComponent = (tag: boolean, isMobile: boolean): string | Array<string | JSX.Element> | undefined => {
    if (tag && isMobile) {
        return [
            <div
                key="info"
                style={{
                    display: 'flex',
                    margin: '4px 0px 4px 32px',
                }}
            >
                <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                <ListItemTag
                    label={'active'}
                    backgroundColor={colors.red[500]}
                    style={{ marginLeft: '16px', marginRight: '32px' }}
                />
            </div>,
        ];
    }
    return undefined;
};

const createInfoListItemConfig = (
    randomStatus: string,
    hasIcon = true,
    hasTimeStamp = true,
    tag = false,
    isMobile = false
): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: getTitle('Bypass Over Frequency', 'A2 Max Reval', hasTimeStamp, isMobile),
                subtitle: getSubtitle('Tuscarawas R.', 'Beaver', hasTimeStamp, isMobile),
                icon: hasIcon ? <NotificationIcon /> : undefined,
                iconColor: hasIcon ? colors.gray[500] : undefined,
                statusColor: 'transparent',
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/2021', hasIcon) : undefined,
            };
        case 'alarm-active':
            return {
                title: getTitle('High Humidity', 'PX341 sensor level 9', hasTimeStamp, isMobile),
                subtitle: getSubtitle('Cherrington Station', 'Moon Township', hasTimeStamp, isMobile),
                info: getInfoComponent(tag, isMobile),
                icon: hasIcon ? <NotificationsActiveIcon /> : undefined,
                iconColor: colors.white[50],
                statusColor: colors.red[500],
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/2021', hasIcon) : undefined,
                chevron: true,
                rightComponent: tag && !isMobile && getRightComponent(),
            };
        case 'setting-active':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', hasTimeStamp, isMobile),
                subtitle: getSubtitle('Cherrington Station', 'Moon Township', hasTimeStamp, isMobile),
                statusColor: colors.orange[500],
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.orange[500],
                iconAlign: 'center',
                leftComponent: hasTimeStamp ? getLeftComponent('7:48', 'AM', '11/23/2021', hasIcon) : undefined,
            };
        case 'setting':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', hasTimeStamp, isMobile),
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.gray[500],
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/2021', hasIcon) : undefined,
            };
        case 'normal':
        default:
            return {
                title: `Item ${randomStatus}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/2021', hasIcon) : undefined,
            };
    }
};

const list = [
    {
        variantIndices: ['alarm-active', 'setting-active', 'alarm'],
        headerText: 'With Time Stamps, with Title+SubTitle+Info',
        hasIcon: true,
        hasTimeStamp: true,
        tag: true,
    },
    {
        variantIndices: ['alarm-active', 'setting'],
        headerText: 'Without Icons, with Title',
        hasIcon: false,
        hasTimeStamp: false,
        tag: false,
    },
    {
        variantIndices: ['alarm-active', 'setting'],
        headerText: 'With Icons, with Title',
        hasIcon: true,
        hasTimeStamp: false,
        tag: false,
    },
];

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(theme);

    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                        Status Lists
                    </Typography>
                    <div className={classes.toolbarRightContent}>
                        <IconButton color={'inherit'}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <Badge color="error" badgeContent={88}>
                                <NotificationIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color={'inherit'}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {list.map((listItem) => (
                <Accordion
                    elevation={0}
                    key={listItem.headerText}
                    defaultExpanded={true}
                    style={{
                        margin: isMobile ? '0 0 24px 0' : '24px auto',
                    }}
                    classes={{ root: isMobile ? classes.accordionMobileRoot : classes.accordionRoot }}
                >
                    <AccordionSummary expandIcon={<ExpandLess />}>
                        <Typography variant={'subtitle2'} classes={{ root: classes.accordionSummaryText }}>
                            {listItem.headerText}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetails }}>
                        <List className={'list'} disablePadding>
                            {listItem.variantIndices.map((item, index) => {
                                const listData = createInfoListItemConfig(
                                    item,
                                    listItem.hasIcon,
                                    listItem.hasTimeStamp,
                                    listItem.tag,
                                    isMobile
                                );
                                const divider =
                                    index === listItem.variantIndices.length - 1 && isMobile
                                        ? 'full'
                                        : index === listItem.variantIndices.length - 1
                                        ? undefined
                                        : listItem.hasIcon
                                        ? 'partial'
                                        : 'full';

                                return (
                                    <InfoListItem
                                        classes={{
                                            listItemText:
                                                listItem.headerText === 'Without Icons, with Title'
                                                    ? classes.listItemTextWithoutIcon
                                                    : classes.listItemText,
                                        }}
                                        iconColor={theme.palette.text.primary}
                                        statusColor={'transparent'}
                                        key={item}
                                        avatar={item === 'setting-active' ? false : true}
                                        chevron={true}
                                        divider={divider}
                                        {...listData}
                                    />
                                );
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};
