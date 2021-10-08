import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    List,
    Hidden,
    IconButton,
    useTheme,
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Chevron from '@material-ui/icons/ChevronRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag, InfoListItemProps } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';
import { Maintenance } from '@pxblue/icons-mui';

const useStyles = makeStyles(() => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
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
}));

const getTitle = (deviceStatus: string, device: string, hasTimeStamp: boolean): any => (
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
            {deviceStatus}:
        </Typography>
        <span>&nbsp;</span>
        <Typography variant={'body1'} noWrap>
            {device}
        </Typography>
    </div>
);

const getSubtitle = (station: string, location: string, hasTimeStamp: boolean): any => [
    <div key="subtitle" style={{ display: 'flex', alignItems: 'center', marginLeft: hasTimeStamp ? '33px' : 'auto' }}>
        <Typography variant="body2">{station} </Typography>
        <span>&nbsp; {`<`} &nbsp;</span>
        <Typography variant="caption">{location}</Typography>
    </div>,
];

const getLeftComponent = (time: string, timePeriod: 'AM' | 'PM', date: string, hasIcon: boolean): any => (
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

const createInfoListItemConfig = (randomStatus: string, hasIcon = true, hasTimeStamp = true): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: getTitle('Bypass Over Frequency', 'A2 Max Reval', hasTimeStamp),
                subtitle: getSubtitle('Tuscarawas R.', 'Beaver', hasTimeStamp),
                icon: hasIcon ? <NotificationIcon /> : undefined,
                iconColor: hasIcon ? colors.gray[500] : undefined,
                statusColor: 'transparent',
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/', hasIcon) : undefined,
            };
        case 'alarm-active':
            return {
                title: getTitle('High Humidity', 'PX341 sensor level 9', hasTimeStamp),
                subtitle: getSubtitle('Cherrington Station', 'Moon Township', hasTimeStamp),
                icon: hasIcon ? <NotificationsActiveIcon /> : undefined,
                iconColor: colors.white[50],
                statusColor: colors.red[500],
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/', hasIcon) : undefined,
                rightComponent: (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                        <ListItemTag
                            label={'active'}
                            backgroundColor={colors.red[500]}
                            style={{ marginLeft: '16px', marginRight: '32px' }}
                        />
                        <Chevron color={'inherit'} role={'button'} />
                    </div>
                ),
            };
        case 'setting-active':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', hasTimeStamp),
                subtitle: getSubtitle('Cherrington Station', 'Moon Township', hasTimeStamp),
                statusColor: colors.orange[500],
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.orange[500],
                iconAlign: 'center',
                leftComponent: hasTimeStamp ? getLeftComponent('7:48', 'AM', '11/23/', hasIcon) : undefined,
            };
        case 'setting':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', hasTimeStamp),
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.gray[500],
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/', hasIcon) : undefined,
            };
        case 'normal':
        default:
            return {
                title: `Item ${randomStatus}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/', hasIcon) : undefined,
            };
    }
};

const list = [
    {
        variantIndices: ['alarm-active', 'setting-active', 'alarm'],
        headerText: 'With Time Stamps, with Title+SubTitle+Info',
        hasIcon: true,
        hasTimeStamp: true,
    },
    {
        variantIndices: ['alarm-active', 'setting'],
        headerText: 'Without Icons, with Title',
        hasIcon: false,
        hasTimeStamp: false,
    },
    {
        variantIndices: ['alarm-active', 'setting'],
        headerText: 'With Icons, with Title',
        hasIcon: true,
        hasTimeStamp: false,
    },
];

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                    <div />
                </Toolbar>
            </AppBar>
            {list.map((listItem) => (
                <Accordion
                    key={listItem.headerText}
                    defaultExpanded={true}
                    style={{
                        width: '766px',
                        boxShadow:
                            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                        margin: '24px 174px',
                        borderRadius: '4px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandLess />}
                        style={{
                            borderBottom: '1px solid rgba(66, 78, 84, 0.12)',
                            minHeight: '48px',
                        }}
                    >
                        <Typography
                            variant={'subtitle2'}
                            style={{
                                color: colors.blue[500],
                            }}
                        >
                            {listItem.headerText}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block', padding: 0 }}>
                        <List className={'list'} disablePadding>
                            {listItem.variantIndices.map((item, index) => {
                                const listData = createInfoListItemConfig(
                                    item,
                                    listItem.hasIcon,
                                    listItem.hasTimeStamp
                                );
                                const divider =
                                    index === listItem.variantIndices.length - 1
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
