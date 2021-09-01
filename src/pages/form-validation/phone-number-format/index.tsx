import React, { useCallback, useState } from 'react';
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
import { Menu } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

type OnChangeHandler = InputProps['onChange'];

type CountryDetails = {
    code: string;
    name: string;
    placeholder: string;
    maxLength: string;
    errorCode: string;
};

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
        display: 'flex',
        width: '100%',
        maxWidth: 480,
        margin: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2),
            maxWidth: '100%',
        },
    },
}));

export const PhoneNumberFormatValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [blurred, setBlurred] = useState(false);
    const countries: CountryDetails[] = [
        { code: 'US', name: '+1 (US)', placeholder: '### ### ####', maxLength: '12', errorCode: 'U.S.' },
        { code: 'CA', name: '+1 (CA)', placeholder: '### ### ####', maxLength: '12', errorCode: 'Canadian' },
        { code: 'RU', name: '+7 (RU)', placeholder: '### ### ## ##', maxLength: '13', errorCode: 'Russian' },
        { code: 'EG', name: '+20 (EG)', placeholder: '# #######', maxLength: '9', errorCode: 'Egyptian' },
        { code: 'IN', name: '+91 (IN)', placeholder: '#### ### ###', maxLength: '12', errorCode: 'Indian' },
    ];

    const transform = (value: string, country: string): string => {
        let formatPhone = value.replace(/\s/g, '');
        switch (country) {
            case 'RU': {
                if (formatPhone.length > 3 && formatPhone.length <= 6)
                    formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3)}`;
                else if (formatPhone.length > 6 && formatPhone.length <= 8)
                    formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(6)}`;
                else if (formatPhone.length > 8)
                    formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(
                        6,
                        8
                    )} ${formatPhone.slice(8)}`;
                return formatPhone;
            }
            case 'EG': {
                if (formatPhone.length > 1) formatPhone = `${formatPhone.slice(0, 1)} ${formatPhone.slice(1)}`;
                return formatPhone;
            }
            case 'IN': {
                if (formatPhone.length > 4 && formatPhone.length <= 7)
                    formatPhone = `${formatPhone.slice(0, 4)} ${formatPhone.slice(4)}`;
                else if (formatPhone.length > 7)
                    formatPhone = `${formatPhone.slice(0, 4)} ${formatPhone.slice(4, 7)} ${formatPhone.slice(7)}`;
                return formatPhone;
            }
            case 'US':
            case 'CA':
            default: {
                if (formatPhone.length > 3 && formatPhone.length <= 6)
                    formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3)}`;
                else if (formatPhone.length > 6)
                    formatPhone = `${formatPhone.slice(0, 3)} ${formatPhone.slice(3, 6)} ${formatPhone.slice(6)}`;
                return formatPhone;
            }
        }
    };

    const isValidPhoneNumber = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log('testing');
        switch (countryCode) {
            case 'RU': {
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(phoneNumber);
            }
            case 'EG': {
                return /^\(?([0-9]{1})\)?[-. ]?([0-9]{7})$/.test(phoneNumber);
            }
            case 'IN': {
                return /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(phoneNumber);
            }
            case 'US':
            case 'CA':
            default: {
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber);
            }
        }
    }, [countryCode, phoneNumber]);

    const onPhoneNumberChange: OnChangeHandler = useCallback((event) => {
        const phone = transform(event.target.value, countryCode);
        setPhoneNumber(phone);
    }, []);

    const getCountryName = (): string => {
        for (const country of countries) {
            if (countryCode === country.code) {
                return country.errorCode;
            }
        }
        return '';
    };

    const getMaxLength = (): number => {
        for (const country of countries) {
            if (countryCode === country.code) {
                return Number(country.maxLength);
            }
        }
        return 0;
    };

    const getPlaceholder = (): string => {
        for (const country of countries) {
            if (countryCode === country.code) {
                return country.placeholder;
            }
        }
        return '';
    };

    const showErrorText = (): boolean => blurred && !isValidPhoneNumber();

    const getErrorText = useCallback(
        (): string => (showErrorText() ? `Please enter a valid ${getCountryName()} phone number.` : ''),
        [blurred, countryCode, isValidPhoneNumber]
    );

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
                        Phone Number Format
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <FormControl variant={'filled'} style={{ width: 200, marginRight: theme.spacing(2) }}>
                        <InputLabel htmlFor="country-code-label">Country Code</InputLabel>
                        <Select
                            fullWidth
                            value={countryCode}
                            labelId={'country-code-label'}
                            inputProps={{
                                name: 'Country Code',
                            }}
                            onChange={(event): void => {
                                // eslint-disable-next-line no-console
                                console.log(event.target.value);
                                setCountryCode(String(event.target.value));
                            }}
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        style={{ width: '100%', height: 72 }}
                        label={'Phone Number'}
                        value={phoneNumber}
                        placeholder={getPlaceholder()}
                        onChange={onPhoneNumberChange}
                        variant="filled"
                        inputProps={{
                            inputMode: 'numeric',
                            maxLength: getMaxLength(),
                        }}
                        onFocus={(): void => {
                            setBlurred(false);
                        }}
                        onBlur={(): void => {
                            setBlurred(true);
                        }}
                        error={showErrorText()}
                        helperText={getErrorText()}
                    />
                </div>
            </div>
        </>
    );
};
