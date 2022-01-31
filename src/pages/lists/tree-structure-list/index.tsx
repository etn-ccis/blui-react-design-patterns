import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { TreeItem, TreeItemComponent } from './tree-item-component';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    toolbarTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolBarSubtitle: {
        marginTop: -theme.spacing(1),
    },
    contentContainer: {
        maxWidth: 768,
        padding: theme.spacing(3),
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: 0,
            margin: 0,
        },
    },
}));

const treeItems: TreeItem[] = [
    {
        id: 0,
        depth: 0,
        title: 'The Best Design Team',
        children: [
            {
                id: 1,
                depth: 1,
                title: 'Studio Blue',
            },
        ],
    },
    {
        id: 2,
        depth: 0,
        title: 'The Best UX Team',
        children: [
            {
                id: 3,
                depth: 1,
                title: 'Design Thinking',
            },
            {
                id: 4,
                depth: 1,
                title: 'User Interface',
                children: [
                    {
                        id: 5,
                        depth: 2,
                        title: 'Design System',
                    },
                    {
                        id: 6,
                        depth: 2,
                        title: 'Component Library',
                    },
                ],
            },
        ],
    },
];

export const TreeStructureList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const renderTreeList = useCallback(
        (): JSX.Element => (
            <>
                {treeItems.map((item) => (
                    <TreeItemComponent
                        key={item.id}
                        id={item.id}
                        depth={item.depth}
                        title={item.title}
                        childItems={item.children}
                        selected={selectedItem === item.id}
                        selectedItemId={selectedItem}
                        setSelectedItem={(id): void => {
                            setSelectedItem(id);
                        }}
                    />
                ))}
            </>
        ),
        [selectedItem, isMobile]
    );

    return (
        <div className={classes.container}>
            <AppBar data-cy={'blui-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <div className={classes.toolbarTextContainer}>
                        <Typography variant={'h6'} color={'inherit'}>
                            Tree Structure
                        </Typography>
                        <Typography classes={{ root: classes.toolBarSubtitle }} variant={'body1'} color={'inherit'}>
                            Folder Structure
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.contentContainer}>
                <Card style={{ borderRadius: isMobile ? 0 : 4 }}>{renderTreeList()}</Card>
            </div>
        </div>
    );
};
