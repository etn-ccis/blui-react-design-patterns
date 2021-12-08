import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

type DialogProps = {
    open: boolean;
    handleClose: () => void;
    subTitle: string;
    updateSubTitle: (tempSubTitle: string) => void;
};

const useStyles = makeStyles(() =>
    createStyles({
        dialogPaper: {
            width: 450,
            height: 600,
        },
        dialogActions: {
            flexDirection: 'column',
            padding: 0,
        },
        dialogButton: {
            margin: '16px',
            width: 'calc(100% - 32px)',
        },
        dialogDivider: {
            width: '100%',
        },
        textField: {
            marginTop: '32px',
        },
    })
);

export const DeviceEdit = (props: DialogProps): JSX.Element => {
    const classes = useStyles();
    const { open, handleClose, subTitle = '', updateSubTitle } = props;
    const [tempSubTitle, setTempSubTitle] = useState(subTitle);
    const onSubmit = (): void => {
        updateSubTitle(tempSubTitle);
        handleClose();
    };

    const onClose = (): void => {
        setTempSubTitle(subTitle);
        handleClose();
    };

    useEffect(() => {
        setTempSubTitle(subTitle);
    }, [subTitle]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                paper: classes.dialogPaper,
            }}
        >
            <DialogTitle>Device</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={(event): void => setTempSubTitle(event?.target.value)}
                    value={tempSubTitle}
                    className={classes.textField}
                    variant="filled"
                    label="Type"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Divider className={classes.dialogDivider} />
                <Button className={classes.dialogButton} onClick={onSubmit} color={'primary'} variant={'contained'}>
                    DONE
                </Button>
            </DialogActions>
        </Dialog>
    );
};
