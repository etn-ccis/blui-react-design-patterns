import React, { useCallback, useState, useRef } from 'react';
import {
    AppBar,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    InputProps,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { ContactMail, HelpOutline, LocationOn, Menu } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Factory } from '@brightlayer-ui/icons-mui';
import clsx from 'clsx';

const mobileInputMarginSpacing = 4;
type OnChangeHandler = InputProps['onChange'];
const MAX_CHARS_LIMIT = 50;
const bluiProtection = 'Brightlayer Protection';
const bluiProtectionDescription = 'Brightlayer Protection provides a three-year Brightlayer warranty.';
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
        minHeight: 'calc(100vh - 64px)',
        [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(100vh - 56px)',
        },
    },
    container: {
        maxWidth: 480,
        width: '100%',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: theme.spacing(2),
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
    },
    icon: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(4),
        },
    },
    formLine: {
        marginTop: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.spacing(mobileInputMarginSpacing),
        },
    },
    selectLevelForm: {
        marginRight: theme.spacing(3),
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    firstNameFormField: {
        width: '50%',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    lastNameFormField: {
        width: '50%',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: theme.spacing(mobileInputMarginSpacing),
        },
    },
    submitButtonContainer: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    submitButton: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    zipInput: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            margin: `${theme.spacing(mobileInputMarginSpacing)} 0 ${theme.spacing(mobileInputMarginSpacing)} 0`,
        },
    },
    textField: {
        height: 72,
        width: '100%',
    },
}));

export const SectionedFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('level II');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showRequiredError, setShowRequiredError] = useState(false);
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const nameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const zipRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const validateEmail = useCallback(
        (value: string): void => {
            const tempEmail = value;
            let tempEmailError = '';
            if (!tempEmail.trim()) {
                tempEmailError = 'Required';
            } else if (!emailRegex.test(tempEmail)) {
                tempEmailError = 'Please enter a valid email address';
            }
            setEmailError(tempEmailError);
        },
        [setEmailError]
    );

    const onEmailBlur = useCallback((): void => {
        validateEmail(email);
    }, [validateEmail, email]);

    const onEmailChange: OnChangeHandler = useCallback(
        (event) => {
            setEmail(event.target.value);
            if (emailError) {
                validateEmail(event.target.value);
            } else {
                setEmailError('');
            }
        },
        [setEmail, emailError, validateEmail, setEmailError]
    );

    const characterLimitsHelperText = (
        <>
            <span className={'helper-text'}>
                {!name && showRequiredError ? 'Required' : 'For example, Facility or Campus name'}
            </span>
            <span
                style={{ float: 'right', color: theme.palette.text.secondary }}
            >{`${name.length}/${MAX_CHARS_LIMIT}`}</span>
        </>
    );

    const getEmailHelperText = useCallback(
        (value) => {
            if (!showRequiredError) {
                return '';
            }
            return showRequiredError && !value ? 'Required' : emailError;
        },
        [showRequiredError, emailError]
    );

    const getRequiredHelperText = useCallback(
        (value) => (showRequiredError && !value ? 'Required' : ''),
        [showRequiredError]
    );

    const onSubmit = (): void => {
        setShowRequiredError(true);
        // get the first ref whose field is not empty
        const requiredEl =
            (!name && nameRef.current) ||
            (!address && addressRef.current) ||
            (!city && cityRef.current) ||
            (!state && stateRef.current) ||
            (!zip && zipRef.current) ||
            (!firstName && firstNameRef.current) ||
            (!email && emailRef.current);
        if (requiredEl) {
            requiredEl.scrollIntoView(true);
            window.scrollBy(0, -64);
            requiredEl.focus();
        } else {
            setShowRequiredError(false);
            setName('');
            setAddress('');
            setAddressLine2('');
            setCity('');
            setState('');
            setZip('');
            setFirstName('');
            setLastName('');
            setEmail('');
        }
    };

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
                        Sectioned Form
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <div className={classes.container}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <Factory className={classes.icon} />
                        <Typography variant={'h6'}>Factory</Typography>
                    </div>
                    <div>
                        <TextField
                            required
                            className={classes.textField}
                            value={name}
                            label={'Name'}
                            variant={'filled'}
                            onChange={(e): void => setName(e.target.value)}
                            inputProps={{ maxLength: MAX_CHARS_LIMIT }}
                            helperText={characterLimitsHelperText}
                            error={showRequiredError && !name}
                            inputRef={nameRef}
                            InputLabelProps={{ required: false }}
                            id={'name-field'}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <FormControl className={classes.selectLevelForm} variant={'filled'}>
                            <InputLabel htmlFor={'select-level'}>Level</InputLabel>
                            <Select
                                fullWidth
                                labelId={'select-level'}
                                value={level}
                                onChange={(e): void => setLevel(String(e.target.value))}
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
                        {smDown ? null : (
                            <>
                                <FormControlLabel control={<Checkbox name={'checkedC'} />} label={bluiProtection} />
                                <Tooltip arrow title={bluiProtectionDescription} placement={'top'}>
                                    <HelpOutline style={{ color: theme.palette.text.disabled }} />
                                </Tooltip>
                            </>
                        )}
                        {smUp ? null : (
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    marginTop: theme.spacing(5),
                                    alignItems: 'end',
                                }}
                            >
                                <FormControlLabel
                                    control={<Checkbox name={'checkedC'} />}
                                    label={''}
                                    style={{ marginTop: -6 }}
                                />
                                <div>
                                    <Typography variant={'body1'}>Brightlayer Protection</Typography>
                                    <Typography variant={'body2'} style={{ color: theme.palette.text.secondary }}>
                                        Brightlayer Protection provides a three-year power xpert warranty.
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>

                    <Divider className={classes.divider} />

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <LocationOn className={classes.icon} />
                        <Typography variant={'h6'}>Address</Typography>
                    </div>

                    <div>
                        <Typography variant={'body1'}>
                            Note that different country write addresses in different ways. The following fields are for
                            a United States address.
                        </Typography>
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            required
                            inputRef={addressRef}
                            className={classes.textField}
                            value={address}
                            label={'Address'}
                            variant={'filled'}
                            onChange={(e): void => setAddress(e.target.value)}
                            error={showRequiredError && !address}
                            helperText={getRequiredHelperText(address)}
                            InputLabelProps={{ required: false }}
                            id={'address-field'}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            className={classes.textField}
                            value={addressLine2}
                            label={'Address Line 2 (Optional)'}
                            variant={'filled'}
                            onChange={(e): void => setAddressLine2(e.target.value)}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            required
                            inputRef={cityRef}
                            className={classes.textField}
                            value={city}
                            label={'City'}
                            variant={'filled'}
                            error={showRequiredError && !city}
                            helperText={getRequiredHelperText(city)}
                            InputLabelProps={{ required: false }}
                            onChange={(e): void => setCity(e.target.value)}
                            id={'city-field'}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <FormControl
                            variant={'filled'}
                            required
                            fullWidth
                            className={classes.textField}
                            id={'state-field'}
                            error={showRequiredError && !state}
                        >
                            <InputLabel id={'select-state'} required={false}>
                                State
                            </InputLabel>
                            <Select
                                inputRef={stateRef}
                                labelId={'select-state'}
                                value={state}
                                onChange={(e): void => setState(String(e.target.value))}
                            >
                                <MenuItem value={'CA'}>CA</MenuItem>
                                <MenuItem value={'MI'}>MI</MenuItem>
                                <MenuItem value={'GA'}>GA</MenuItem>
                            </Select>
                            {showRequiredError && !state && <FormHelperText error={true}>Required</FormHelperText>}
                        </FormControl>

                        <TextField
                            required
                            inputRef={zipRef}
                            className={clsx(classes.zipInput, classes.textField)}
                            value={zip}
                            label={'Zip'}
                            variant={'filled'}
                            onChange={(e): void => {
                                if (!isNaN(Number(e.target.value))) {
                                    setZip(e.target.value);
                                }
                            }}
                            InputLabelProps={{ required: false }}
                            error={showRequiredError && !zip}
                            helperText={getRequiredHelperText(zip)}
                            id={'zip-field'}
                        />

                        <TextField
                            disabled
                            style={{ minWidth: 170 }}
                            className={classes.textField}
                            value={'United States'}
                            label={'Country'}
                            variant={'filled'}
                        />
                    </div>

                    <Divider className={classes.divider} />

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <ContactMail className={classes.icon} />
                        <Typography variant={'h6'}>Key Contact</Typography>
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            inputRef={firstNameRef}
                            className={clsx(classes.firstNameFormField, classes.textField)}
                            value={firstName}
                            label={'First Name'}
                            variant={'filled'}
                            onChange={(e): void => setFirstName(e.target.value)}
                            error={showRequiredError && !firstName}
                            helperText={getRequiredHelperText(firstName)}
                            InputLabelProps={{ required: false }}
                            id={'first-name-field'}
                        />
                        <TextField
                            className={clsx(classes.lastNameFormField, classes.textField)}
                            value={lastName}
                            label={'Last Name (Optional)'}
                            variant={'filled'}
                            onChange={(e): void => setLastName(e.target.value)}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            required
                            inputRef={emailRef}
                            className={classes.textField}
                            value={email}
                            label={'Email'}
                            variant={'filled'}
                            InputLabelProps={{ required: false }}
                            error={(showRequiredError && Boolean(emailError)) || (showRequiredError && !email)}
                            helperText={getEmailHelperText(email)}
                            onChange={onEmailChange}
                            onBlur={onEmailBlur}
                            id={'email-field'}
                        />
                    </div>

                    {smUp ? null : (
                        <Divider
                            className={classes.divider}
                            style={{ marginBottom: theme.spacing(-3), marginTop: theme.spacing(4) }}
                        />
                    )}

                    <div className={classes.submitButtonContainer}>
                        <Button
                            className={classes.submitButton}
                            color={'primary'}
                            variant={'contained'}
                            onClick={onSubmit}
                            id={'submit-button'}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
