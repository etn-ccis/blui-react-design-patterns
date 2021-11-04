import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { EmptyState, InfoListItem, Spacer } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
// @TODO: MUI v5 - Update the warning icon to use WarningAmber instead of Warning
import WarningIcon from '@material-ui/icons/Warning';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

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
    card: {
        borderRadius: 4,
        [theme.breakpoints.down('sm')]: {
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
        height: `calc(100vh - ${theme.spacing(8)}px)`,
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [list, setList] = useState(itemList);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const removeAll = useCallback((): void => {
        setList([]);
    }, [setList]);

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
            <AppBar data-cy={'pxb-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                        icon={<WarningIcon style={{ fontSize: 'inherit' }} />}
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
                    <Button onClick={(): void => handleClose(true)} style={{ color: theme.palette.error.main }}>
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
