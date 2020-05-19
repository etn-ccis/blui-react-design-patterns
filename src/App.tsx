import { Divider, useMediaQuery, useTheme } from '@material-ui/core';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerLayout,
    DrawerNavGroup,
    NavItem,
} from '@pxblue/react-components';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Main } from './router/main';
import './style.css';
import EatonLogo from './assets/EatonLogo.svg';
import { PAGES, RouteMetaData } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers';
import { TOGGLE_DRAWER } from './redux/actions';

export const App: React.FC = () => {
    const history = useHistory();
    const open = useSelector((state: AppState) => state.app.drawerOpen);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const [selected, setSelected] = useState('');

    const navigate = (id: string): void => {
        history.push(id);
        setSelected(id);
    };

    useEffect(() => {
        /*    if (window.location.href.includes('action-list')) {
            setSelected('action-list');
        } else if (window.location.href.includes('app-bar')) {
            setSelected('app-bar');
        } else if (window.location.href.includes('bottom-sheet')) {
            setSelected('bottom-sheet');
        } else if (window.location.href.includes('data-list')) {
            setSelected('data-list');
        } else if (window.location.href.includes('empty-state')) {
            setSelected('empty-state');
        } else if (window.location.href.includes('form-validation-class')) {
            setSelected('form-validation-class');
        } */
    }, []);

    const navItems: NavItem[] = [];

    const createRoute = (page: RouteMetaData): NavItem => {
        const subItems: NavItem[] = [];
        Object.keys(page).map((key: string) => {
            // @ts-ignore
            const subRoute = page[key];
            if (typeof subRoute === 'object') {
                subItems.push(createRoute(subRoute));
            }
        });
        return {
            title: page.title,
            itemID: page.route || page.title,
            items: subItems.length > 0 ? subItems : undefined,
            onClick: (): void => {
                if (page.route) {
                    navigate(page.route);
                }
            },
        };
    };

    // @ts-ignore
    Object.keys(PAGES).map((key) => navItems.push(createRoute(PAGES[key])));

    const drawer = (
        <Drawer
            open={open}
            width={270}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !open });
                },
            }}
            activeItemBackgroundColor={theme.palette.primary.light}
            itemFontColor={theme.palette.text.primary}
            variant={isMobile ? 'temporary' : 'permanent'}
        >
            <DrawerHeader title={'PX Blue'} subtitle={'React Design Patterns'} />
            <DrawerBody>
                <DrawerNavGroup items={navItems} hidePadding activeItem={selected} />
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
