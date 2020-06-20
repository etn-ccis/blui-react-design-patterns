import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Card, Grid, List, Hidden, Tooltip } from '@material-ui/core';
import { Refresh, Menu as MenuIcon } from '@material-ui/icons';
import { Battery, Pie } from '@pxblue/react-progress-icons';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { Spacer, Hero, HeroBanner, InfoListItem, ChannelValue } from '@pxblue/react-components';
import { emptyDeviceList, deviceList } from './data';
import * as PXBColors from '@pxblue/colors';
import { Placeholder } from './Placeholder';
import 'placeholder-loading/src/scss/placeholder-loading.scss';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        margin: theme.spacing(0.5),
    },
}));

export const LoadingStates = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    const [data, setData] = useState(emptyDeviceList);

    const fetchData = (): void => {
        setTimeout(() => {
            setData(deviceList);
        }, 3000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = (): void => {
        setData(emptyDeviceList);
        fetchData();
    };

    const getIcon = (value: number): string => {
        if (value < 80) {
            return 'A';
        }
        if (value < 90) {
            return 'B';
        }
        return 'C';
    };
    const getColor = (value: number): string => {
        if (value < 25) {
            return PXBColors.red[500];
        }
        if (value < 75) {
            return PXBColors.yellow[500];
        }
        return PXBColors.green[500];
    };

    const getGradeColor = (value: number): string => {
        if (value < 80) {
            return PXBColors.red[500];
        }
        if (value < 90) {
            return PXBColors.yellow[500];
        }
        return PXBColors.green[500];
    };

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.default,
                minHeight: '100vh',
            }}
        >
            <AppBar position="sticky">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit">
                        Loading States
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Refresh this page'}>
                        <IconButton edge={'end'} color={'inherit'} onClick={refreshData}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Grid container style={{ padding: theme.spacing(2) }}>
                {data.map(
                    (device, index): JSX.Element => (
                        <Grid key={index} item lg={3} md={6} sm={6} xs={12}>
                            <Card className={classes.card}>
                                {device.data ? (
                                    <>
                                        <HeroBanner divider>
                                            <Hero
                                                icon={
                                                    <Typography
                                                        style={{ color: getGradeColor(device.data.heroValue) }}
                                                        variant={'h4'}
                                                    >
                                                        {getIcon(device.data.heroValue)}
                                                    </Typography>
                                                }
                                                label={'Grade'}
                                                value={`${device.data.heroValue}`}
                                                units={'/100'}
                                            />
                                            <Hero
                                                icon={
                                                    <Pie
                                                        color={getColor(100 - device.data.loadValue)}
                                                        percent={device.data.loadValue}
                                                        size={36}
                                                    />
                                                }
                                                label={'Load'}
                                                value={device.data.loadValue}
                                                units={'%'}
                                            />
                                            <Hero
                                                icon={
                                                    <Battery
                                                        color={getColor(device.data.battery)}
                                                        percent={device.data.battery}
                                                        size={36}
                                                    />
                                                }
                                                label={'Battery'}
                                                value={device.data.battery}
                                                units={'%'}
                                            />
                                        </HeroBanner>
                                        <List disablePadding>
                                            {device.data.channels.map((channel, channelIndex) => (
                                                <InfoListItem
                                                    title={channel.label}
                                                    icon={channel.icon}
                                                    rightComponent={
                                                        <ChannelValue value={channel.value} units={channel.unit} />
                                                    }
                                                    divider={
                                                        channelIndex + 1 === device.data?.channels.length
                                                            ? undefined
                                                            : 'full'
                                                    }
                                                    key={channelIndex}
                                                    dense
                                                />
                                            ))}
                                        </List>
                                    </>
                                ) : (
                                    <Placeholder />
                                )}
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </div>
    );
};
