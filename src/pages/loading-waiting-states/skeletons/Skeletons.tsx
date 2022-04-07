import React, { useEffect, useState } from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Toolbar, IconButton, Typography, Button, ButtonGroup, Card, List, useMediaQuery } from '@mui/material';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Cloud, KeyboardArrowRight, ListAlt, Menu, Notifications } from '@mui/icons-material';
import { ScorecardPlaceholder } from './components/ScorecardPlaceholder';
import { ListItemDensePlaceholder, ListItemPlaceholder } from './components/ListItemPlaceholder';
import { HeroBannerPlaceholder } from './components/HeroBannerPlaceholder';
import { Hero, HeroBanner, InfoListItem, ScoreCard, Spacer } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';
import { CurrentCircled, GradeA, Temp, Device, Moisture } from '@brightlayer-ui/icons-mui';

const backgroundImage = require('../../../assets/topology_40.png');

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        minHeight: '100vh',
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    exampleContainer: {
        margin: `${theme.spacing(3)} ${theme.spacing(2)}`,
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    label: {
        marginRight: theme.spacing(2),
    },
    selected: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
        color: theme.palette.primary.main,
    },
    heroBannerCard: {
        width: 384,
        height: 132,
    },
    leftComponent: {},
    abbreviation: {
        fontWeight: 600,
        marginLeft: 2,
    },
}));

export const Skeletons = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [animationStyle, setAnimationStyle] = useState<'pulse' | 'wave'>('pulse');
    const md = useMediaQuery(theme.breakpoints.up('md'));
    let refreshTimeout: ReturnType<typeof setTimeout>;
    let looperTimeout: ReturnType<typeof setTimeout>;

    const refreshData = (): void => {
        setIsLoading(true);

        refreshTimeout = setTimeout((): void => {
            setIsLoading(false);
            looperTimeout = setTimeout((): void => {
                refreshData();
            }, 5000);
        }, 3000);
    };

    useEffect(() => {
        refreshData();
        return (): void => {
            clearInterval(refreshTimeout);
            clearInterval(looperTimeout);
        };
    }, []);

    return (
        <>
            <AppBar data-cy="blui-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
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
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Skeletons
                    </Typography>
                    <Spacer />
                </Toolbar>
            </AppBar>
            <div className={classes.exampleContainer}>
                <div className={classes.buttonRow}>
                    <Typography variant={'subtitle1'} className={classes.label}>
                        Animation Style
                    </Typography>
                    <ButtonGroup color="primary">
                        <Button
                            onClick={(): void => setAnimationStyle('pulse')}
                            className={animationStyle === 'pulse' ? classes.selected : ''}
                        >
                            Pulse
                        </Button>
                        <Button
                            onClick={(): void => setAnimationStyle('wave')}
                            className={animationStyle === 'wave' ? classes.selected : ''}
                        >
                            Wave
                        </Button>
                    </ButtonGroup>
                </div>
                <Typography variant={'h6'} className={classes.title}>
                    Scorecard
                </Typography>
                {isLoading && (
                    <div>
                        <ScorecardPlaceholder animation={animationStyle} />
                    </div>
                )}
                {!isLoading && (
                    <ScoreCard
                        style={{ width: 400, flex: '0 0 auto' }}
                        headerTitle={'Substation 3'}
                        headerSubtitle={'High Humidity Alarm'}
                        headerInfo={'4 Devices'}
                        headerFontColor={colors.white[50]}
                        headerBackgroundImage={backgroundImage}
                        actionRow={
                            <List style={{ padding: 0 }}>
                                <InfoListItem dense chevron title={'View Location'} hidePadding />
                            </List>
                        }
                        badge={
                            <HeroBanner>
                                <Hero
                                    key={'hero1'}
                                    icon={<Temp fontSize={'inherit'} htmlColor={colors.black[500]} />}
                                    label={'Temperature'}
                                    iconSize={48}
                                    iconBackgroundColor={colors.white[50]}
                                    ChannelValueProps={{ value: 98, units: '°F', fontSize: 'normal' }}
                                />
                                <Hero
                                    key={'hero2'}
                                    icon={<Moisture fontSize={'inherit'} htmlColor={colors.blue[300]} />}
                                    label={'Humidity'}
                                    iconBackgroundColor={colors.white[50]}
                                    iconSize={48}
                                    ChannelValueProps={{ value: 54, units: '%', fontSize: 'normal' }}
                                />
                            </HeroBanner>
                        }
                    >
                        <List style={{ padding: '.5rem 0' }}>
                            <InfoListItem
                                dense
                                style={{ height: '2.25rem' }}
                                title={'0 Alarms'}
                                icon={<Notifications color={'inherit'} />}
                            />
                            <InfoListItem
                                dense
                                style={{ height: '2.25rem' }}
                                fontColor={colors.blue[500]}
                                iconColor={colors.blue[500]}
                                title={'1 Event'}
                                icon={<ListAlt color={'inherit'} />}
                            />
                            <InfoListItem
                                dense
                                style={{ height: '2.25rem' }}
                                title={'Online'}
                                icon={<Cloud color={'inherit'} />}
                            />
                        </List>
                    </ScoreCard>
                )}

                <Typography variant={'h6'} className={classes.title}>
                    List Items
                </Typography>
                {isLoading && (
                    <>
                        <Card style={{ marginBottom: theme.spacing(2) }}>
                            <ListItemPlaceholder animation={animationStyle} divider />
                            <ListItemPlaceholder animation={animationStyle} divider />
                            <ListItemPlaceholder animation={animationStyle} />
                        </Card>
                        <Card>
                            <ListItemDensePlaceholder animation={animationStyle} divider />
                            <ListItemDensePlaceholder animation={animationStyle} divider />
                            <ListItemDensePlaceholder animation={animationStyle} />
                        </Card>
                    </>
                )}
                {!isLoading && (
                    <>
                        <Card style={{ marginBottom: theme.spacing(2) }}>
                            <InfoListItem
                                title={'Input Voltage'}
                                divider={'partial'}
                                avatar
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                info={'Input Voltage Stable'}
                                icon={<GradeA />}
                                rightComponent={<KeyboardArrowRight />}
                            />
                            <InfoListItem
                                title={'Output Voltage'}
                                divider={'partial'}
                                iconColor={colors.white[50]}
                                statusColor={colors.red[500]}
                                avatar
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                info={'Output Voltage Error'}
                                icon={<GradeA />}
                                rightComponent={<KeyboardArrowRight />}
                            />
                            <InfoListItem
                                title={'Output Current'}
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                info={'Output Current Stable'}
                                avatar
                                icon={<Device color={'inherit'} />}
                                rightComponent={<KeyboardArrowRight />}
                                iconAlign={'center'}
                            />
                        </Card>
                        <Card>
                            <InfoListItem
                                title={'Input Voltage'}
                                divider={'partial'}
                                leftComponent={
                                    <div className={classes.leftComponent}>
                                        <div>
                                            8:05<span className={classes.abbreviation}>AM</span>
                                        </div>
                                        <div>01/24/21</div>
                                    </div>
                                }
                                dense
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                icon={<GradeA />}
                                rightComponent={<KeyboardArrowRight />}
                                iconAlign={'center'}
                            />
                            <InfoListItem
                                dense
                                title={'Output Voltage'}
                                divider={'partial'}
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                icon={<GradeA />}
                                rightComponent={<KeyboardArrowRight />}
                                iconAlign={'center'}
                                leftComponent={
                                    <div className={classes.leftComponent}>
                                        <div>
                                            10:43<span className={classes.abbreviation}>AM</span>
                                        </div>
                                        <div>01/24/21</div>
                                    </div>
                                }
                            />
                            <InfoListItem
                                dense
                                title={'Output Current'}
                                subtitle={['Phase A', 'Phase B', 'Phase C']}
                                icon={<Device color={'inherit'} />}
                                rightComponent={<KeyboardArrowRight />}
                                iconAlign={'center'}
                                leftComponent={
                                    <div className={classes.leftComponent}>
                                        <div>
                                            1:21<span className={classes.abbreviation}>PM</span>
                                        </div>
                                        <div>01/24/21</div>
                                    </div>
                                }
                            />
                        </Card>
                    </>
                )}

                <Typography variant={'h6'} className={classes.title}>
                    Hero Banner
                </Typography>
                {isLoading && (
                    <Card className={classes.heroBannerCard}>
                        <HeroBannerPlaceholder animation={animationStyle} />
                    </Card>
                )}
                {!isLoading && (
                    <Card className={classes.heroBannerCard}>
                        <HeroBanner>
                            <Hero
                                key={'hero1'}
                                icon={<GradeA fontSize={'inherit'} htmlColor={colors.green[500]} />}
                                label={'Healthy'}
                                ChannelValueProps={{ value: 96, units: '/100' }}
                            />
                            <Hero
                                key={'hero2'}
                                icon={<CurrentCircled fontSize={'inherit'} htmlColor={colors.yellow[500]} />}
                                label={'Load'}
                                ChannelValueProps={{ value: '90', units: '%', fontSize: 'normal' }}
                            />
                            <Hero
                                key={'hero3'}
                                icon={<Temp fontSize={'inherit'} htmlColor={colors.green[500]} />}
                                label={'Temp'}
                                ChannelValueProps={{ value: 55, units: 'C' }}
                            />
                        </HeroBanner>
                    </Card>
                )}
            </div>
        </>
    );
};
