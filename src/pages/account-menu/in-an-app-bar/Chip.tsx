import React from 'react';
import { Chip as MuiChip, Typography, makeStyles, Theme, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    userMenuChip: {
        width: '112px',
        height: `${theme.spacing(4)}px`,
    },
    chipIcon: {
        height: `${theme.spacing(3)}px`,
        width: `${theme.spacing(3)}px`,
    },
    chipLabel: {
        marginRight: `${theme.spacing(1)}px`,
    },
    chipLabelIcon: {
        height: 16,
        width: 16,
    },
    chipLabelContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));

type ChipProps = {
    variant: 'default' | 'outlined' | undefined;
    size: 'small' | 'medium' | undefined;
    leftIcon: React.ReactElement;
    label: string;
    rightIcon: React.ReactElement;
};

export const Chip = (props: ChipProps): JSX.Element => {
    const { variant, size, leftIcon, label, rightIcon } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <MuiChip
            classes={{ root: classes.userMenuChip, icon: classes.chipIcon }}
            variant={variant}
            size={size}
            icon={leftIcon}
            label={
                <div className={classes.chipLabelContainer}>
                    <Typography variant={'body2'} className={classes.chipLabel}>
                        {label}
                    </Typography>
                    {rightIcon}
                </div>
            }
            clickable={false}
        />
    );
};
