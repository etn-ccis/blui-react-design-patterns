import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ComputerIcon from '@material-ui/icons/Computer';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Hidden, useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { EmptyState, InfoListItem, ChannelValue } from '@pxblue/react-components';
import { presidentsList } from './list';

export const DataList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const getEmptyComponent = (): JSX.Element => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                height: 'calc(100vh - 128px)',
            }}
        >
            <EmptyState icon={<ComputerIcon style={{ fontSize: '100px' }} />} title={'No Items Found'} />
        </div>
    );

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position={'sticky'}>
                <Toolbar>
                    <Hidden mdUp={true}>
                        <IconButton
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
                        Data List
                    </Typography>
                </Toolbar>
            </AppBar>
            {presidentsList.length < 1 && getEmptyComponent()}
            <List disablePadding component={'nav'}>
                {presidentsList.map((president) => (
                    <InfoListItem
                        hidePadding
                        key={president.lastName}
                        title={`${president.firstName} ${president.lastName}`}
                        rightComponent={<ChannelValue value={president.year}></ChannelValue>}
                    ></InfoListItem>
                ))}
            </List>
        </div>
    );
};
