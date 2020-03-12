// import Drawer from '@material-ui/core/Drawer';
import { Divider } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerLayout, DrawerNavGroup } from '@pxblue/react-components';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Main from './router/main';
import './style.css';
import EatonLogo from './assets/EatonLogo.svg';
import Hidden from '@material-ui/core/Hidden';

export const App: React.FC = () => {
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState('');

    const navigate = (id: string): void => {
        history.push(id);
        setSelected(id);
    };

    useEffect(() => {
        if (window.location.href.includes('action-list')) {
            setSelected('action-list');
        } else if (window.location.href.includes('app-bar')) {
            setSelected('app-bar');
        } else if (window.location.href.includes('empty-state')) {
            setSelected('empty-state');
        } else if (window.location.href.includes('form-validation-class')) {
            setSelected('form-validation-class');
        }
    }, []);

    const navItems = [
        {
            title: 'Action List',
            onClick: (): void => {
                navigate('action-list');
            },
            icon: <MoveToInboxIcon />,
            active: selected === 'action-list',
        },
        {
            title: 'App Bar',
            onClick: (): void => {
                navigate('app-bar');
            },
            icon: <MoveToInboxIcon />,
            active: selected === 'app-bar',
        },
        {
            title: 'Empty State',
            onClick: (): void => {
                navigate('empty-state');
            },
            icon: <MoveToInboxIcon />,
            active: selected === 'empty-state',
        },
        {
            title: 'Form Validation',
            onClick: (): void => {
                navigate('form-validation-class');
            },
            icon: <MoveToInboxIcon />,
            active: selected === 'form-validation-class',
        },
    ];

    const drawer = (
        <Drawer open={open}>
            <DrawerHeader
                icon={<Menu />}
                title={'PX Blue Design Patterns'}
                subtitle={'Common situations, copy paste that code'}
                onIconClick={(): void => {
                    setOpen(!open);
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems} title={'Design Patterns'} />
            </DrawerBody>
            <DrawerFooter>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={EatonLogo} style={{ margin: '10px' }} alt="Eaton Logo" height={50} width={'auto'} />
                </div>
            </DrawerFooter>
        </Drawer>
    );

    return (
        <DrawerLayout drawer={drawer}>
            <div style={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
                <div
                    style={{
                        flex: '4',
                        padding: '16px',
                        height: '100vh',
                        overflowY: 'scroll',
                        boxSizing: 'border-box',
                    }}
                >
                    <Main />
                </div>
                <Hidden smDown>
                    <div
                        style={{
                            flex: '1',
                            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                            padding: '16px',
                            minWidth: '200px',
                        }}
                    >
                        {selected === 'action-list' ? 'Some info about action list...' : ''}
                        {selected === 'app-bar' ? 'Some info about app bar...' : ''}
                        {selected === 'empty-state'
                            ? 'The EmptyState component is an element that can be used as a placeholder when no data is present (such as an empty list, or a placeholder page for future content). This is only used when no data is available, rather than during loading.'
                            : ''}
                        {selected === 'form-validation-class' ? 'Some info about form validation...' : ''}
                    </div>
                </Hidden>
            </div>
        </DrawerLayout>
    );
};
