import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import * as Colors from '@pxblue/colors';

const MAX_CHARS_LIMIT = 30;
const upperCharRegex = new RegExp(/[A-Z]+/);
const lowerCharRegex = new RegExp(/[a-z]+/);
const numberRegex = new RegExp(/[0-9]+/);
const splCharRegex = new RegExp(/(!|@|#|\$|\^|&)+/);
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const phoneNumberRegex = new RegExp(/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/);

const getValidationIcon = (error: any): any => {
    if (error && error.length > 0) {
        return <Close style={{ color: Colors.red[500] }} />;
    } else if (error === '') {
        return <Done style={{ color: Colors.green[500] }} />;
    } else {
        return '';
    }
};

const getHelperText = (error: any): any => {
    if (error === 'required') {
        return null;
    }
    return error;
};

export class ValidationForm extends React.Component {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            oldPassword: '',
            oldPasswordError: null,
            newPassword: '',
            newPasswordError: null,
            confirmPassword: '',
            confirmPasswordError: null,
            passwordErrors: {
                minLengthRequired: 'required',
                atleast1UpperCharRequired: 'required',
                atleast1LowerCharRequired: 'required',
                atleast1NumberRequired: 'required',
                atleast1SplCharRequired: 'required',
            },
            input: '',
            inputError: null,
            email: '',
            emailError: null,
            phoneNumber: '',
            phoneNumberError: null,
            chars: '',
        };
    }

    onInputChange = (event: any): void => {
        this.setState({ input: event.target.value }, () => {
            if (this.state.inputError != null) {
                this.validateInput();
            } else {
                this.setState({ inputError: null });
            }
        });
    };

    validateInput = (): void => {
        const { input } = this.state;
        let inputError = '';
        if (!input.trim()) {
            inputError = 'required';
        }
        this.setState({ inputError });
    };

    onOldPasswordChange = (event: any): void => {
        this.setState({ oldPassword: event.target.value }, () => {
            if (this.state.oldPasswordError != null) {
                this.validateOldPassword();
            } else {
                this.setState({ oldPasswordError: null });
            }
        });
    };

    validateOldPassword = (): void => {
        const { oldPassword } = this.state;
        let oldPasswordError = '';
        if (!oldPassword.trim()) {
            oldPasswordError = 'required';
        }
        this.setState({ oldPasswordError });
    };

    onNewPasswordChange = (e: any): void => {
        this.setState({ newPassword: e.target.value }, () => {
            this.validatePasswordCriteria();
        });
    };

    validateNewPassword = (): void => {
        const { newPassword } = this.state;
        let newPasswordError = '';
        if (!newPassword.trim() || Object.values(this.state.passwordErrors).includes('required')) {
            newPasswordError = 'required';
        }
        this.setState({ newPasswordError });
    };

    validatePasswordCriteria = (): void => {
        const { newPassword } = this.state;
        const passwordErrors = {
            minLengthRequired: newPassword.length >= 8 ? '' : 'required',
            atleast1UpperCharRequired: upperCharRegex.test(newPassword) ? '' : 'required',
            atleast1LowerCharRequired: lowerCharRegex.test(newPassword) ? '' : 'required',
            atleast1NumberRequired: numberRegex.test(newPassword) ? '' : 'required',
            atleast1SplCharRequired: splCharRegex.test(newPassword) ? '' : 'required',
        };
        this.setState({ passwordErrors }, () => {
            if (this.state.newPasswordError != null) {
                this.validateNewPassword();
            } else {
                this.setState({ newPasswordError: null });
            }
        });
    };

    onConfirmPasswordChange = (event: any): void => {
        this.setState({ confirmPassword: event.target.value }, () => {
            if (this.state.confirmPasswordError != null) {
                this.validateConfirmPassword();
            } else {
                this.setState({ confirmPasswordError: null });
            }
        });
    };

    validateConfirmPassword = (): void => {
        const { confirmPassword } = this.state;
        let confirmPasswordError = '';
        if (!confirmPassword.trim()) {
            confirmPasswordError = 'required';
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            confirmPasswordError = 'Passwords do not match';
        }
        this.setState({ confirmPasswordError });
    };

    onEmailChange = (event: any): void => {
        this.setState({ email: event.target.value }, () => {
            if (this.state.emailError != null) {
                this.validateEmail();
            } else {
                this.setState({ emailError: null });
            }
        });
    };

    validateEmail = (): void => {
        const { email } = this.state;
        let emailError = '';
        if (!email.trim()) {
            emailError = 'required';
        } else if (!emailRegex.test(email)) {
            emailError = 'Invalid email address';
        }
        this.setState({ emailError });
    };

    onPhoneNumberChange = (event: any): void => {
        let { value } = event.target;
        value = value.replace(/[a-zA-Z]+/, '');
        this.setState({ phoneNumber: value }, () => {
            if (this.state.phoneNumberError != null) {
                this.validatePhoneNumber();
            } else {
                this.setState({ phoneNumberError: null });
            }
        });
    };

    validatePhoneNumber = (): void => {
        const { phoneNumber } = this.state;
        let phoneNumberError = '';
        if (!phoneNumber.trim()) {
            phoneNumberError = 'required';
        } else if (!phoneNumberRegex.test(phoneNumber)) {
            phoneNumberError = 'Invalid phone number';
        }
        this.setState({ phoneNumberError });
    };

    onChange = (e: any): void => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    render(): any {
        const headerBlock = (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Form Validation</Typography>
                </Toolbar>
            </AppBar>
        );
        const passwordValidationBlock = (
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
                                // className="textField"
                                style={{ paddingBottom: 40 }}
                                id="oldPassword"
                                label="Old Password"
                                type="password"
                                value={this.state.oldPassword}
                                error={Boolean(this.state.oldPasswordError)}
                                required
                                fullWidth
                                onChange={this.onOldPasswordChange}
                                onBlur={this.validateOldPassword}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="newPassword"
                                label="New Password"
                                type="password"
                                onChange={this.onNewPasswordChange}
                                value={this.state.newPassword}
                                error={Boolean(this.state.newPasswordError)}
                                onBlur={this.validateNewPassword}
                                required
                                fullWidth
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                helperText={getHelperText(this.state.confirmPasswordError)}
                                onChange={this.onConfirmPasswordChange}
                                value={this.state.confirmPassword}
                                error={Boolean(this.state.confirmPasswordError)}
                                onBlur={this.validateConfirmPassword}
                                required
                                fullWidth
                            />
                        </form>
                        <p>A Password must contain the following:</p>
                        <List component="nav">
                            <ListItem>
                                {getValidationIcon(this.state.passwordErrors.minLengthRequired)}
                                At least 8 characters in length
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(this.state.passwordErrors.atleast1NumberRequired)}
                                At least 1 digit
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(this.state.passwordErrors.atleast1UpperCharRequired)}
                                At least 1 uppercase letter
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(this.state.passwordErrors.atleast1LowerCharRequired)}
                                At least 1 lowercase letter
                            </ListItem>
                            <ListItem>
                                {getValidationIcon(this.state.passwordErrors.atleast1SplCharRequired)}
                                At least 1 special character: (valid: ! @ # $ ^ &)
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </div>
        );

        const formFieldsBlock = (
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
                                value={this.state.input}
                                onChange={this.onInputChange}
                                error={Boolean(this.state.inputError)}
                                onBlur={this.validateInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(this.state.inputError)}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="email"
                                label="Enter Your Email"
                                helperText={getHelperText(this.state.emailError)}
                                fullWidth
                                required
                                value={this.state.email}
                                error={Boolean(this.state.emailError)}
                                onChange={this.onEmailChange}
                                onBlur={this.validateEmail}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(this.state.emailError)}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                style={{ paddingBottom: 40 }}
                                id="phoneNumber"
                                label="Phone Number"
                                helperText={getHelperText(this.state.phoneNumberError)}
                                fullWidth
                                required
                                value={this.state.phoneNumber}
                                error={Boolean(this.state.phoneNumberError)}
                                onChange={this.onPhoneNumberChange}
                                onBlur={this.validatePhoneNumber}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {getValidationIcon(this.state.phoneNumberError)}
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
        );

        const characterLimitsHelperText = (
            <>
                <span>Max {MAX_CHARS_LIMIT} characters</span>
                <span style={{ float: 'right' }}>{`${this.state.chars.length}/${MAX_CHARS_LIMIT}`}</span>
            </>
        );
        const characterLimitsBlock = (
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
                                value={this.state.chars}
                                onChange={this.onChange}
                                inputProps={{ maxLength: MAX_CHARS_LIMIT }}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
        return (
            <div style={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
                <div style={{ flex: '4', padding: '16px', height: '100vh', overflowY: 'scroll' }}>
                    {headerBlock}
                    {formFieldsBlock}
                    {characterLimitsBlock}
                    {passwordValidationBlock}
                </div>
                <div
                    style={{
                        flex: '1',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                        padding: '16px',
                        minWidth: '200px',
                    }}
                >
                    Some info about form validation...
                </div>
            </div>
        );
    }
}

export default ValidationForm;
