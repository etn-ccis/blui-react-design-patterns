import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    List,
    ListItem,
    InputProps,
    Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Close, Done, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
    marginedField: {
        marginTop: theme.spacing(2),
    },
    block: {
        padding: theme.spacing(2),
    },
}));

type FormError = undefined | null | string;
type OnChangeHandler = InputProps['onChange'];

export const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
export const phoneNumberRegex = new RegExp(/^((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})$/);
export const upperCharRegex = new RegExp(/[A-Z]+/);
export const lowerCharRegex = new RegExp(/[a-z]+/);
export const numberRegex = new RegExp(/[0-9]+/);
export const splCharRegex = new RegExp(/(!|@|#|\$|\^|&)+/);

export const FormValidation = (): JSX.Element => {
    const [input, setInput] = useState('');
    const [inputError, setInputError] = useState<FormError>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<FormError>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState<FormError>(null);

    const [chars, setChars] = useState('');
    const MAX_CHARS_LIMIT = 30;

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState<FormError>();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState<FormError>();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<FormError>();
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordErrors, setPasswordErrors] = useState({
        minLengthRequired: 'required',
        atLeast1UpperCharRequired: 'required',
        atLeast1LowerCharRequired: 'required',
        atLeast1NumberRequired: 'required',
        atLeast1SplCharRequired: 'required',
    });

    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    const getValidationIcon = (error: FormError, value?: string): JSX.Element => {
        if (error && error.length > 0) {
            return <Close style={{ color: theme.palette.error.main, marginRight: theme.spacing() }} />;
        } else if (value && !error) {
            return <Done style={{ color: theme.palette.primary.main, marginRight: theme.spacing() }} />;
        }
        return <></>;
    };

    const characterLimitsHelperText = (
        <>
            <span>Max {MAX_CHARS_LIMIT} characters</span>
            <span style={{ float: 'right' }}>{`${chars.length}/${MAX_CHARS_LIMIT}`}</span>
        </>
    );

    const validateInput = useCallback(
        (value: string): void => {
            const tempInput = value;
            let tempInputError = null;
            if (!tempInput.trim()) {
                tempInputError = 'required';
            }
            setInputError(tempInputError);
        },
        [setInputError]
    );

    const onChange: OnChangeHandler = useCallback(
        (event) => {
            setChars(event.target.value);
            validateInput(event.target.value);
        },
        [setChars, validateInput]
    );

    const onInputChange: OnChangeHandler = useCallback(
        (event) => {
            setInput(event.target.value);
            validateInput(event.target.value);
        },
        [setInput, validateInput]
    );

    const onInputBlur = useCallback((): void => {
        validateInput(input);
    }, [validateInput, input]);

    const validateEmail = useCallback(
        (value: string): void => {
            const tempEmail = value;
            let tempEmailError = '';
            if (!tempEmail.trim()) {
                tempEmailError = 'required';
            } else if (!emailRegex.test(tempEmail)) {
                tempEmailError = 'Invalid email address';
            }
            setEmailError(tempEmailError);
        },
        [setEmailError]
    );

    const onEmailChange: OnChangeHandler = useCallback(
        (event) => {
            setEmail(event.target.value);
            if (emailError) {
                validateEmail(event.target.value);
            } else {
                setEmailError(null);
            }
        },
        [setEmail, emailError, validateEmail, setEmailError]
    );

    const onEmailBlur = useCallback((): void => {
        validateEmail(email);
    }, [validateEmail, email]);

    const validatePhoneNumber = useCallback((): void => {
        const tempPhoneNumber = phoneNumber;
        let tempPhoneNumberError = '';
        if (!tempPhoneNumber.trim()) {
            tempPhoneNumberError = 'required';
        } else if (!phoneNumberRegex.test(tempPhoneNumber)) {
            tempPhoneNumberError = 'Invalid phone number';
        }
        setPhoneNumberError(tempPhoneNumberError);
    }, [phoneNumber, setPhoneNumberError]);

    const onPhoneNumberChange: OnChangeHandler = useCallback(
        (event) => {
            let { value } = event.target;
            value = value.replace(/[a-zA-Z]+/, '');
            setPhoneNumber(value);
            if (phoneNumberError) {
                validatePhoneNumber();
            } else {
                setPhoneNumberError(null);
            }
        },
        [setPhoneNumber, phoneNumberError, validatePhoneNumber, setPhoneNumberError]
    );

    const validateOldPassword = useCallback((): void => {
        const tempOldPassword = oldPassword;
        let tempOldPasswordError = '';
        if (!tempOldPassword.trim()) {
            tempOldPasswordError = 'required';
        }
        setOldPasswordError(tempOldPasswordError);
    }, [oldPassword, setOldPasswordError]);

    const onOldPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setOldPassword(event.target.value);
            if (oldPasswordError) {
                validateOldPassword();
            } else {
                setOldPasswordError(null);
            }
        },
        [setOldPassword, oldPasswordError, validateOldPassword, setOldPasswordError]
    );

    const validateNewPassword = useCallback((): void => {
        const tempNewPassword = newPassword;
        let tempNewPasswordError = '';
        if (!tempNewPassword.trim() || Object.values(passwordErrors).includes('required')) {
            tempNewPasswordError = 'required';
        }
        setNewPasswordError(tempNewPasswordError);
    }, [newPassword, passwordErrors, setNewPasswordError]);

    const validatePasswordCriteria = useCallback((): void => {
        if (newPasswordError) {
            validateNewPassword();
        } else {
            setNewPasswordError(null);
        }
    }, [newPasswordError, validateNewPassword, setNewPasswordError]);

    useEffect(() => {
        const tempPasswordErrors = {
            minLengthRequired: newPassword.length >= 8 ? '' : 'required',
            atLeast1UpperCharRequired: upperCharRegex.test(newPassword) ? '' : 'required',
            atLeast1LowerCharRequired: lowerCharRegex.test(newPassword) ? '' : 'required',
            atLeast1NumberRequired: numberRegex.test(newPassword) ? '' : 'required',
            atLeast1SplCharRequired: splCharRegex.test(newPassword) ? '' : 'required',
        };
        setPasswordErrors(tempPasswordErrors);
    }, [newPassword]);

    const onNewPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setNewPassword(event.target.value);
            validatePasswordCriteria();
        },
        [setNewPassword, validatePasswordCriteria]
    );

    const validateConfirmPassword = useCallback((): void => {
        const tempConfirmPassword = confirmPassword;
        let tempConfirmPasswordError = '';
        if (!tempConfirmPassword.trim()) {
            tempConfirmPasswordError = 'required';
        } else if (newPassword !== confirmPassword) {
            tempConfirmPasswordError = 'Passwords do not match';
        }
        setConfirmPasswordError(tempConfirmPasswordError);
    }, [confirmPassword, newPassword, setConfirmPasswordError]);

    const onConfirmPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setConfirmPassword(event.target.value);
            if (confirmPasswordError) {
                validateConfirmPassword();
            } else {
                setConfirmPasswordError(null);
            }
        },
        [setConfirmPassword, confirmPasswordError, validateConfirmPassword, setConfirmPasswordError]
    );

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: '100vh',
            }}
        >
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Form Validation
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.block}>
                <Typography variant={'h6'}>Basic Form Fields</Typography>
                <Typography variant={'body2'}>
                    The following example shows how to perform validation on various input types. The error icon on
                    invalid inputs is optional, but adds redundancy for color blind users.
                </Typography>
                <br />
                <Card>
                    <CardContent>
                        <div>
                            <TextField
                                id={'input'}
                                label={'Input'}
                                fullWidth
                                helperText={inputError || 'This is a regular input field.'}
                                required
                                value={input}
                                onChange={onInputChange}
                                error={Boolean(inputError)}
                                onBlur={onInputBlur}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            {getValidationIcon(inputError, input)}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                className={classes.marginedField}
                                id={'email'}
                                label={'Enter Your Email'}
                                helperText={
                                    emailError || 'This field throws an error if the email format is incorrect.'
                                }
                                fullWidth
                                required
                                value={email}
                                error={Boolean(emailError)}
                                onChange={onEmailChange}
                                onBlur={onEmailBlur}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            {getValidationIcon(emailError, email)}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                className={classes.marginedField}
                                id={'phoneNumber'}
                                label={'Phone Number'}
                                helperText={
                                    phoneNumberError ||
                                    'This field throws an error if the phone number format is incorrect. (Needs to be a valid U.S. number)'
                                }
                                fullWidth
                                required
                                value={phoneNumber}
                                error={Boolean(phoneNumberError)}
                                onChange={onPhoneNumberChange}
                                onBlur={validatePhoneNumber}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            {getValidationIcon(phoneNumberError, phoneNumber)}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className={classes.block}>
                <Typography variant={'h6'}>Character Limits</Typography>
                <Typography variant={'body2'}>
                    The following example shows how to restrict the length of an input field. In these cases, you should
                    provide the user an indiction of how many characters are available.
                </Typography>{' '}
                <br />
                <Card>
                    <CardContent>
                        <form>
                            <TextField
                                id={'chars'}
                                label={'Enter some text'}
                                fullWidth
                                helperText={characterLimitsHelperText}
                                value={chars}
                                onChange={onChange}
                                inputProps={{ maxLength: MAX_CHARS_LIMIT }}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className={classes.block}>
                <Typography variant={'h6'}>Password Validation</Typography>
                <Typography variant={'body2'}>
                    The following example shows how to enforce password strength restrictions and confirmation field
                    matching. The password strength requirements for your application may differ from this example.
                </Typography>
                <br />
                <Card>
                    <CardContent>
                        <form>
                            <TextField
                                id={'oldPassword'}
                                label={'Old Password'}
                                type={showOldPassword ? 'text' : 'password'}
                                onChange={onOldPasswordChange}
                                value={oldPassword}
                                error={Boolean(oldPasswordError)}
                                onBlur={validateOldPassword}
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton style={{height: 36, width: 36}}
                                                        onClick={(): void => setShowOldPassword(!showOldPassword)}>
                                                {showOldPassword && <Visibility />}
                                                {!showOldPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                className={classes.marginedField}
                                id={'newPassword'}
                                label={'New Password'}
                                type={'password'}
                                onChange={onNewPasswordChange}
                                value={newPassword}
                                error={Boolean(newPasswordError)}
                                onBlur={validateNewPassword}
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton style={{height: 36, width: 36}}
                                                        onClick={(): void => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword && <Visibility />}
                                                {!showNewPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Typography className={classes.marginedField} variant={'body1'}>
                                A password must contain the following:
                            </Typography>

                            <List component={'ul'}>
                                <ListItem>
                                    {getValidationIcon(passwordErrors.minLengthRequired)}
                                    <Typography variant={'body2'}>At least 8 characters in length</Typography>
                                </ListItem>
                                <ListItem>
                                    {getValidationIcon(passwordErrors.atLeast1NumberRequired)}
                                    <Typography variant={'body2'}>At least 1 digit</Typography>
                                </ListItem>
                                <ListItem>
                                    {getValidationIcon(passwordErrors.atLeast1UpperCharRequired)}
                                    <Typography variant={'body2'}>At least 1 uppercase letter</Typography>
                                </ListItem>
                                <ListItem>
                                    {getValidationIcon(passwordErrors.atLeast1LowerCharRequired)}
                                    <Typography variant={'body2'}>At least 1 lowercase letter</Typography>
                                </ListItem>
                                <ListItem>
                                    {getValidationIcon(passwordErrors.atLeast1SplCharRequired)}
                                    <Typography variant={'body2'}>
                                        At least 1 special character: (valid: ! @ # $ ^ &)
                                    </Typography>
                                </ListItem>
                            </List>

                            <TextField
                                className={classes.marginedField}
                                id={'confirmPassword'}
                                label={'Confirm Password'}
                                type={'password'}
                                helperText={confirmPasswordError}
                                onChange={onConfirmPasswordChange}
                                value={confirmPassword}
                                error={Boolean(confirmPasswordError)}
                                onBlur={validateConfirmPassword}
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton style={{height: 36, width: 36}}
                                                        onClick={(): void => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword && <Visibility />}
                                                {!showConfirmPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
