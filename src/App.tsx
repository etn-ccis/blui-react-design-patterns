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
import {PAGES, RouteMetaData, Routes} from './router/routes';
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
        const pathname = window.location.pathname;
        if (pathname) {
            setSelected(pathname.replace('/', ''));
        }
    }, []);

    const navItems: NavItem[] = [];

    const createRoute = (page: RouteMetaData): NavItem => {
        const subItems: NavItem[] = [];
        Object.keys(page).map((key: string) => {
            const subRoute = page[key as keyof RouteMetaData];
            if (typeof subRoute === 'object') {
                subItems.push(createRoute(subRoute));
            }
        });
        return {
            title: page.title,
            itemID: page.route || page.title,
            items: subItems.length > 0 ? subItems : undefined,
            onClick: page.route ? (): void => {
                if (page.route) navigate(page.route); // this extra if shouldn't be necessary, but TS doesn't understand that it can't be undefined because of the ternary operator.
            } : undefined,
        };
    };

    Object.keys(PAGES).forEach((key: string) => navItems.push(createRoute(PAGES[key as keyof Routes])));

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
