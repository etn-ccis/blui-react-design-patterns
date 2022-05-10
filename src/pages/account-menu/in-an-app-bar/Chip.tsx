import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps, Typography, Theme, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as colors from '@brightlayer-ui/colors';

const useStyles = makeStyles((theme: Theme) => ({
    userMenuChip: {
        height: theme.spacing(4),
        cursor: 'pointer',
    },
    chipIcon: {
        height: theme.spacing(3),
        width: theme.spacing(3),
    },
    chipLabelContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(-1),
    },
    chipLabelText: {
        marginRight: theme.spacing(1),
    },
    enableHighlight: {
        backgroundColor: colors.white[500],
    },
    disableHighlight: {
        backgroundColor: colors.white[50],
    },
}));

type ChipProps = MuiChipProps & {
    label: string;
    rightIcon: React.ReactElement;
    highlight: boolean;
};

export const Chip = (props: ChipProps): JSX.Element => {
    const { label, rightIcon, highlight, ...chipProps } = props;
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <MuiChip
            {...chipProps}
            classes={{
                root: classes.userMenuChip,
                icon: classes.chipIcon,
                outlined: highlight ? classes.enableHighlight : classes.disableHighlight,
            }}
            label={
                <div className={classes.chipLabelContainer}>
                    <Typography variant={'body2'} className={classes.chipLabelText}>
                        {label}
                    </Typography>
                    {rightIcon}
                </div>
            }
            clickable={true}
        />
    );
};
