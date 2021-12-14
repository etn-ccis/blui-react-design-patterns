import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import * as colors from '@brightlayer-ui/colors';
import { Spacer } from '@brightlayer-ui/react-components';
import useTheme from '@material-ui/styles/useTheme';

type DeviceEditProps = {
    subTitle: string;
    updateSubTitle: (tempSubTitle: string) => void;
    navigateBack: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white[50],
            height: 'calc(100vh - 64px)',
            [theme.breakpoints.down('xs')]: {
                height: 'calc(100vh - 56px)',
            },
        },
        dialogDivider: {
            width: '100%',
        },
        textField: {
            display: 'flex',
            margin: '16px',
        },
        button: {
            display: 'flex',
            margin: '16px',
        },
    })
);

export const DeviceEditMobile = (props: DeviceEditProps): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { subTitle = '', updateSubTitle, navigateBack } = props;
    const [tempSubTitle, setTempSubTitle] = useState(subTitle);

    const onSubmit = (): void => {
        updateSubTitle(tempSubTitle);
        navigateBack();
    };

    return (
        <>
            <div className={classes.container}>
                <TextField
                    onChange={(event): void => setTempSubTitle(event?.target.value)}
                    value={tempSubTitle}
                    className={classes.textField}
                    variant="filled"
                    label="Type"
                    type="text"
                />
                <Spacer />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Divider className={classes.dialogDivider} />
                    <Button className={classes.button} onClick={onSubmit} color={'primary'} variant={'contained'}>
                        DONE
                    </Button>
                </div>
            </div>
        </>
    );
};
