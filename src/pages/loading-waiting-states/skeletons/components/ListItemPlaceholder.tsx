import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';
import { InfoListItem } from '@brightlayer-ui/react-components';
import * as colors from '@brightlayer-ui/colors';
import { KeyboardArrowRight } from '@mui/icons-material';
import Color from 'color';

const useStyles = makeStyles(() => ({
    skeletonRoot: {
        backgroundColor: colors.black[50],
    },
    rightComponent: {
        color: Color(colors.black[300]).alpha(0.36).string(),
    },
}));

export const ListItemPlaceholder = (props: { animation?: 'pulse' | 'wave'; divider?: boolean }): JSX.Element => {
    const classes = useStyles();
    const { animation = 'pulse', divider } = props;

    return (
        <InfoListItem
            divider={divider ? 'partial' : undefined}
            icon={
                <Skeleton
                    animation={animation}
                    variant="circular"
                    width={40}
                    height={40}
                    classes={{ root: classes.skeletonRoot }}
                ></Skeleton>
            }
            title={
                <Skeleton
                    animation={animation}
                    width={96}
                    height={20}
                    classes={{ root: classes.skeletonRoot }}
                ></Skeleton>
            }
            subtitle={[
                <Skeleton
                    key="subtitle"
                    animation={animation}
                    width={236}
                    height={14}
                    classes={{ root: classes.skeletonRoot }}
                ></Skeleton>,
            ]}
            info={[
                <Skeleton
                    key="info"
                    animation={animation}
                    width={166}
                    height={14}
                    classes={{ root: classes.skeletonRoot }}
                ></Skeleton>,
            ]}
            rightComponent={<KeyboardArrowRight className={classes.rightComponent} />}
        />
    );
};

export const ListItemDensePlaceholder = (props: { animation?: 'pulse' | 'wave'; divider?: boolean }): JSX.Element => {
    const classes = useStyles();
    const { animation = 'pulse', divider } = props;

    return (
        <InfoListItem
            iconAlign={'center'}
            divider={divider ? 'partial' : undefined}
            dense
            icon={
                <Skeleton
                    animation={animation}
                    variant="circular"
                    width={24}
                    height={24}
                    classes={{ root: classes.skeletonRoot }}
                />
            }
            leftComponent={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton animation={animation} width={56} height={14} classes={{ root: classes.skeletonRoot }} />
                    <Skeleton
                        key="subtitle"
                        animation={animation}
                        width={40}
                        height={14}
                        classes={{ root: classes.skeletonRoot }}
                    />
                </div>
            }
            title={<Skeleton animation={animation} width={96} height={20} classes={{ root: classes.skeletonRoot }} />}
            subtitle={[
                <Skeleton
                    key="subtitle"
                    animation={animation}
                    width={166}
                    height={14}
                    classes={{ root: classes.skeletonRoot }}
                />,
            ]}
            rightComponent={<KeyboardArrowRight className={classes.rightComponent} />}
        />
    );
};
