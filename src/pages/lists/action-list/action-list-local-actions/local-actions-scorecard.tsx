import React from 'react';
import * as Colors from '@pxblue/colors';
import { Hero, HeroBanner, ScoreCard } from '@pxblue/react-components';
import { GradeA, Temp, Moisture as Humidity } from '@pxblue/icons-mui';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        scorecardHeader: {
            display: 'flex',
            height: 48,
            borderBottom: `1px solid ${theme.palette.divider}`,
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
        <ScoreCard style={{ minWidth: 350, maxWidth: 416 }}
            classes={{
                header: classes.scorecardHeader,
                headerContent: classes.scorecardHeaderContent,
                bodyWrapper: classes.bodyWrapper,
                badgeWrapper: classes.badgeWrapper,
            }}
            headerTitle={'Overview'}
            headerColor={Colors.white[50]}
            headerFontColor={Colors.blue[500]}
            badge={
                <HeroBanner style={{ minWidth: 210 }}>
                    <Hero
                        icon={<Humidity fontSize={'inherit'} htmlColor={Colors.blue[200]} />}
                        label={'Humidity'}
                        value={54}
                        units={'%'}
                        iconSize={48}
                        fontSize={'normal'}
                    />
                    <Hero
                        icon={<Temp fontSize={'inherit'} htmlColor={Colors.red[500]} />}
                        label={'Temperature'}
                        iconSize={48}
                        value={97}
                        units={'°F'}
                        fontSize={'normal'}
                    />
                    <Hero
                        icon={<GradeA fontSize={'inherit'} htmlColor={Colors.green[500]} />}
                        label={'Overall'}
                        value={96}
                        units={'/100'}
                        iconSize={48}
                        fontSize={'normal'}
                    />
                </HeroBanner>
            }
            actionRow={
                <Button
                    onClick={(): void => {}}
                    variant={'contained'}
                    color={'primary'}
                    style={{ margin: 16, width: 'calc(100% - 32px)' }}
                >
                    Run Diagnostics
                </Button>
            }
        ></ScoreCard>
    );
};
