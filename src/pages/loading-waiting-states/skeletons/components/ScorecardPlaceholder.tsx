import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import * as colors from '@brightlayer-ui/colors';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Spacer } from '@brightlayer-ui/react-components';
import Color from 'color';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 400,
        height: 284,
    },
    header: {
        height: 100,
        backgroundColor: colors.black[100],
        display: 'flex',
        flexDirection: 'column',
    },
    headerSkeletonContainer: {
        margin: theme.spacing(2),
    },
    skeletonRoot: {
        backgroundColor: colors.black[50],
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    centeredRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& :first-child': {
            marginRight: theme.spacing(3),
        },
    },
    centeredColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    leftCardContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardActions: {
        height: 52,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: `0 ${theme.spacing(2)}`,
        color: Color(colors.black[300]).alpha(0.36).string(),
    },
}));

export const ScorecardPlaceholder = (props: { animation: 'pulse' | 'wave' }): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { animation = 'pulse' } = props;

    return (
        <Card className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerSkeletonContainer} data-cy={'skeleton'}>
                    <Skeleton
                        animation={animation}
                        width={180}
                        height={24}
                        style={{ marginBottom: 6 }}
                        classes={{ root: classes.skeletonRoot }}
                    ></Skeleton>
                    <Skeleton
                        animation={animation}
                        width={112}
                        height={16}
                        style={{ marginBottom: 6 }}
                        classes={{ root: classes.skeletonRoot }}
                    ></Skeleton>
                    <Skeleton
                        animation={animation}
                        width={62}
                        height={16}
                        classes={{ root: classes.skeletonRoot }}
                    ></Skeleton>
                </div>
            </div>
            <CardContent style={{ marginTop: 3 }}>
                <div className={classes.row}>
                    <div className={classes.leftCardContent}>
                        <div className={classes.centeredRow}>
                            <Skeleton
                                animation={animation}
                                variant="circular"
                                width={24}
                                height={24}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={64}
                                height={16}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                        </div>
                        <div className={classes.centeredRow}>
                            <Skeleton
                                animation={animation}
                                variant="circular"
                                width={24}
                                height={24}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={64}
                                height={16}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                        </div>
                        <div className={classes.centeredRow}>
                            <Skeleton
                                animation={animation}
                                variant="circular"
                                width={24}
                                height={24}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={64}
                                height={16}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.centeredColumn} style={{ marginRight: 32 }}>
                            <Skeleton
                                animation={animation}
                                variant="circular"
                                width={36}
                                height={36}
                                classes={{ root: classes.skeletonRoot }}
                                style={{ marginBottom: 16 }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={62}
                                height={20}
                                classes={{ root: classes.skeletonRoot }}
                                style={{ marginBottom: 8 }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={82}
                                height={16}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                        </div>
                        <div className={classes.centeredColumn}>
                            <Skeleton
                                animation={animation}
                                variant="circular"
                                width={36}
                                height={36}
                                classes={{ root: classes.skeletonRoot }}
                                style={{ marginBottom: 16 }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={62}
                                height={20}
                                classes={{ root: classes.skeletonRoot }}
                                style={{ marginBottom: 8 }}
                            ></Skeleton>
                            <Skeleton
                                animation={animation}
                                width={82}
                                height={16}
                                classes={{ root: classes.skeletonRoot }}
                            ></Skeleton>
                        </div>
                    </div>
                </div>
            </CardContent>
            <Divider light />
            <CardActions className={classes.cardActions}>
                <Typography variant={'subtitle1'}>View Location</Typography>
                <Spacer />
                <KeyboardArrowRight />
            </CardActions>
        </Card>
    );
};
