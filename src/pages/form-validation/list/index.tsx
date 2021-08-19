import React, { useCallback, useState } from 'react';
import {
    AppBar,
    Card,
    Hidden,
    IconButton,
    InputProps,
    Switch,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { Dns, Menu, Report } from '@material-ui/icons';
import List from '@material-ui/core/List';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';

type OnChangeHandler = InputProps['onChange'];

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 686,
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(4),
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            minHeight: 'calc(100vh - 56px)',
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    skinnyInput: {
        paddingTop: 11,
    },
}));

export const ListFormValidation = (): JSX.Element => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const [ip, setIp] = useState('10.0.0.1');
    const dispatch = useDispatch();

    const onIpChange: OnChangeHandler = useCallback(
        (event) => {
            setIp(event.target.value);
        },
        []
    );

    return (
        <div
            style={{
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
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        In a List
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.containerWrapper}>
                <Card className={classes.container} elevation={4}>
                    <List disablePadding style={{ width: '100%' }}>
                        <InfoListItem
                            icon={<Dns />}
                            divider={'partial'}
                            title={'IP Address'}
                            rightComponent={
                                <TextField
                                    id="filled-basic"
                                    value={ip}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                    onChange={onIpChange}
                                    variant="filled"
                                />
                            }
                        ></InfoListItem>

                        <InfoListItem
                            icon={<Report />}
                            title={'Insight Report'}
                            subtitle={'Auto-report every 2 months'}
                            rightComponent={<Switch name="demo-switch" />}
                        ></InfoListItem>
                    </List>
                </Card>
            </div>
        </div>
    );
};
