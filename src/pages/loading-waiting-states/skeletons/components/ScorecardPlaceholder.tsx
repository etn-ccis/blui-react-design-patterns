import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import * as colors from '@pxblue/colors';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Spacer } from '@pxblue/react-components';
import Color from 'color';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 400,
        height: 284,
    },
    header: {
        height: 97,
        backgroundColor: colors.black[100],
        display: 'flex',
        flexDirection: 'column',
    },
    headerSkeletonContainer: {
        margin: theme.spacing(2),
    },
    skeletonRoot: {
        color: colors.black[50],
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
        marginBottom: theme.spacing(1),
    },
    centeredColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardActions: {
        height: 52,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: `0 ${theme.spacing(2)}px`,
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
                <div className={classes.headerSkeletonContainer}>
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
            <CardContent style={{ marginBottom: 6 }}>
                <div className={classes.row}>
                    <div style={{ flex: 1 }}>
                        <div className={classes.centeredRow}>
                            <Skeleton
                                animation={animation}
                                variant="circle"
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
                                variant="circle"
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
                                variant="circle"
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
                                variant="circle"
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
                                variant="circle"
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
