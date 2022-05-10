import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { EmptyState, InfoListItem, Spacer } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// @TODO: MUI v5 - Update the warning icon to use WarningAmber instead of Warning
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

type Item = {
    id: number;
    name: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minHeight: '100vh',
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
        maxWidth: 800,
        padding: theme.spacing(3),
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
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
    card: {
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
            boxShadow: 'none',
            borderRadius: 0,
        },
    },
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    rightComponentChevron: {
        color: theme.palette.text.secondary,
    },
    emptyStateContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100vh - ${theme.spacing(8)})`,
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
    },
}));

const itemList: Item[] = [
    {
        id: 1,
        name: 'Item 01',
    },
    {
        id: 2,
        name: 'Item 02',
    },
    {
        id: 3,
        name: 'Item 03',
    },
];

const createItem = (index: number): Item => ({
    id: index,
    name: index < 10 ? `Item 0${index}` : `Item ${index}`,
});

export const ActionListButtonPanel = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const [list, setList] = useState(itemList);
    const [open, setOpen] = React.useState(false);

    const removeAll = useCallback((): void => {
        setList([]);
    }, [setList]);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (shouldRemoveAll?: boolean): void => {
        setOpen(false);

        if (shouldRemoveAll) {
            removeAll();
        }
    };

    const onAddItem = useCallback((): void => {
        setList([...list, createItem(list.length + 1)]);
    }, [list, setList]);

    const onRemoveAll = useCallback((): void => {
        handleClickOpen();
    }, []);

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
                            Global Action List
                        </Typography>
                        <Typography classes={{ root: classes.toolBarSubtitle }} variant={'body1'} color={'inherit'}>
                            In Button Panel
                        </Typography>
                    </div>
                    <Spacer />
                    {isMobile && (
                        <div style={{ display: 'flex' }}>
                            {list.length > 0 && (
                                <IconButton
                                    id={'remove-all-button'}
                                    data-cy={'toolbar-delete'}
                                    color={'inherit'}
                                    aria-label={'Delete'}
                                    onClick={onRemoveAll}
                                    size="large"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <IconButton
                                id={'add-item-button'}
                                data-cy={'toolbar-add'}
                                color={'inherit'}
                                aria-label={'add'}
                                edge={'end'}
                                onClick={onAddItem}
                                size="large"
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {list.length ? (
                <div className={classes.contentContainer}>
                    {!isMobile && (
                        <div className={classes.buttonRow}>
                            <Button
                                data-cy="desktop-add"
                                data-testid="addItemButton"
                                variant={'contained'}
                                color={'primary'}
                                style={{ margin: theme.spacing(), marginLeft: 0 }}
                                onClick={onAddItem}
                                startIcon={<AddIcon />}
                            >
                                Add an Item
                            </Button>
                            <Spacer />
                            <Button
                                data-cy="desktop-delete"
                                data-testid="deleteButton"
                                variant={'outlined'}
                                style={{
                                    margin: theme.spacing(),
                                    marginRight: 0,
                                    color: theme.palette.error.main,
                                    borderColor: theme.palette.error.main,
                                }}
                                onClick={onRemoveAll}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                    <Card classes={{ root: classes.card }}>
                        <CardContent classes={{ root: classes.cardContent }}>
                            {list.map(
                                (item, i): JSX.Element => (
                                    <InfoListItem
                                        key={i}
                                        data-testid="infoListItem"
                                        classes={{
                                            rightComponent: classes.rightComponentChevron,
                                        }}
                                        hidePadding
                                        ripple
                                        title={item.name}
                                        divider={list.length - 1 !== i || isMobile ? 'full' : undefined}
                                        chevron
                                    />
                                )
                            )}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className={classes.emptyStateContainer}>
                    <EmptyState
                        style={{ maxWidth: 365 }}
                        icon={<WarningAmberIcon style={{ fontSize: 'inherit' }} />}
                        title={'No Items Found'}
                        description={'No items added to a list. You can add an item and create a list of items.'}
                        actions={
                            <Button
                                data-cy="empty-state-add"
                                variant={'contained'}
                                color={'primary'}
                                style={{ margin: theme.spacing() }}
                                onClick={onAddItem}
                                startIcon={<AddIcon />}
                            >
                                Add an Item
                            </Button>
                        }
                    />
                </div>
            )}
            <Dialog open={open} onClose={(): void => handleClose()}>
                <DialogTitle>{'Delete all items?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>This cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Button
                        data-testid="dialogDeleteButton"
                        onClick={(): void => handleClose(true)}
                        style={{ color: theme.palette.error.main }}
                    >
                        Delete & Erase All Data
                    </Button>
                    <Button onClick={(): void => handleClose()} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
