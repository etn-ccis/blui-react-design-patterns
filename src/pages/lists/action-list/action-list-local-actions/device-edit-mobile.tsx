import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

type DeviceEditProps = {
    subTitle: string;
    updateSubTitle: (tempSubTitle: string) => void;
    navigateBack: () => void
};

const useStyles = makeStyles(() =>
    createStyles({
        dialogDivider: {
            width: '100%',
        },
        textField: {
            margin: '16px',
            width: 'calc(100% - 32px)',
        },
        button: {
            margin: '16px',
            width: 'calc(100% - 32px)',
        },
    })
);

export const DeviceEditMobile = (props: DeviceEditProps): JSX.Element => {
    const classes = useStyles();
    const { subTitle = '', updateSubTitle, navigateBack } = props;
    const [tempSubTitle, setTempSubTitle] = useState(subTitle);

    const onSubmit = (): void => {
        updateSubTitle(tempSubTitle);
        navigateBack();
    };

    return (
        <>
            <div style={{ flex: 1 }}>
                <TextField
                    onChange={(event): void => setTempSubTitle(event?.target.value)}
                    value={tempSubTitle}
                    className={classes.textField}
                    variant="filled"
                    label="Type"
                    type="text"
                />
            </div>
            <Divider className={classes.dialogDivider} />
            <Button className={classes.button} onClick={onSubmit} color={'primary'} variant={'contained'}>
                DONE
            </Button>
        </>
    );
};
