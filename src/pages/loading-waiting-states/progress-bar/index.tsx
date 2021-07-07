import React from 'react';
import {
    AppBar,
    Button,
    Card,
    Toolbar,
    Typography,
    Hidden,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, VerticalAlignTop } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@pxblue/colors';

const foldersList = [
    { label: 'The Best Dev Team', value: '1' },
    { label: 'The Best Design Team', value: '2' },
    { label: 'The Best UX Team', value: '3' },
    { label: 'The Best Management Team', value: '4' },
    { label: 'The Best Facility Team', value: '5' },
    { label: 'The The Proudest Team', value: '6' },
];

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: '16px 24px',
        maxWidth: 600,
        margin: '0 auto',
    },
    buttonContainer: {
        textAlign: 'right',
        paddingBottom: theme.spacing(2),
    },
    cardContentStyle: {
        padding: 0,
    },
    formControlStyle: {
        width: '100%',
    },
    radioLabel: {
        display: 'flex',
    },
    iconStyle: {
        fill: Colors.gray[500],
        margin: '0 16px 0 8px',
    },
    formLabel: {
        margin: 0,
        width: '100%',
        padding: theme.spacing(1),
        borderBottom: '1px solid #efe9e9',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
}));

export const ProgressBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
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
                        Progress Bars (Indeterminate)
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <div className={classes.buttonContainer}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<VerticalAlignTop />}
                    >
                        <Typography noWrap color={'inherit'}>
                            UPLOAD NEW FILE
                        </Typography>
                    </Button>
                </div>
                <Card>
                    <FormControl className={classes.formControlStyle} component="fieldset">
                        <RadioGroup aria-label="folder" name="folder" value='1'>
                            {foldersList.map((option, i) => (
                                <FormControlLabel className={classes.formLabel} key={i} value={option.value} control={<Radio />}
                                    label={
                                        <div className={classes.radioLabel}>
                                            <Folder className={classes.iconStyle}/>
                                            <Typography> {option.label} </Typography>
                                        </div>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Card>
            </div>
        </div>
    );
};
