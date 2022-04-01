import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';
import { HeroBanner } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';

const useStyles = makeStyles(() => ({
    heroBanner: {
        width: '100%',
        height: '100%',
    },
    skeletonRoot: {
        backgroundColor: colors.black[50],
    },
    centeredRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
    },
    centeredColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const HeroBannerPlaceholder = (props: { animation: 'pulse' | 'wave' }): JSX.Element => {
    const classes = useStyles();
    const { animation = 'pulse' } = props;

    return (
        <HeroBanner className={classes.heroBanner}>
            <div className={classes.centeredRow}>
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
        </HeroBanner>
    );
};
