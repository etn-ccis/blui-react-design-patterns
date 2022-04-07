import React, { useCallback, useState } from 'react';
import {
    AppBar,
    FormControl,
    IconButton,
    InputLabel,
    InputProps,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { checkPhoneNumber, transformUserInput } from './phone-number-utils';

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
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
            maxWidth: '100%',
        },
    },
}));

const countries: CountryDetails[] = [
    { code: 'US', name: '+1 (US)', placeholder: '### ### ####', maxLength: '12', errorCode: 'U.S.' },
    { code: 'CA', name: '+1 (CA)', placeholder: '### ### ####', maxLength: '12', errorCode: 'Canadian' },
    { code: 'RU', name: '+7 (RU)', placeholder: '### ### ## ##', maxLength: '13', errorCode: 'Russian' },
    { code: 'EG', name: '+20 (EG)', placeholder: '# #######', maxLength: '9', errorCode: 'Egyptian' },
    { code: 'IN', name: '+91 (IN)', placeholder: '#### ### ###', maxLength: '12', errorCode: 'Indian' },
];

export const PhoneNumberFormatValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [blurred, setBlurred] = useState(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const isValidPhoneNumber = useCallback(
        (): boolean => checkPhoneNumber(phoneNumber, countryCode),
        [countryCode, phoneNumber]
    );

    const onPhoneNumberChange: OnChangeHandler = useCallback(
        (event) => {
            const onlyDigits = /^\d+$/;
            const trimmed = event.target.value.replaceAll(' ', '');
            if (onlyDigits.test(trimmed) || !trimmed) {
                setPhoneNumber(transformUserInput(event.target.value, countryCode));
            }
        },
        [countryCode]
    );

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
            <AppBar data-cy={'blui-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy={'toolbar-menu'}
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Phone Number Format
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <FormControl variant={'filled'} style={{ width: 200, marginRight: theme.spacing(2) }}>
                        <InputLabel htmlFor={'country-code-label'}>Country Code</InputLabel>
                        <Select
                            data-cy={'country-selector'}
                            fullWidth
                            value={countryCode}
                            labelId={'country-code-label'}
                            inputProps={{
                                name: 'Country Code',
                            }}
                            onChange={(event): void => {
                                setCountryCode(String(event.target.value));
                                setPhoneNumber(transformUserInput(phoneNumber, String(event.target.value)));
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
                        variant={'filled'}
                        data-cy={'phone-input'}
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
