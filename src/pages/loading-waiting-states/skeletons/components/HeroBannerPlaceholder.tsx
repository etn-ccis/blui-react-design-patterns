import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { HeroBanner } from '@pxblue/react-components';

export const HeroBannerPlaceholder = (props: { animation: 'pulse' | 'wave' }): JSX.Element => {
    const { animation = 'pulse' } = props;

    return (
        <HeroBanner>
            <Skeleton animation={animation}></Skeleton>
        </HeroBanner>
    );
};
