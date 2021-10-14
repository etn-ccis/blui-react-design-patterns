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
import ExpandMore from '@material-ui/icons/ExpandMore';
import Chevron from '@material-ui/icons/ChevronRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem, ListItemTag, InfoListItemProps, Spacer } from '@pxblue/react-components';
import * as colors from '@pxblue/colors';
import { Maintenance } from '@pxblue/icons-mui';

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
        marginLeft: '0px',
    },
    accordionContainer: {
        maxWidth: 768,
        paddingTop: theme.spacing(3),
        margin: '0 auto',

        [theme.breakpoints.down('sm')]: {
            margin: `0 0 ${theme.spacing(3)}px 0`,
            paddingTop: 0,
        },
    },
    accordionRoot: {
        marginBottom: theme.spacing(2),
        borderRadius: '4px',
        '&:before': {
            display: 'none',
        },
        '& .MuiAccordionSummary-root': {
            height: '48px',
            minHeight: '48px',
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
                height: '48px',
                minHeight: '48px',
                '&.Mui-expanded': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    margin: 0,
                },
            },
        },
    },
    accordionDetails: {
        display: 'block',
        padding: 0,
    },
    toolbarRightContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    listItemTitle: {
        display: 'flex',
        alignItems: 'center',
        color: colors.black[500],
        fontWeight: 400,
    },
    station: {
        fontSize: 14,
        fontWeight: 400,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    location: {
        fontSize: 12,
        fontWeight: 400,
    },
    leftComponentRoot: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
        marginRight: theme.spacing(4),
    },
    timeStamp: {
        display: 'flex',
        alignItems: 'center',
    },
    time: {
        fontWeight: 700,
        fontSize: '12px',
    },
    timePeriod: {
        marginLeft: '4px',
    },
    rightComponentRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    assignedTag: {
        marginTop: 4,
    },
    activeTag: {
        marginTop: 4,
    },
    listItemTag: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(4),
    },
    rightComponentChevron: {
        color: colors.gray[500],
    },
    infoComponent: {
        display: 'flex',
        margin: `4px 0px 4px ${theme.spacing(4)}px`,
    },
}));

const getTitle = (deviceStatus: string, device: string, isMobile = false, classes: Record<string, any>): ReactNode => (
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

const getSubtitle = (
    station: string,
    location: string,
    isMobile = false,
    classes: Record<string, any>
): string | Array<string | JSX.Element> | undefined => [
    <span key="station" className={classes.station}>
        {station}
    </span>,
    !isMobile ? (
        <span key="location" className={classes.location}>
            {`<`} &nbsp; {location}
        </span>
    ) : (
        ''
    ),
];

const getLeftComponent = (
    time: string,
    timePeriod: 'AM' | 'PM',
    date: string,
    classes: Record<string, any>
): ReactNode => (
    <div className={classes.leftComponentRoot}>
        <div className={classes.timeStamp}>
            <Typography classes={{ root: classes.time }}>{time}</Typography>
            <Typography variant={'caption'} classes={{ root: classes.timePeriod }}>
                {timePeriod}
            </Typography>
        </div>
        <Typography variant={'caption'}>{date}</Typography>
    </div>
);

const getRightComponent = (isMobile: boolean, tag: boolean, classes: Record<string, any>): ReactNode => (
    <div className={classes.rightComponentRoot}>
        {tag && !isMobile && (
            <>
                <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                <ListItemTag
                    label={'active'}
                    backgroundColor={colors.red[500]}
                    classes={{ root: classes.listItemTag }}
                />
            </>
        )}
        <Chevron classes={{ root: classes.rightComponentChevron }} role={'button'} />
    </div>
);

const getInfoComponent = (
    tag: boolean,
    isMobile: boolean,
    classes: Record<string, any>
): string | Array<string | JSX.Element> | undefined => {
    if (tag && isMobile) {
        return [
            <ListItemTag
                key="assigned"
                label={'assigned'}
                classes={{ root: classes.assignedTag }}
                backgroundColor={colors.blue[500]}
            />,
            <ListItemTag
                key="active"
                label={'active'}
                backgroundColor={colors.red[500]}
                classes={{ root: classes.activeTag }}
            />,
        ];
    }
    return undefined;
};

const createInfoListItemConfig = (
    randomStatus: string,
    hasIcon = true,
    hasTimeStamp = true,
    tag = false,
    isMobile = false,
    classes: Record<string, any>,
    hideSubTitle: boolean
): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: getTitle('Bypass Over Frequency', 'A2 Max Reval', isMobile, classes),
                subtitle:
                    isMobile && hideSubTitle ? undefined : getSubtitle('Tuscarawas R.', 'Beaver', isMobile, classes),
                subtitleSeparator: ' ',
                icon: hasIcon ? <NotificationIcon /> : undefined,
                iconColor: hasIcon ? colors.gray[500] : undefined,
                statusColor: 'transparent',
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/21', classes) : undefined,
                rightComponent: getRightComponent(isMobile, false, classes),
            };
        case 'alarm-active':
            return {
                title: getTitle('High Humidity', 'PX341 sensor level 9', isMobile, classes),
                subtitle:
                    isMobile && hideSubTitle
                        ? undefined
                        : getSubtitle('Cherrington Station', 'Moon Township', isMobile, classes),
                subtitleSeparator: ' ',
                info: getInfoComponent(tag, isMobile, classes),
                icon: hasIcon ? <NotificationsActiveIcon /> : undefined,
                iconColor: colors.white[50],
                statusColor: colors.red[500],
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/21', classes) : undefined,
                chevron: true,
                rightComponent: getRightComponent(isMobile, tag, classes),
            };
        case 'setting-active':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', isMobile, classes),
                subtitle:
                    isMobile && hideSubTitle
                        ? undefined
                        : getSubtitle('Cherrington Station', 'Moon Township', isMobile, classes),
                subtitleSeparator: ' ',
                statusColor: colors.orange[500],
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.orange[500],
                iconAlign: 'center',
                leftComponent: hasTimeStamp ? getLeftComponent('7:48', 'AM', '11/23/21', classes) : undefined,
                rightComponent: getRightComponent(isMobile, false, classes),
            };
        case 'setting':
            return {
                title: getTitle('Battery Service', 'Eaton GH142', isMobile, classes),
                icon: hasIcon ? <Maintenance /> : undefined,
                iconColor: colors.gray[500],
                leftComponent: hasTimeStamp ? getLeftComponent('2:13', 'AM', '11/23/21', classes) : undefined,
                rightComponent: getRightComponent(isMobile, false, classes),
            };
        case 'normal':
        default:
            return {
                title: `Item ${randomStatus}`,
                subtitle: isMobile && hideSubTitle ? undefined : `Status: ${randomStatus}`,
                subtitleSeparator: ' ',
                icon: <HomeIcon />,
                leftComponent: hasTimeStamp ? getLeftComponent('8:21', 'AM', '11/23/21', classes) : undefined,
            };
    }
};

const list = [
    {
        itemVariants: ['alarm-active', 'setting-active', 'alarm'],
        headerText: 'With Time Stamps, with Title+SubTitle+Info',
        hasIcon: true,
        hasTimeStamp: true,
        tag: true,
        hideSubTitle: false,
    },
    {
        itemVariants: ['alarm-active', 'setting'],
        headerText: 'Without Icons, with Title',
        hasIcon: false,
        hasTimeStamp: false,
        tag: false,
        hideSubTitle: true,
    },
    {
        itemVariants: ['alarm-active', 'setting'],
        headerText: 'With Icons, with Title',
        hasIcon: true,
        hasTimeStamp: false,
        tag: false,
        hideSubTitle: true,
    },
];

export const StatusList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
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
                    <Spacer />
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
            <div className={classes.accordionContainer}>
                {list.map((listItem) => (
                    <Accordion
                        key={listItem.headerText}
                        data-testid="statusListAccordion"
                        defaultExpanded={true}
                        classes={{ root: classes.accordionRoot }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant={'subtitle2'} color={'primary'}>
                                {listItem.headerText}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetails }}>
                            <List className={'list'} disablePadding>
                                {listItem.itemVariants.map((item, index) => {
                                    const listData = createInfoListItemConfig(
                                        item,
                                        listItem.hasIcon,
                                        listItem.hasTimeStamp,
                                        listItem.tag,
                                        isMobile,
                                        classes,
                                        listItem.hideSubTitle
                                    );
                                    const divider =
                                        index === listItem.itemVariants.length - 1 && isMobile
                                            ? 'full'
                                            : index === listItem.itemVariants.length - 1
                                            ? undefined
                                            : listItem.hasIcon
                                            ? 'partial'
                                            : 'full';

                                    return (
                                        <InfoListItem
                                            classes={{
                                                listItemText: classes.listItemText,
                                            }}
                                            hidePadding={
                                                listItem.headerText === 'Without Icons, with Title' || !listItem.hasIcon
                                            }
                                            data-testid="statusListInfoListItem"
                                            iconColor={theme.palette.text.primary}
                                            statusColor={'transparent'}
                                            key={item}
                                            avatar={item === 'setting-active' ? false : true}
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
        </div>
    );
};
