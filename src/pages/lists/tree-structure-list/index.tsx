import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Spacer } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
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
        maxWidth: 800,
        padding: theme.spacing(3),
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: 0,
            margin: 0,
        },
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: -8,
        marginBottom: 16,
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
                    <Spacer />
                    {isMobile && (
                        <div style={{ display: 'flex' }}>
                            <IconButton
                                id={'add-item-button'}
                                data-cy={'toolbar-add'}
                                color={'inherit'}
                                aria-label={'add'}
                                edge={'end'}
                                onClick={(): void => {}}
                            >
                                <CreateNewFolderIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.contentContainer}>
                {!isMobile && (
                    <div className={classes.buttonRow}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            style={{ margin: theme.spacing(), marginLeft: 0 }}
                            onClick={(): void => {}}
                            startIcon={<CreateNewFolderIcon />}
                        >
                            New Folder
                        </Button>
                        <Spacer />
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            style={{
                                margin: theme.spacing(),
                                marginRight: 0,
                            }}
                            onClick={(): void => {}}
                            disabled={selectedItem === null}
                        >
                            Move File
                        </Button>
                    </div>
                )}
                <Card style={{ borderRadius: isMobile ? 0 : 4 }}>{renderTreeList()}</Card>
            </div>
            {isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Spacer />
                    <div
                        style={{
                            backgroundColor: theme.palette.background.paper,
                            display: 'flex',
                            borderTop: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            style={{
                                width: '100%',
                                margin: theme.spacing(2),
                            }}
                            onClick={(): void => {}}
                            disabled={selectedItem === null}
                        >
                            Move File
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
