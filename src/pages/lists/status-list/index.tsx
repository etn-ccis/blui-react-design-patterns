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
    listItem: {
        '&:last-child': {
            borderBottom: 0,
        },
    },
}));

const createInfoListItemConfig = (
    index: number,
    randomStatus: string,
    tag?: boolean,
    isLastItem = false,
    hasIcon = true
): InfoListItemProps => {
    switch (randomStatus) {
        case 'alarm':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{ color: colors.black[500], fontWeight: 400, marginLeft: '33px' }}
                    >
                        <span>High Humidity: </span>
                        <span>PX341 sensor level 9</span>
                    </Typography>
                ),
                subtitle: [
                    <div key="subtitle" style={{ display: 'flex', alignItems: 'center', marginLeft: '33px' }}>
                        <Typography variant="body2">Cherrington Station </Typography>
                        <Typography variant="caption"> {`<`} Moon Township</Typography>
                    </div>,
                ],
                icon: hasIcon ? <NotificationIcon /> : undefined,
                iconColor: hasIcon ? colors.gray[500] : undefined,
                statusColor: 'transparent',
                divider: isLastItem ? undefined : 'partial',
                leftComponent: (
                    <Typography>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ),
            };
        case 'alarm-active':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{ color: colors.black[500], fontWeight: 400, marginLeft: '33px' }}
                    >
                        <span>High Humidity: </span>
                        <span>PX341 sensor level 9</span>
                    </Typography>
                ),
                subtitle: [
                    <div key="subtitle" style={{ display: 'flex', alignItems: 'center', marginLeft: '33px' }}>
                        <Typography variant="body2">Cherrington Station </Typography>
                        <Typography variant="caption"> {`<`} Moon Township</Typography>
                    </div>,
                ],
                icon: hasIcon ? <NotificationsActiveIcon /> : undefined,
                iconColor: tag ? colors.white[50] : colors.gray[500],
                statusColor: tag ? colors.red[500] : 'transparent',
                rightComponent: tag ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ListItemTag label={'assigned'} backgroundColor={colors.blue[500]} />
                        <ListItemTag
                            label={'active'}
                            backgroundColor={colors.red[500]}
                            style={{ marginLeft: '16px', marginRight: '32px' }}
                        />
                        <Chevron color={'inherit'} role={'button'} />
                    </div>
                ) : undefined,
                divider: isLastItem ? undefined : 'partial',
                leftComponent: (
                    <Typography>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ),
            };
        case 'setting-active':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{ color: colors.black[500], fontWeight: 400, marginLeft: '33px' }}
                    >
                        <span>Battery Service: </span>
                        <span>Eaton GH142</span>
                    </Typography>
                ),
                subtitle: [
                    <div key="subtitle" style={{ display: 'flex', alignItems: 'center', marginLeft: '33px' }}>
                        <Typography variant="body2">Cherrington Station </Typography>
                        <Typography variant="caption"> {`<`} Moon Township</Typography>
                    </div>,
                ],
                icon: <Maintenance />,
                iconColor: colors.orange[500],
                divider: isLastItem ? undefined : 'partial',
                leftComponent: (
                    <Typography>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ),
            };
        case 'setting':
            return {
                title: (
                    <Typography
                        variant={'subtitle1'}
                        style={{ color: colors.black[500], fontWeight: 400, marginLeft: '33px' }}
                    >
                        <span>Battery Service: </span>
                        <span>Eaton GH142</span>
                    </Typography>
                ),
                icon: <Maintenance />,
                iconColor: colors.gray[500],
                divider: isLastItem ? undefined : 'partial',
                leftComponent: (
                    <Typography>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ),
            };
        case 'normal':
        default:
            return {
                title: `Item ${index}`,
                subtitle: `Status: ${randomStatus}`,
                icon: <HomeIcon />,
                divider: isLastItem ? undefined : 'partial',
                leftComponent: (
                    <Typography>
                        <div>
                            <span style={{ fontWeight: 700 }}>8:21</span>
                            <span style={{ fontWeight: 400, marginLeft: '4px' }}>AM</span>
                        </div>
                        <div>11/23/</div>
                    </Typography>
                ),
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
            <Accordion
                expanded={isExpanded}
                style={{
                    boxShadow:
                        '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                }}
            >
                <AccordionSummary expandIcon={<ExpandLess />} onClick={(): void => setIsExpanded(!isExpanded)}>
                    <Typography variant={'subtitle2'} style={{ color: colors.blue[500] }}>
                        With Time Stamps, with Title+SubTitle+Info
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'block', paddingRight: 0 }}>
                    <List className={'list'} disablePadding>
                        {list.map((item, i) => (
                            <InfoListItem
                                iconColor={theme.palette.text.primary}
                                statusColor={'transparent'}
                                key={i}
                                avatar
                                chevron={true}
                                {...item}
                            />
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
