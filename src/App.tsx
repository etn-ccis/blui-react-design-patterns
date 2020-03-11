// import Drawer from '@material-ui/core/Drawer';
import { Divider } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerLayout, DrawerNavGroup } from '@pxblue/react-components';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Main from './router/main';
import './style.css';

const EatonLogo = require('./assets/EatonLogo.svg');

export const App: React.FC = () => {
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState('');

    const navigate = (id: string): void => {
        history.push(id);
        setSelected(id);
    };

    const navItems = [
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
            title: 'Form Validation Fn',
            onClick: (): void => {
                navigate('form-validation');
            },
            icon: <MoveToInboxIcon />,
            active: selected === 'form-validation',
        },
        {
            title: 'Form Validation Class',
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
            <Main />
        </DrawerLayout>
    );
};
