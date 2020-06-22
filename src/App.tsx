import { Divider, useMediaQuery, useTheme, Typography } from '@material-ui/core';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerLayout,
    DrawerNavGroup,
    NavItem,
    Spacer,
} from '@pxblue/react-components';
import { OpenInNew } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Main } from './router/main';
import './style.css';
import EatonLogo from './assets/EatonLogo.svg';
import { PAGES, RouteMetaData, Routes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers';
import { TOGGLE_DRAWER } from './redux/actions';
import { DRAWER_WIDTH } from './assets/constants';

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
        Object.keys(page).forEach((key: string): JSX.Element | null => {
            const subRoute = page[key as keyof RouteMetaData];
            if (typeof subRoute === 'object') {
                subItems.push(createRoute(subRoute));
            }
            return null;
        });
        return {
            title: page.title,
            itemID: page.route || '',
            items: subItems.length > 0 ? subItems : undefined,
            onClick: page.route
                ? (): void => {
                      if (page.route) navigate(page.route); // this extra if shouldn't be necessary, but TS doesn't understand that it can't be undefined because of the ternary operator.
                      dispatch({ type: TOGGLE_DRAWER, payload: false });
                  }
                : undefined,
        };
    };

    Object.keys(PAGES).forEach((key: string) => navItems.push(createRoute(PAGES[key as keyof Routes])));

    const drawer = (
        <Drawer
            open={open}
            width={DRAWER_WIDTH}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !open });
                },
            }}
            variant={isMobile ? 'temporary' : 'permanent'}
        >
            <DrawerHeader
                title={'PX Blue'}
                subtitle={'React Design Patterns'}
                onClick={(): void => {
                    navigate('/');
                    dispatch({ type: TOGGLE_DRAWER, payload: false });
                }}
                style={{ cursor: 'pointer' }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems} hidePadding activeItem={selected} />
                <Spacer />
                <DrawerNavGroup
                    hidePadding
                    titleContent={<Typography variant={'overline'}>More Resources</Typography>}
                    items={[
                        {
                            title: 'PX Blue Components',
                            itemID: 'comp lib',
                            onClick: (): void => {
                                window.open('https://pxblue-components.github.io/react/', '_blank');
                            },
                            rightComponent: <OpenInNew />,
                        },
                        {
                            title: 'PX Blue React Guide',
                            itemID: 'react guide',
                            onClick: (): void => {
                                window.open('https://pxblue.github.io/development/frameworks-web/react', '_blank');
                            },
                            rightComponent: <OpenInNew />,
                            divider: false,
                        },
                    ]}
                />
            </DrawerBody>
            <DrawerFooter>
                <Divider />
                <div
                    style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={(): void => {
                        window.open('https://www.eaton.com', '_blank');
                    }}
                >
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
