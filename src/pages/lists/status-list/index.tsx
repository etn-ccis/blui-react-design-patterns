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
    leftComponent: {},
    timeStamp: {
        fontWeight: 700,
    },
    abbreviation: {
        fontWeight: 400,
        marginLeft: 4,
    },
}));

const createInfoListItemConfig = (index: number, randomStatus: string, tag?: boolean): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: 'High Humidity',
                subtitle: `Status: ${randomStatus}`,
                icon: <NotificationIcon />,
                iconColor: tag ? colors.white[50] : colors.red[500],
                statusColor: tag ? colors.red[500] : 'transparent',
            };
        case 'alarm-active':
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <NotificationsActiveIcon />,
                iconColor: tag ? colors.white[50] : colors.gray[500],
                statusColor: tag ? colors.red[500] : 'transparent',
                rightComponent: tag ? (
                    <div>
                        <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                        <ListItemTag
                            label={'active'}
                            backgroundColor={colors.red[500]}
                            style={{ marginLeft: '16px' }}
                        />
                    </div>
                ) : undefined,
            };
        case 'setting-active':
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <Maintenance />,
                iconColor: colors.orange[500],
            };
        case 'setting':
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <Maintenance />,
                iconColor: colors.gray[500],
            };
        case 'normal':
        default:
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
            };
    }
};

const list: InfoListItemProps[] = [
    createInfoListItemConfig(0, 'alarm-active', true),
    createInfoListItemConfig(1, 'alarm'),
    createInfoListItemConfig(2, 'setting-active', true),
    createInfoListItemConfig(3, 'setting', true),
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
            <Accordion expanded={isExpanded}>
                <AccordionSummary expandIcon={<ExpandLess />} onClick={(): void => setIsExpanded(!isExpanded)}>
                    <Typography style={{ color: colors.blue[500], marginLeft: '16px', fontSize: '14px' }}>
                        With Time Stamps, with Title+SubTitle+Info
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'block' }}>
                    <List className={'list'} disablePadding>
                        {list.map((item, i) => (
                            <InfoListItem
                                iconColor={theme.palette.text.primary}
                                statusColor={'transparent'}
                                key={i}
                                avatar
                                divider={'partial'}
                                chevron={true}
                                leftComponent={
                                    <div className={classes.leftComponent}>
                                        <div>
                                            <span className={classes.timeStamp}>10:43</span>
                                            <span className={classes.abbreviation}>AM</span>
                                        </div>
                                        <div>01/24/21</div>
                                    </div>
                                }
                                {...item}
                            />
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
