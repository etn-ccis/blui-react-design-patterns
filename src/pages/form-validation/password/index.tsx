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
    Divider,
    Button,
    Card,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Done, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@brightlayer-ui/colors';
import { Spacer } from '@brightlayer-ui/react-components';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
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
        height: '100%',
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    newPasswordInputField: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    formOverflow: {
        display: 'flex',
        flex: '1',
        overflow: 'auto',
        width: '100%',
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
        width: 36,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    divider: {
        width: `calc(100% + ${theme.spacing(6)})`,
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(-3),
        marginRight: theme.spacing(-3),
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% + ${theme.spacing(4)})`,
            marginLeft: theme.spacing(-2),
            marginRight: theme.spacing(-2),
        },
    },
    topDivider: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
        },
    },
    bottomDivider: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
        },
    },
    submitButtonContainer: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
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
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [blurredConfirmPassword, setBlurredConfirmPassword] = useState<boolean>(false);
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
    const md = useMediaQuery(theme.breakpoints.up('md'));
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
        let err = '';
        if (!currentPassword.trim()) {
            err = 'required';
        }
        setCurrentPasswordError(err);
    }, [currentPassword]);

    const validateNewPassword = useCallback((): void => {
        let err = '';
        if (!newPassword.trim() || Object.values(passwordErrors).includes(false)) {
            err = 'required';
        }
        setNewPasswordError(err);
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
            if (newPassword !== event.target.value && blurredConfirmPassword) {
                setConfirmPasswordError(PASSWORD_MISMATCH);
            }
        },
        [newPassword, blurredConfirmPassword]
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
        setBlurredConfirmPassword(false);
        setConfirmPasswordError('');
        setCurrentPasswordError('');
    };

    const passwordHintText = (error: boolean): string => (error ? theme.palette.text.primary : Colors.gray[200]);

    return (
        <div className={classes.root}>
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
                            <MenuIcon />
                        </IconButton>
                    )}
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
                        <form style={{ width: '100%' }}>
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
                                                onClick={(): void => setShowCurrentPassword(!showCurrentPassword)}
                                                size="large"
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
                                                size="large"
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
                                onBlur={(): void => {
                                    setBlurredConfirmPassword(true);
                                    if (newPassword !== confirmPassword) {
                                        setConfirmPasswordError(PASSWORD_MISMATCH);
                                    }
                                }}
                                value={confirmPassword}
                                error={Boolean(confirmPasswordError) && blurredConfirmPassword}
                                required
                                fullWidth
                                variant={'filled'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton
                                                className={classes.visibilityToggle}
                                                onClick={(): void => setShowConfirmPassword(!showConfirmPassword)}
                                                size="large"
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
                            variant={'outlined'}
                            onClick={(): void => clearForms()}
                        >
                            Cancel
                        </Button>
                        <Spacer />
                        <Button
                            color={'primary'}
                            style={{ width: 100 }}
                            variant={'contained'}
                            disabled={!submitEnabled()}
                            onClick={(): void => clearForms()}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className={classes.mobileSubmitButtonContainer}>
                        <Button
                            color={'primary'}
                            variant={'contained'}
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
