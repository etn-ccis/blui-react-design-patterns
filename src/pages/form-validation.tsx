import React, { useState } from 'react';
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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Close, Done } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';

export const FormValidation = (): JSX.Element => {
    const [chars, setChars] = useState('');
    const [input, setInput] = useState('');
    const [inputError, setInputError] = useState();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState();
    const MAX_CHARS_LIMIT = 30;
    const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    const phoneNumberRegex = new RegExp(/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/);

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const [passwordErrors, setPasswordErrors] = useState({
        minLengthRequired: 'required',
        atLeast1UpperCharRequired: 'required',
        atLeast1LowerCharRequired: 'required',
        atLeast1NumberRequired: 'required',
        atLeast1SplCharRequired: 'required',
    });
    const upperCharRegex = new RegExp(/[A-Z]+/);
    const lowerCharRegex = new RegExp(/[a-z]+/);
    const numberRegex = new RegExp(/[0-9]+/);
    const splCharRegex = new RegExp(/(!|@|#|\$|\^|&)+/);

    const getValidationIcon = (error: any): any => {
        if (error && error.length > 0) {
            return <Close style={{ color: Colors.red[500] }} />;
        } else if (error === '') {
            return <Done style={{ color: Colors.green[500] }} />;
        }
        return;
    };

    const getHelperText = (error: any): any => {
        if (error === 'required') {
            return null;
        }
        return error;
    };

    const characterLimitsHelperText = (
        <>
            <span>Max {MAX_CHARS_LIMIT} characters</span>
            <span style={{ float: 'right' }}>{`${chars.length}/${MAX_CHARS_LIMIT}`}</span>
        </>
    );

    const validateInput = (): void => {
        const tempInput = input;
        let tempInputError = null;
        if (!tempInput.trim()) {
            tempInputError = 'required';
        }
        setInputError(tempInputError);
    };

    const onChange = (event: any): void => {
        setChars(event.target.value);
        validateInput();
    };

    const onInputChange = (event: any): void => {
        setInput(event.target.value);
        validateInput();
    };

    const validateEmail = (): void => {
        const tempEmail = email;
        let tempEmailError = '';
        if (!tempEmail.trim()) {
            tempEmailError = 'required';
        } else if (!emailRegex.test(tempEmail)) {
            tempEmailError = 'Invalid email address';
        }
        setEmailError(tempEmailError);
    };

    const onEmailChange = (event: any): void => {
        setEmail(event.target.value);

        if (emailError) {
            validateEmail();
        } else {
            setEmailError(null);
        }
    };

    const validatePhoneNumber = (): void => {
        const tempPhoneNumber = phoneNumber;
        let tempPhoneNumberError = '';
        if (!tempPhoneNumber.trim()) {
            tempPhoneNumberError = 'required';
        } else if (!phoneNumberRegex.test(tempPhoneNumber)) {
            tempPhoneNumberError = 'Invalid phone number';
        }
        setPhoneNumberError(tempPhoneNumberError);
    };

    const onPhoneNumberChange = (event: any): void => {
        let { value } = event.target;
        value = value.replace(/[a-zA-Z]+/, '');
        setPhoneNumber(value);
        if (phoneNumberError) {
            validatePhoneNumber();
        } else {
            setPhoneNumberError(null);
        }
    };

    const validateOldPassword = (): void => {
        const tempOldPassword = oldPassword;
        let tempOldPasswordError = '';
        if (!tempOldPassword.trim()) {
            tempOldPasswordError = 'required';
        }
        setOldPasswordError(tempOldPasswordError);
    };

    const onOldPasswordChange = (event: any): void => {
        setOldPassword(event.target);
        if (oldPasswordError) {
            validateOldPassword();
        } else {
            setOldPasswordError(null);
        }
    };

    const validateNewPassword = (): void => {
        const tempNewPassword = newPassword;
        let tempNewPasswordError = '';
        if (!tempNewPassword.trim() || Object.values(passwordErrors).includes('required')) {
            tempNewPasswordError = 'required';
        }
        setNewPasswordError(tempNewPasswordError);
    };

    const validatePasswordCriteria = (): void => {
        const tempPasswordErrors = {
            minLengthRequired: newPassword.length >= 8 ? '' : 'required',
            atLeast1UpperCharRequired: upperCharRegex.test(newPassword) ? '' : 'required',
            atLeast1LowerCharRequired: lowerCharRegex.test(newPassword) ? '' : 'required',
            atLeast1NumberRequired: numberRegex.test(newPassword) ? '' : 'required',
            atLeast1SplCharRequired: splCharRegex.test(newPassword) ? '' : 'required',
        };
        setPasswordErrors(tempPasswordErrors);

        if (newPasswordError) {
            validateNewPassword();
        } else {
            setNewPasswordError(null);
        }
    };

    const onNewPasswordChange = (event: any): void => {
        setNewPassword(event.target.value);
        validatePasswordCriteria();
    };

    const validateConfirmPassword = (): void => {
        const tempConfirmPassword = confirmPassword;
        let tempConfirmPasswordError = '';
        if (!tempConfirmPassword.trim()) {
            tempConfirmPasswordError = 'required';
        } else if (newPassword !== confirmPassword) {
            tempConfirmPasswordError = 'Passwords do not match';
        }
        setConfirmPasswordError(tempConfirmPasswordError);
    };

    const onConfirmPasswordChange = (event: any): void => {
        setConfirmPassword(event.target.value);
        if (confirmPasswordError) {
            validateConfirmPassword();
        } else {
            setConfirmPasswordError(null);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Form Validation</Typography>
                </Toolbar>
            </AppBar>

            <div style={{ padding: 20 }}>
                <Typography variant="h6">Basic Form Fields</Typography>
                <Typography variant="body2">
                    The following example shows how to perform validation on various input types. The error icon on
                    invalid inputs is optional, but adds redundancy for color blind users.
                </Typography>
                <br />
                <Card>
                    <CardContent>
                        <div>
                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="input"
                                label="Input"
                                fullWidth
                                required
                                value={input}
                                onChange={onInputChange}
                                error={Boolean(inputError)}
                                onBlur={validateInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(inputError || '')}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="email"
                                label="Enter Your Email"
                                helperText={getHelperText(emailError)}
                                fullWidth
                                required
                                value={email}
                                error={Boolean(emailError)}
                                onChange={onEmailChange}
                                onBlur={validateEmail}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(emailError || '')}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="phoneNumber"
                                label="Phone Number"
                                helperText={getHelperText(phoneNumberError)}
                                fullWidth
                                required
                                value={phoneNumber}
                                error={Boolean(phoneNumberError)}
                                onChange={onPhoneNumberChange}
                                onBlur={validatePhoneNumber}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(phoneNumberError || '')}
                                        </InputAdornment>
                                    ),
                                }}
                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                inputProps={{ maxLength: 22 }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ padding: 20 }}>
                <Typography variant="h6">Character Limits</Typography>
                <Typography variant="body2">
                    The following example shows how to restrict the length of an input field. In these cases, you should
                    provide the user an indiction of how many characters are available.
                </Typography>{' '}
                <br />
                <Card>
                    <CardContent>
                        <form>
                            <TextField
                                id="chars"
                                label="Enter some text"
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

            <div style={{ padding: 20 }}>
                <Typography variant="h6">Password Validation</Typography>
                <Typography variant="body2">
                    The following example shows how to enforce password strength restrictions and confirmation field
                    matching. The password strength requirements for your application may differ from this example.
                </Typography>
                <br />
                <Card>
                    <CardContent>
                        <form>
                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="oldPassword"
                                label="Old Password"
                                type="password"
                                value={oldPassword}
                                error={Boolean(oldPasswordError)}
                                required
                                fullWidth
                                onChange={onOldPasswordChange}
                                onBlur={validateOldPassword}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="newPassword"
                                label="New Password"
                                type="password"
                                onChange={onNewPasswordChange}
                                value={newPassword}
                                error={Boolean(newPasswordError)}
                                onBlur={validateNewPassword}
                                required
                                fullWidth
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                helperText={getHelperText(confirmPasswordError)}
                                onChange={onConfirmPasswordChange}
                                value={confirmPassword}
                                error={Boolean(confirmPasswordError)}
                                onBlur={validateConfirmPassword}
                                required
                                fullWidth
                            />
                        </form>
                        <p>A Password must contain the following:</p>
                        <List component="nav">
                            <ListItem>
                                {getValidationIcon(passwordErrors.minLengthRequired)}
                                At least 8 characters in length
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(passwordErrors.atLeast1NumberRequired)}
                                At least 1 digit
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(passwordErrors.atLeast1UpperCharRequired)}
                                At least 1 uppercase letter
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(passwordErrors.atLeast1LowerCharRequired)}
                                At least 1 lowercase letter
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(passwordErrors.atLeast1SplCharRequired)}
                                At least 1 special character: (valid: ! @ # $ ^ &)
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
