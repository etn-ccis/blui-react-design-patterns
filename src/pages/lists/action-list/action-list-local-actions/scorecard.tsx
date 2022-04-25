import React from 'react';
import * as Colors from '@brightlayer-ui/colors';
import { Hero, HeroBanner, ScoreCard } from '@brightlayer-ui/react-components';
import { GradeA, Temp, Moisture as Humidity } from '@brightlayer-ui/icons-mui';
import Button from '@mui/material/Button';
import { Theme, useTheme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        scorecardRoot: {
            width: 350,
            height: 250,
            marginTop: 16,
            marginLeft: 16,
        },
        scorecardHeader: {
            display: 'flex',
            height: 48,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        headerTitle: {
            fontSize: '0.875rem',
        },
        scorecardHeaderContent: {
            padding: '0 16px',
            alignItems: 'center',
        },
        bodyWrapper: {
            flex: 0,
        },
        badgeWrapper: {
            flex: 1,
        },
    })
);

export const LocalActionsScoreCard = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <ScoreCard
            classes={{
                root: classes.scorecardRoot,
                header: classes.scorecardHeader,
                headerContent: classes.scorecardHeaderContent,
                bodyWrapper: classes.bodyWrapper,
                badgeWrapper: classes.badgeWrapper,
                headerTitle: classes.headerTitle,
            }}
            headerTitle={'Overview'}
            headerColor={Colors.white[50]}
            headerFontColor={Colors.blue[500]}
            badge={
                <HeroBanner style={{ minWidth: 210 }}>
                    <Hero
                        icon={<Humidity fontSize={'inherit'} htmlColor={Colors.blue[200]} />}
                        label={'Humidity'}
                        iconSize={48}
                        ChannelValueProps={{ value: 54, units: '%', fontSize: 'normal' }}
                    />
                    <Hero
                        icon={<Temp fontSize={'inherit'} htmlColor={Colors.red[500]} />}
                        label={'Temperature'}
                        iconSize={48}
                        ChannelValueProps={{ value: 97, units: '°F', fontSize: 'normal' }}
                    />
                    <Hero
                        icon={<GradeA fontSize={'inherit'} htmlColor={Colors.green[500]} />}
                        label={'Overall'}
                        iconSize={48}
                        ChannelValueProps={{ value: 96, units: '/100', fontSize: 'normal' }}
                    />
                </HeroBanner>
            }
            actionRow={
                <Button
                    onClick={(): void => {}}
                    variant={'contained'}
                    color={'primary'}
                    disableElevation={true}
                    style={{ margin: theme.spacing(2), width: 'calc(100% - 32px)' }}
                >
                    Run Diagnostics
                </Button>
            }
        ></ScoreCard>
    );
};
