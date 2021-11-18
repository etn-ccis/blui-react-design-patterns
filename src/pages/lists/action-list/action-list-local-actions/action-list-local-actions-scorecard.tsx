import React from 'react';
import { Hero, HeroBanner, ScoreCard } from '@pxblue/react-components';
import { List, ListItem, ListItemText } from '@material-ui/core';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import makeStyles from '@material-ui/core/styles/makeStyles';
import * as Colors from '@pxblue/colors';
import { Temp } from '@pxblue/icons-mui';

// const useStyles = makeStyles((theme: Theme) => ({
//     appbarRoot: {
//         padding: 0,
//     },
//     toolbarGutters: {
//         padding: `0 ${theme.spacing(2)}px`,
//         display: 'flex',
//         justifyContent: 'space-between',
//     },
//     headerIcon: {
//         marginLeft: theme.spacing(4),
//     },
//     iconButton: {
//         '&:hover': {
//             color: theme.palette.primary.main,
//         },
//     },
// }));

const ActionListLocalActionsScoreCardRender = (): JSX.Element => (        
            <ScoreCard
                headerColor={Colors.red[500]}
                headerTitle={'Overview'}
                headerFontColor={Colors.white[50]}
                badge={
                    <HeroBanner>
                        <Hero
                            icon={<Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />}
                            label={'Temperature'}
                            iconSize={48}
                            value={98}
                            units={'°F'}
                            fontSize={'normal'}
                        />
                    </HeroBanner>
                }
                actionRow={
                    <List>
                        <ListItem>
                            <ListItemText primary="View Location" />
                        </ListItem>
                    </List>
                }
            ></ScoreCard>
    );
    export const ActionListLocalActionsScoreCard = React.forwardRef(ActionListLocalActionsScoreCardRender);