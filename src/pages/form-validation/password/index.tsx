import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    InputProps,
    Hidden,
    Divider,
    Button,
    Card,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Done, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@pxblue/colors';
import { Spacer } from '@pxblue/react-components';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 1 0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0px',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        maxWidth: 450,
        maxHeight: 740,
        height: '100vh',
        overflow: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: 600,
            height: 'unset',
            minHeight: 'calc(100vh - 56px)',
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    sectionHeader: {
        width: '100%',
        marginBottom: 16,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    newPasswordInputField: {
        marginTop: theme.spacing(4),
    },
    formOverflow: {
        display: 'flex',
        flex: '1 1 0',
        height: '100%',
        overflow: 'auto',
    },
    passwordCriteria: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    appbarRoot: {
        padding: 0,
    },
    visibilityToggle: {
        height: 36,
        width: 36
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    divider: {
        width: `calc(100% + ${theme.spacing(6)}px)`,
        marginTop: theme.spacing(6),
        marginLeft: -theme.spacing(3),
        marginRight: -theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            width: `calc(100% + ${theme.spacing(4)}px)`,
            marginLeft: -theme.spacing(2),
            marginRight: -theme.spacing(2),
        },
    },
    topDivider: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2),
        },
    },
    bottomDivider: {
        marginTop: theme.spacing(6),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2),
        },
    },
    submitButtonContainer: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    mobileSubmitButtonContainer: {
        width: '100%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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

export const PasswordFormValidation = (): JSX.Element => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState<FormError>();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState<FormError>();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<FormError>();
    const [showCurrentPassword, setshowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordErrors, setPasswordErrors] = useState({
        minLengthRequired: false,
        atLeast1UpperCharRequired: false,
        atLeast1LowerCharRequired: false,
        atLeast1NumberRequired: false,
        atLeast1SplCharRequired: false,
    });

    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const PASSWORD_MISMATCH = 'Passwords do not match';

    const getPasswordCriteriaIcon = (error: boolean): JSX.Element => (
        <Done
            style={{
                fontSize: 18,
                color: error ? theme.palette.primary.main : Colors.gray[200],
                marginRight: theme.spacing(),
            }}
        />
    );

    const validateCurrentPassword = useCallback((): void => {
        const tempcurrentPassword = currentPassword;
        let tempcurrentPasswordError = '';
        if (!tempcurrentPassword.trim()) {
            tempcurrentPasswordError = 'required';
        }
        setCurrentPasswordError(tempcurrentPasswordError);
    }, [currentPassword]);

    const validateNewPassword = useCallback((): void => {
        const tempNewPassword = newPassword;
        let tempNewPasswordError = '';
        if (!tempNewPassword.trim() || Object.values(passwordErrors).includes(false)) {
            tempNewPasswordError = 'required';
        }
        setNewPasswordError(tempNewPasswordError);
    }, [newPassword, passwordErrors]);

    const validatePasswordCriteria = useCallback((): void => {
        if (newPasswordError) {
            validateNewPassword();
        } else {
            setNewPasswordError(null);
        }
    }, [newPasswordError, validateNewPassword]);

    const onCurrentPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setCurrentPassword(event.target.value);
            if (currentPasswordError) {
                validateCurrentPassword();
            } else {
                setCurrentPasswordError(null);
            }
        },
        [currentPasswordError, validateCurrentPassword, confirmPassword]
    );

    const onNewPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setNewPassword(event.target.value);
            setConfirmPasswordError('');
            validatePasswordCriteria();
            if (event.target.value !== confirmPassword && confirmPassword !== '') {
                setConfirmPasswordError(PASSWORD_MISMATCH);
            }
        },
        [validatePasswordCriteria, confirmPassword]
    );

    const onConfirmPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setConfirmPasswordError('');
            setConfirmPassword(event.target.value);
            if (newPassword !== event.target.value) {
                setConfirmPasswordError(PASSWORD_MISMATCH);
            }
        },
        [newPassword]
    );

    useEffect(() => {
        setPasswordErrors({
            minLengthRequired: newPassword.length >= 8,
            atLeast1UpperCharRequired: upperCharRegex.test(newPassword),
            atLeast1LowerCharRequired: lowerCharRegex.test(newPassword),
            atLeast1NumberRequired: numberRegex.test(newPassword),
            atLeast1SplCharRequired: splCharRegex.test(newPassword),
        });
    }, [newPassword]);

    const meetsRequirements = useCallback(
        (): boolean =>
            Boolean(passwordErrors.atLeast1LowerCharRequired) &&
            Boolean(passwordErrors.atLeast1NumberRequired) &&
            Boolean(passwordErrors.atLeast1SplCharRequired) &&
            Boolean(passwordErrors.minLengthRequired) &&
            Boolean(passwordErrors.atLeast1UpperCharRequired),
        [passwordErrors]
    );

    const submitEnabled = useCallback(
        (): boolean => meetsRequirements() && newPassword === confirmPassword && Boolean(currentPassword),
        [meetsRequirements, newPassword, confirmPassword, currentPassword]
    );

    const clearForms = (): void => {
        setCurrentPassword('');
        setConfirmPassword('');
        setNewPassword('');
    };

    const passwordHintText = (error: boolean): string => (error ? theme.palette.text.primary : Colors.gray[200]);

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
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
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Change Password
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <Card className={classes.container} elevation={4}>
                    <Typography variant={'h6'} className={classes.sectionHeader}>
                        Change Password
                    </Typography>
                    <Typography variant={'body1'}>
                        Password must be at least 8 characters long, contain at least one uppercase character, one
                        lowercase character, one number, and one special character.
                    </Typography>

                    <Divider className={clsx(classes.divider, classes.topDivider)} />

                    <div className={classes.formOverflow}>
                        <form>
                            <TextField
                                id={'currentPassword'}
                                label={'Old Password'}
                                type={showCurrentPassword ? 'text' : 'password'}
                                onChange={onCurrentPasswordChange}
                                value={currentPassword}
                                error={Boolean(currentPasswordError)}
                                onBlur={validateCurrentPassword}
                                required
                                fullWidth
                                variant={'filled'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton
                                                className={classes.visibilityToggle}
                                                onClick={(): void => setshowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword && <Visibility />}
                                                {!showCurrentPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                className={classes.newPasswordInputField}
                                id={'newPassword'}
                                label={'New Password'}
                                type={showNewPassword ? 'text' : 'password'}
                                onChange={onNewPasswordChange}
                                value={newPassword}
                                error={Boolean(newPasswordError)}
                                onBlur={validateNewPassword}
                                required
                                fullWidth
                                variant={'filled'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton
                                                className={classes.visibilityToggle}
                                                onClick={(): void => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword && <Visibility />}
                                                {!showNewPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <List disablePadding component={'ul'} style={{ marginTop: 8 }}>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.minLengthRequired)}
                                    <Typography
                                        variant={'caption'}
                                        style={{ color: passwordHintText(passwordErrors.minLengthRequired) }}
                                    >
                                        At least 8 characters in length
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1NumberRequired)}
                                    <Typography
                                        variant={'caption'}
                                        style={{ color: passwordHintText(passwordErrors.atLeast1NumberRequired) }}
                                    >
                                        At least 1 digit
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1UpperCharRequired)}
                                    <Typography
                                        variant={'caption'}
                                        style={{ color: passwordHintText(passwordErrors.atLeast1UpperCharRequired) }}
                                    >
                                        At least 1 uppercase letter
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1LowerCharRequired)}
                                    <Typography
                                        variant={'caption'}
                                        style={{ color: passwordHintText(passwordErrors.atLeast1LowerCharRequired) }}
                                    >
                                        At least 1 lowercase letter
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1SplCharRequired)}
                                    <Typography
                                        variant={'caption'}
                                        style={{ color: passwordHintText(passwordErrors.atLeast1SplCharRequired) }}
                                    >
                                        At least 1 special character: (valid: ! @ # $ ^ &)
                                    </Typography>
                                </ListItem>
                            </List>

                            <TextField
                                className={classes.newPasswordInputField}
                                id={'confirmPassword'}
                                label={'Confirm Password'}
                                type={showConfirmPassword ? 'text' : 'password'}
                                helperText={confirmPasswordError}
                                onChange={onConfirmPasswordChange}
                                value={confirmPassword}
                                error={Boolean(confirmPasswordError)}
                                required
                                fullWidth
                                variant={'filled'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton
                                                className={classes.visibilityToggle}
                                                onClick={(): void => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword && <Visibility />}
                                                {!showConfirmPassword && <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </div>
                    <Divider className={clsx(classes.divider, classes.bottomDivider)} />
                    <div className={classes.submitButtonContainer}>
                        <Button
                            color={'primary'}
                            style={{ width: 100 }}
                            variant="outlined"
                            onClick={(): void => clearForms()}
                        >
                            Cancel
                        </Button>
                        <Spacer />
                        <Button
                            color={'primary'}
                            style={{ width: 100 }}
                            variant="contained"
                            disabled={!submitEnabled()}
                            onClick={(): void => clearForms()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className={classes.mobileSubmitButtonContainer}>
                        <Button
                            color={'primary'}
                            variant="contained"
                            style={{ width: '100%' }}
                            disabled={!submitEnabled()}
                            onClick={(): void => clearForms()}
                        >
                            Submit
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
