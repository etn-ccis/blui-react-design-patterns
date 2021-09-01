import React, {useCallback, useEffect, useState} from 'react';
import {
    AppBar,
    FormControl,
    Hidden,
    IconButton,
    InputLabel,
    InputProps,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {TOGGLE_DRAWER} from '../../../redux/actions';

type OnChangeHandler = InputProps['onChange'];

const useStyles = makeStyles((theme: Theme) => ({
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    containerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
        backgroundColor: 'white',
        height: 'calc(100vh - 64px)',
    },
    container: {
        width: '100%',
        maxWidth: 480,
        margin: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2),
            maxWidth: '100%',
        },
    },
    submitButton: {
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    details: {
        marginTop: theme.spacing(1),
    },
}));

export const PhoneNumberFormatValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const maxLength = 6;
    const inputId = 'passcode-input';

    useEffect(() => {
        const input = document.getElementById(inputId);
        if (input) {
            input.focus();
        }
    }, []);

    const onPhoneNumberChange: OnChangeHandler = useCallback((event) => {
        // eslint-disable-next-line no-console
        console.log(event);
        setPhoneNumber(event.target.value);
    }, []);

    const getErrorText = useCallback((): string => 'TODO', []);

    return (
        <>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Phone Number Format{' '}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <FormControl variant={'filled'}>
                        <InputLabel htmlFor="country-code-label">Level</InputLabel>

                        <Select
                            fullWidth
                            labelId={'country-code-label'}
                            value={'Country Code'}
                            inputProps={{
                                name: 'level',
                                id: 'select-level',
                            }}
                        >
                            <MenuItem value={'level I'}>Level I (Regional)</MenuItem>
                            <MenuItem value={'level II'}>Level II (Regional)</MenuItem>
                            <MenuItem value={'level III'}>Level III (Regional)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        style={{ width: '100%', height: 72 }}
                        id={inputId}
                        label={'Phone Number'}
                        value={phoneNumber}
                        onChange={onPhoneNumberChange}
                        variant="filled"
                        inputProps={{
                            inputMode: 'numeric',
                            maxLength,
                        }}
                        helperText={getErrorText()}
                    />
                </div>
            </div>
        </>
    );
};
