import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';
import * as colors from '@brightlayer-ui/colors';
import { Spacer } from '@brightlayer-ui/react-components';
import useTheme from '@mui/styles/useTheme';

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
            [theme.breakpoints.down('sm')]: {
                height: 'calc(100vh - 56px)',
            },
        },
        dialogDivider: {
            width: '100%',
        },
        textField: {
            display: 'flex',
            margin: theme.spacing(2),
        },
        button: {
            display: 'flex',
            margin: theme.spacing(2),
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
