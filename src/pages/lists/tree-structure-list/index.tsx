import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { TreeItem, TreeItemComponent } from './tree-item-component';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minHeight: '100vh',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    toolbarTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolBarSubtitle: {
        marginTop: theme.spacing(-1),
    },
    contentContainer: {
        maxWidth: 768,
        padding: theme.spacing(3),
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
                    {md ? null : (
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
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
