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
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        width: 450,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            minHeight: 'calc(100vh - 56px)',
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    sectionHeader: {
        marginBottom: 16,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    newPasswordInputField: {
        marginTop: theme.spacing(5.5),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3),
        },
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        maxWidth: 600,
        paddingBottom: 0,
    },
    passwordCriteria: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    divider: {
        marginTop: theme.spacing(6),
        marginLeft: -theme.spacing(3),
        marginRight: -theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    mobileSubmitButtonContainer: {
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
    const [showcurrentPassword, setShowcurrentPassword] = useState<boolean>(false);
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

    const getPasswordCriteriaIcon = (error: boolean): JSX.Element => (
        <Done
            style={{
                fontSize: 16,
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
    }, [currentPassword, setCurrentPasswordError]);

    const onCurrentPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setCurrentPassword(event.target.value);
            if (currentPasswordError) {
                validateCurrentPassword();
            } else {
                setCurrentPasswordError(null);
            }
        },
        [setCurrentPassword, currentPasswordError, validateCurrentPassword, setCurrentPasswordError]
    );

    const validateNewPassword = useCallback((): void => {
        const tempNewPassword = newPassword;
        let tempNewPasswordError = '';
        if (!tempNewPassword.trim() || Object.values(passwordErrors).includes(false)) {
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
        setPasswordErrors({
            minLengthRequired: newPassword.length >= 8,
            atLeast1UpperCharRequired: upperCharRegex.test(newPassword),
            atLeast1LowerCharRequired: lowerCharRegex.test(newPassword),
            atLeast1NumberRequired: numberRegex.test(newPassword),
            atLeast1SplCharRequired: splCharRegex.test(newPassword),
        });
    }, [newPassword]);

    const onNewPasswordChange: OnChangeHandler = useCallback(
        (event) => {
            setNewPassword(event.target.value);
            validatePasswordCriteria();
        },
        [setNewPassword, validatePasswordCriteria]
    );

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
                backgroundColor: '#E5E5E5',
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
                    <div className={classes.block}>
                        <Typography variant={'h6'} className={classes.sectionHeader}>
                            Change Password
                        </Typography>
                        <Typography variant={'body1'}>
                            Password must be at least 8 characters long, contain at least one uppercase character, one
                            lowercase character, one number, and one special character.
                        </Typography>

                        <Divider className={clsx(classes.divider, classes.topDivider)} />
                        <form>
                            <TextField
                                id={'currentPassword'}
                                label={'Old Password'}
                                type={showcurrentPassword ? 'text' : 'password'}
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
                                                style={{ height: 36, width: 36 }}
                                                onClick={(): void => setShowcurrentPassword(!showcurrentPassword)}
                                            >
                                                {showcurrentPassword && <Visibility />}
                                                {!showcurrentPassword && <VisibilityOff />}
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
                                                style={{ height: 36, width: 36 }}
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
                                    <Typography variant={'caption'}>At least 8 characters in length</Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1NumberRequired)}
                                    <Typography variant={'caption'}>At least 1 digit</Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1UpperCharRequired)}
                                    <Typography variant={'caption'}>At least 1 uppercase letter</Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1LowerCharRequired)}
                                    <Typography variant={'caption'}>At least 1 lowercase letter</Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.passwordCriteria}>
                                    {getPasswordCriteriaIcon(passwordErrors.atLeast1SplCharRequired)}
                                    <Typography variant={'caption'}>
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
                                onBlur={validateConfirmPassword}
                                required
                                fullWidth
                                variant={'filled'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <IconButton
                                                style={{ height: 36, width: 36 }}
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
                        <Spacer />
                        <Divider className={clsx(classes.divider, classes.bottomDivider)} />
                        <div className={classes.submitButtonContainer}>
                            <Button color={'primary'} style={{ width: 100 }} variant="outlined">
                                Cancel
                            </Button>
                            <Spacer />
                            <Button
                                color={'primary'}
                                style={{ width: 100 }}
                                variant="contained"
                                disabled={!submitEnabled()}
                            >
                                Submit
                            </Button>
                        </div>
                        <div className={classes.mobileSubmitButtonContainer}>
                            <Button
                                color={'primary'}
                                style={{ width: '100%' }}
                                variant="contained"
                                disabled={!submitEnabled()}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
