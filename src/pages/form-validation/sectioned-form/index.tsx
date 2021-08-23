import React, { useCallback, useState } from 'react';
import {
    AppBar,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Hidden,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { ContactMail, HelpOutline, LocationOn, Menu } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Factory } from '@pxblue/icons-mui';

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
        minHeight: 'calc(100vh - 64px)',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 56px)',
        },
    },
    container: {
        maxWidth: 480,
        width: '100%',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
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
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    icon: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(4),
        },
    },
    formLine: {
        marginTop: theme.spacing(5),
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.spacing(5),
        },
    },
    selectLevelForm: {
        marginRight: theme.spacing(3),
        width: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    firstNameFormField: {
        width: '50%',
        height: 72,
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    lastNameFormField: {
        width: '50%',
        height: 72,
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: theme.spacing(5),
        },
    },
    submitButtonContainer: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    submitButton: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}));

export const SectionedFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [showRequiredError, setShowRequiredError] = useState(false);
    const MAX_CHARS_LIMIT = 50;
    const pxbProtection = 'PXB Protection';
    const pxbProtectionDescription = 'PXB Protection provides a three-year power expert warranty.';

    const characterLimitsHelperText = (
        <>
            <span>{!name && showRequiredError ? 'Required' : 'For example, Facility or Campus name'}</span>
            <span style={{ float: 'right' }}>{`${name.length}/${MAX_CHARS_LIMIT}`}</span>
        </>
    );

    const getRequiredHelperText = useCallback((value) => (showRequiredError && !value ? 'Required' : ''), [
        showRequiredError,
    ]);

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
                        In a List
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
                            style={{ width: '100%' }}
                            value={name}
                            label={'Name'}
                            variant="filled"
                            onChange={(e): void => setName(e.target.value)}
                            inputProps={{ maxLength: MAX_CHARS_LIMIT }}
                            helperText={characterLimitsHelperText}
                            error={showRequiredError && !name}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <FormControl className={classes.selectLevelForm}>
                            <InputLabel htmlFor="select-level">Level</InputLabel>
                            <Select
                                style={{ width: '100%' }}
                                labelId="select-level"
                                value={level}
                                variant={'filled'}
                                onChange={(e): void => setLevel(String(e.target.value))}
                                inputProps={{
                                    name: 'level',
                                    id: 'select-level',
                                }}
                            >
                                <MenuItem>Level I (Regional)</MenuItem>
                                <MenuItem>Level II (Regional)</MenuItem>
                                <MenuItem>Level III (Regional)</MenuItem>
                            </Select>
                        </FormControl>
                        <Hidden xsDown>
                            <FormControlLabel control={<Checkbox name="checkedC" />} label={pxbProtection} />
                            <Tooltip title={pxbProtectionDescription} arrow placement={'top'}>
                                <HelpOutline style={{ color: 'rgba(66, 78, 84, .3)' }} />
                            </Tooltip>
                        </Hidden>
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
                            style={{ width: '100%' }}
                            value={address}
                            label={'Address'}
                            variant="filled"
                            onChange={(e): void => setAddress(e.target.value)}
                            required={true}
                            error={showRequiredError && !address}
                            helperText={getRequiredHelperText(address)}
                            InputLabelProps={{ required: false }}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            style={{ width: '100%' }}
                            value={addressLine2}
                            label={'Address Line 2 (Optional)'}
                            variant="filled"
                            onChange={(e): void => setAddressLine2(e.target.value)}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <TextField
                            style={{ width: '100%' }}
                            value={city}
                            label={'City'}
                            variant="filled"
                            required={true}
                            error={showRequiredError && !city}
                            helperText={getRequiredHelperText(city)}
                            onChange={(e): void => setCity(e.target.value)}
                        />
                    </div>
                    <div className={classes.formLine}>
                        <FormControl>
                            <InputLabel id="select-state">State</InputLabel>
                            <Select
                                labelId="select-state"
                                value={state}
                                variant={'filled'}
                                style={{ marginRight: theme.spacing(3) }}
                                onChange={(e): void => setState(String(e.target.value))}
                            >
                                <MenuItem>CA</MenuItem>
                                <MenuItem>MI</MenuItem>
                                <MenuItem>GA</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            value={zip}
                            label={'Zip'}
                            variant="filled"
                            onChange={(e): void => setZip(e.target.value)}
                        />

                        <FormControl>
                            <InputLabel id="select-country">Country</InputLabel>
                            <Select
                                labelId="select-country"
                                value={'United States'}
                                variant={'filled'}
                                disabled={true}
                            />
                        </FormControl>
                    </div>

                    <Divider className={classes.divider} />

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(3) }}>
                        <ContactMail className={classes.icon} />
                        <Typography variant={'h6'}>Key Contact</Typography>
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            className={classes.firstNameFormField}
                            value={firstName}
                            label={'First Name'}
                            variant="filled"
                            onChange={(e): void => setFirstName(e.target.value)}
                            error={showRequiredError && !firstName}
                            helperText={getRequiredHelperText(firstName)}
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            className={classes.lastNameFormField}
                            value={lastName}
                            label={'Last Name (Optional)'}
                            variant="filled"
                            onChange={(e): void => setLastName(e.target.value)}
                        />
                    </div>

                    <div className={classes.formLine}>
                        <TextField
                            style={{ width: '100%' }}
                            value={email}
                            label={'Email'}
                            variant="filled"
                            onChange={(e): void => setEmail(e.target.value)}
                            required={true}
                            InputLabelProps={{ required: false }}
                            error={showRequiredError && !email}
                            helperText={getRequiredHelperText(email)}
                        />
                    </div>

                    <div className={classes.submitButtonContainer}>
                        <Button
                            className={classes.submitButton}
                            color={'primary'}
                            variant={'contained'}
                            onClick={(): void => setShowRequiredError(true)}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
