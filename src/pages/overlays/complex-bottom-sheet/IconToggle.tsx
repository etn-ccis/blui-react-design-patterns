import React, { HTMLAttributes } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Theme, useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type IconToggleProps = HTMLAttributes<HTMLDivElement> & {
    iconComponent: JSX.Element;
    label: string;
    active?: boolean;
    classes?: { button: string };
};

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: theme.spacing(8),
        margin: theme.spacing(),
    },
}));

export const IconToggle: React.FC<IconToggleProps> = ({
    iconComponent,
    label,
    active,
    style,
    classes,
    ...otherDivProps
}) => {
    const theme = useTheme();
    const defaultClasses = useStyles(theme);
    const color = active ? theme.palette.primary.main : theme.palette.text.primary;
    return (
        <div className={clsx(defaultClasses.button, classes?.button)} style={{ color, ...style }} {...otherDivProps}>
            <IconButton color="inherit" disableRipple={true}>
                {iconComponent}
            </IconButton>
            <Typography variant={'subtitle2'} color="inherit">
                {label}
            </Typography>
        </div>
    );
};
