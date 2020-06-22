import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    phItem: {
        padding: theme.spacing(),
        margin: 0,
        justifyContent: 'space-around',
        height: 289,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
    },
}));

export const Placeholder = (): JSX.Element => {
    const classes = useStyles(useTheme());
    return (
        <div className={`ph-item ${classes.phItem}`}>
            {[0, 1, 2].map((value) => (
                <div key={value} className="ph-col-4" style={{ justifyContent: 'center', maxWidth: '100px' }}>
                    <div className="ph-avatar" style={{ minWidth: 0 }} />
                    <div className="ph-row">
                        <div className="ph-col-12 big" />
                    </div>
                </div>
            ))}
            <div className="ph-col-12">
                {[0, 1, 2].map((value) => (
                    <div key={value} className="ph-row">
                        <div className="ph-col-12 big" />
                    </div>
                ))}
            </div>
        </div>
    );
};
