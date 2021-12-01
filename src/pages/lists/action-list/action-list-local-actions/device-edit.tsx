import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core';

type DialogProps = {
    open: boolean;
    handleClose: () => void;
};

const useStyles = makeStyles(() =>
    createStyles({
        dialogPaper: {
            width: 450,
            height: 600,
        },
    }),
);

export const DeviceEdit = (props: DialogProps): JSX.Element => {
    const classes = useStyles();
    const { open, handleClose } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{
                paper: classes.dialogPaper,
            }}
        >
            <DialogTitle>Device</DialogTitle>
            <DialogContent>
                <TextField 
                variant="filled" 
                label="Type" 
                type="text" 
                fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color={'primary'} fullWidth>
                    DONE
                </Button>
            </DialogActions>
        </Dialog>
    );
};
