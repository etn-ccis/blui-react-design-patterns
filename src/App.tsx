import { Divider, IconButton, makeStyles, useMediaQuery, useTheme, Theme, Typography } from '@material-ui/core';
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
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Main } from './router/main';
import './style.css';
import { PAGES, RouteMetaData, Routes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers';
import { TOGGLE_DRAWER } from './redux/actions';
import { DRAWER_WIDTH } from './assets/constants';

const backgroundImage = require('./assets/topology_40.png').default;
const linearGradientOverlayImage = `linear-gradient(to right, rgba(0, 123, 193, 1) 22.4%, rgba(0, 123, 193, 0.2) 100%), url(${backgroundImage})`;

const useStyles = makeStyles((theme: Theme) => ({
    backgroundGradient: {
        backgroundImage: `${linearGradientOverlayImage}`,
    },
    closeIcon: {
        marginRight: `-${theme.spacing(2)}px`,
        marginTop: `-${theme.spacing(2)}px`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: `0 ${theme.spacing(2)}px`,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    headerDetails: {
        flex: 1,
    },
    subtitle: {
        marginTop: `-${theme.spacing(1)}px`,
    },
}));

export const App: React.FC = () => {
    const classes = useStyles();
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

    const createRoute = (page: RouteMetaData, itemKey: string): NavItem => {
        const subItems: NavItem[] = [];
        Object.keys(page).forEach((key: string): JSX.Element | null => {
            const subRoute = page[key as keyof RouteMetaData];
            if (typeof subRoute === 'object') {
                subItems.push(createRoute(subRoute, key));
            }
            return null;
        });
        return {
            title: page.title,
            itemID: page.route || itemKey,
            items: subItems.length > 0 ? subItems : undefined,
            onClick: page.route
                ? (): void => {
                      if (page.route) navigate(page.route); // this extra if shouldn't be necessary, but TS doesn't understand that it can't be undefined because of the ternary operator.
                      dispatch({ type: TOGGLE_DRAWER, payload: false });
                  }
                : undefined,
        };
    };

    Object.keys(PAGES).forEach((key: string) => navItems.push(createRoute(PAGES[key as keyof Routes], key)));

    const drawer = (
        <Drawer
            open={open}
            width={DRAWER_WIDTH}
            ModalProps={{
                onClose: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !open });
                },
            }}
            variant={isMobile ? 'temporary' : 'permanent'}
            activeItem={selected}
            activeItemBackgroundShape={'round'}
        >
            <DrawerHeader
                backgroundImage={backgroundImage}
                backgroundOpacity={0.5}
                classes={{ background: classes.backgroundGradient }}
                titleContent={
                    <div className={classes.header}>
                        <div
                            className={classes.headerDetails}
                            onClick={(): void => {
                                navigate('/');
                                dispatch({ type: TOGGLE_DRAWER, payload: false });
                            }}
                        >
                            <Typography variant="h6">PX Blue</Typography>
                            <Typography variant="body1" className={classes.subtitle}>
                                React Design Patterns
                            </Typography>
                        </div>
                        {isMobile && (
                            <IconButton
                                data-cy="toolbar-menu"
                                color={'inherit'}
                                edge={'end'}
                                classes={{ edgeEnd: classes.closeIcon }}
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: false });
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </div>
                }
                style={{ cursor: 'pointer' }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems} hidePadding />
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
                    <img
                        src={
                            'https://raw.githubusercontent.com/pxblue/react-design-patterns/master/src/assets/EatonLogo.svg'
                        }
                        style={{ margin: '10px' }}
                        alt={'Eaton Logo'}
                        height={50}
                        width={'auto'}
                    />
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
