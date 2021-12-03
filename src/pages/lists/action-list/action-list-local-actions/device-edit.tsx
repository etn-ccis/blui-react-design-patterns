import React, { useState } from 'react';
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
    })
);

export const DeviceEdit = (props: DialogProps): JSX.Element => {
    const classes = useStyles();
    const { open, handleClose, subTitle = '', updateSubTitle } = props;
    const [tempSubTitle, setTempSubTitle] = useState(subTitle);
    const onSubmit = (): void => {
        // eslint-disable-next-line no-console
        console.log('tempSub; ',tempSubTitle)
        // pass subTitle to parent
        updateSubTitle(tempSubTitle);

        // call the onClose
        handleClose();
    };

    const onClose = (): void => {
        setTempSubTitle(subTitle)
        handleClose();
    };

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
                    variant="filled"
                    label="Type"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions style={{flexDirection:'column', padding: 0}}>
            <Divider style={{width:'100%', marginLeft: '-8px' , marginRight: '-8px'  }} />
                <Button style={{margin: '16px', width: 'calc(100% - 32px)'}}
                onClick={onSubmit} 
                color={'primary'}  
                variant={'contained'}>
                    DONE
                </Button>
            </DialogActions>
        </Dialog>
    );
};
