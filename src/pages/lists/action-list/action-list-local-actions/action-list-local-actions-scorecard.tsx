import React from 'react';
import * as Colors from '@pxblue/colors';
import { Hero, HeroBanner, ScoreCard } from '@pxblue/react-components';
import { GradeA, Temp, Moisture as Humidity } from '@pxblue/icons-mui';
import Button from '@material-ui/core/Button';

const ActionListLocalActionsScoreCardRender = (): JSX.Element => (        
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div
        style={{
            flex: 1,
            width: '100%',
            maxWidth: '416px',
            minWidth: '350px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ScoreCard
                headerColor={Colors.white[50]}
                headerTitle={'Overview'}
                headerFontColor={Colors.blue[500]}
                badge={
                    <HeroBanner style={{ minWidth: 210 }}>
                        <Hero
                            icon={
                                <Humidity
                                    fontSize={'inherit'}
                                    htmlColor={Colors.blue[200]}
                                />
                            }
                            label={'Humidity'}
                            value={54}
                            units={'%'}
                            iconSize={48}
                            fontSize={'normal'}
                        />
                        <Hero
                            icon={
                                <Temp
                                    fontSize={'inherit'}
                                    htmlColor={Colors.red[500]}
                                />
                            }
                            label={'Temperature'}
                            iconSize={48}
                            value={97}
                            units={'°F'}
                            fontSize={'normal'}
                        />
                        <Hero
                            icon={
                                <GradeA
                                    fontSize={'inherit'}
                                    htmlColor={Colors.green[500]}
                                />
                            }
                            label={'Overall'}
                            value={96}
                            units={'/100'}
                            iconSize={48}
                            fontSize={'normal'}
                        />
                    </HeroBanner>
                }
                badgeOffset={0}
                actionRow={
                    <Button variant={'contained'} color={'primary'} fullWidth={true}>
                        Run Diagnostics{' '}
                    </Button>
                }
            >
            </ScoreCard>
        </div>
    </div>
</div>
);
    export const ActionListLocalActionsScoreCard = React.forwardRef(ActionListLocalActionsScoreCardRender);