import React, { useState } from 'react';
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
    divider: {
        '&:last-child': {
            display: 'none',
        },
    },
    statusStripe: {
        color: colors.orange[500],
    },
    iconFlip: {
        transform: 'scaleX(-1)',
    },
    avatar: {
        display: 'none',
    },
    listItemText: {
        marginLeft: '-50px',
    },
    icon: { display: 'none' },
    withoutIcon: {
        marginLeft: '-146px',
    },
}));

const getTitle = (deviceStatus: string, device: string, hasTimeStamp: boolean): any => (
    <Typography
        variant={'subtitle1'}
        style={{
            color: colors.black[500],
            fontWeight: 400,
            marginLeft: hasTimeStamp ? '33px' : 'auto',
        }}
    >
        <span>{deviceStatus}: </span>
        <span>{device}</span>
    </Typography>
);

const getSubtitle = (station: string, location: string, hasTimeStamp: boolean): any => [
    <div key="subtitle" style={{ display: 'flex', alignItems: 'center', marginLeft: hasTimeStamp ? '33px' : 'auto' }}>
        <Typography variant="body2">{station} </Typography>
        <Typography variant="caption">
            {`<`} {location}
        </Typography>
    </div>,
];

const createInfoListItemConfig = (randomStatus: string, hasIcon = true, hasTimeStamp = true): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: getTitle('High Humidity', 'PX341 sensor level 9', hasTimeStamp),
                subtitle: getSubtitle('Cherrington Station', 'Moon Township', hasTimeStamp),
                icon: hasIcon ? <NotificationIcon /> : undefined,
                iconColor: hasIcon ? colors.gray[500] : undefined,
                statusColor: 'transparent',
                leftComponent: hasTimeStamp ? (
                    <Typography style={{ marginLeft: hasIcon ? '' : '-56px' }}>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ) : undefined,
            };
        case 'alarm-active':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{
                            color: colors.black[500],
                            fontWeight: 400,
                            marginLeft: hasTimeStamp ? '33px' : 'auto',
                        }}
                    >
                        <span>High Humidity: </span>
                        <span>PX341 sensor level 9</span>
                    </Typography>
                ),
                subtitle: [
                    <div
                        key="subtitle"
                        style={{ display: 'flex', alignItems: 'center', marginLeft: hasTimeStamp ? '33px' : 'auto' }}
                    >
                        <Typography variant="body2">Cherrington Station </Typography>
                        <Typography variant="caption"> {`<`} Moon Township</Typography>
                    </div>,
                ],
                icon: hasIcon ? <NotificationsActiveIcon /> : undefined,
                iconColor: colors.white[50],
                statusColor: colors.red[500],
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
                leftComponent: hasTimeStamp ? (
                    <Typography style={{ marginLeft: hasIcon ? '' : '-56px' }}>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ) : undefined,
            };
        case 'setting-active':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{
                            color: colors.black[500],
                            fontWeight: 400,
                            marginLeft: hasTimeStamp ? '33px' : 'auto',
                        }}
                    >
                        <span>Battery Service: </span>
                        <span>Eaton GH142</span>
                    </Typography>
                ),
                subtitle: [
                    <div
                        key="subtitle"
                        style={{ display: 'flex', alignItems: 'center', marginLeft: hasTimeStamp ? '33px' : 'auto' }}
                    >
                        <Typography variant="body2">Cherrington Station </Typography>
                        <Typography variant="caption"> {`<`} Moon Township</Typography>
                    </div>,
                ],
                statusColor: colors.orange[500],
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.orange[500],
                iconAlign: 'center',
                leftComponent: hasTimeStamp ? (
                    <Typography style={{ marginLeft: hasIcon ? '' : '-56px' }}>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ) : undefined,
            };
        case 'setting':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{
                            color: colors.black[500],
                            fontWeight: 400,
                            marginLeft: hasTimeStamp ? '33px' : 'auto',
                        }}
                    >
                        <span>Battery Service: </span>
                        <span>Eaton GH142</span>
                    </Typography>
                ),
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.gray[500],
                leftComponent: hasTimeStamp ? (
                    <Typography style={{ marginLeft: hasIcon ? '' : '-56px' }}>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ) : undefined,
            };
        case 'normal':
        default:
            return {
                title: `Item ${randomStatus}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
                leftComponent: hasTimeStamp ? (
                    <Typography style={{ marginLeft: hasIcon ? '' : '-56px' }}>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ) : undefined,
            };
    }
};

const renderList = [
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
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
            {renderList.map((listItem) => (
                <Accordion
                    key={listItem.headerText}
                    defaultExpanded={true}
                    style={{
                        boxShadow:
                            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                        margin: '24px 174px',
                        borderRadius: '4px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandLess />}
                        onClick={(): void => setIsExpanded(!isExpanded)}
                        style={{
                            borderBottom: '1px solid rgba(66, 78, 84, 0.12)',
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
                                return (
                                    <InfoListItem
                                        classes={{
                                            listItemText:
                                                listItem.headerText === 'Without Icons, with Title'
                                                    ? classes.listItemText
                                                    : '',
                                            divider: classes.divider,
                                        }}
                                        iconColor={theme.palette.text.primary}
                                        statusColor={'transparent'}
                                        key={item}
                                        avatar={item === 'setting-active' ? false : true}
                                        chevron={true}
                                        divider={
                                            index === listItem.variantIndices.length - 1
                                                ? undefined
                                                : listItem.hasIcon
                                                ? 'partial'
                                                : 'full'
                                        }
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
