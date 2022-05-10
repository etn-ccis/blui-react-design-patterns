import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

type DialogProps = {
    open: boolean;
    handleClose: () => void;
    subTitle: string;
    updateSubTitle: (tempSubTitle: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogPaper: {
            width: 450,
            height: 600,
        },
        dialogTitle: {
            padding: `${theme.spacing(4)} ${theme.spacing(3)}`,
        },
        dialogActions: {
            padding: theme.spacing(3),
            borderTop: `1px solid ${theme.palette.divider}`,
        },
        dialogButton: {
            width: '100%',
        },
        textField: {
            marginTop: theme.spacing(4),
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
            <DialogTitle className={classes.dialogTitle}>Device</DialogTitle>
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
                <Button
                    className={classes.dialogButton}
                    onClick={onSubmit}
                    color={'primary'}
                    variant={'contained'}
                    disableElevation={true}
                >
                    DONE
                </Button>
            </DialogActions>
        </Dialog>
    );
};
