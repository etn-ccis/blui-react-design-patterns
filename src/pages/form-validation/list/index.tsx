import React from 'react';
import { AppBar, Card, Hidden, IconButton, Switch, TextField, Toolbar, Typography } from '@material-ui/core';
import { Dns, Menu, Timeline } from '@material-ui/icons';
import List from '@material-ui/core/List';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) => ({
    containerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flex: '1 1 0',
    },
    container: {
        maxWidth: 600,
        margin: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            borderRadius: 0,
            boxShadow: 'none',
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
    },
    textFieldRoot: {
        [theme.breakpoints.down('xs')]: {
            width: 138,
        },
    },
    skinnyInput: {
        paddingTop: 11,
    },
}));

export const ListFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    return (
        <>
            <AppBar data-cy={'pxb-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp>
                        <IconButton
                            data-cy={'toolbar-menu'}
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
                <Card className={classes.container}>
                    <List disablePadding style={{ width: '100%' }}>
                        <InfoListItem
                            icon={<Dns />}
                            divider={'partial'}
                            title={'IP Address'}
                            rightComponent={
                                <TextField
                                    data-cy={'ip-address'}
                                    classes={{
                                        root: classes.textFieldRoot,
                                    }}
                                    defaultValue={'10.0.0.1'}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                    variant={'filled'}
                                />
                            }
                        ></InfoListItem>

                        <InfoListItem
                            icon={<Timeline />}
                            divider={'full'}
                            title={'Insight Report'}
                            subtitle={'Auto-report every 2 months'}
                            rightComponent={<Switch name={'demo-switch'} data-cy={'switch'} />}
                            data-cy={'switch'}
                        ></InfoListItem>
                    </List>
                </Card>
            </div>
        </>
    );
};
