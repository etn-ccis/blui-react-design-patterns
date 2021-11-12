import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../../redux/actions';
import * as colors from '@pxblue/colors';

type Item = {
    id: number;
    title: string;
    hasTag?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    actionList: {
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
    hoveredInfoListItem: {
        backgroundColor: theme.palette.background.default,
    },
    container: {
        maxWidth: 818,
        padding: theme.spacing(3),
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            padding: 0,
            margin: 0,
        },
    },
    card: {
        borderRadius: 4,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            boxShadow: 'none',
            borderRadius: 0,
        },
    },
    cardHeader: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    cardHeaderTitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    categoryName: {
        color: theme.palette.primary.main,
    },
    select: {
        backgroundColor: theme.palette.background.paper,
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
        },
        '&.MuiFilledInput-input': {
            padding: 0,
        },
    },
    selectedMenuItem: {
        minHeight: theme.spacing(6),
        '&.Mui-selected': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    dropDownIcon: {
        right: 0,
        color: theme.palette.text.primary,
    },
    dropDownControl: {
        minWidth: theme.spacing(11),
    },
    rightComponentChevron: {
        color: theme.palette.text.secondary,
    },
    menuProps: {
        width: 154,
        marginTop: theme.spacing(2),
    },
    iconButton: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

const itemList: Item[] = [
    {
        id: 1,
        title: 'High Humidity',
        hasTag: true,
    },
    {
        id: 2,
        title: 'Battery Service',
    },
    {
        id: 3,
        title: 'Bypass Over Frequency',
    },
];

const getTitle = (title: string): React.ReactNode => <Typography variant="subtitle1">{title}</Typography>;

export const ActionListInline = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [hoveredItem, setHoveredItem] = useState(0);
    // const [isOpen, setIsOpen] = useState(false);
    // const options: string[] = ['Delete', 'View Details'];

    return (
        <div className={classes.actionList}>
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
                            Local Item Actions
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card classes={{ root: classes.card }}>
                    <CardContent classes={{ root: classes.cardContent }}>
                        {itemList.map(
                            (item, i): JSX.Element => (
                                <InfoListItem
                                    key={i}
                                    data-testid="infoListItem"
                                    classes={{
                                        root: hoveredItem === item.id ? classes.hoveredInfoListItem : '',
                                        rightComponent: classes.rightComponentChevron,
                                    }}
                                    hidePadding
                                    ripple
                                    title={getTitle(item.title)}
                                    divider={itemList.length - 1 !== i || isMobile ? 'full' : undefined}
                                    rightComponent={
                                        !isMobile ? (
                                            hoveredItem === item.id ? (
                                                <div>
                                                    <Tooltip title={'Delete'}>
                                                        <IconButton classes={{ root: classes.iconButton }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Save'}>
                                                        <IconButton classes={{ root: classes.iconButton }}>
                                                            <BookmarkIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Archive'}>
                                                        <IconButton classes={{ root: classes.iconButton }}>
                                                            <ArchiveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : item.hasTag ? (
                                                <ListItemTag label={'active'} backgroundColor={colors.red[500]} />
                                            ) : undefined
                                        ) : (
                                            <MoreVertIcon />
                                        )
                                    }
                                    onMouseEnter={(): void => setHoveredItem(item.id)}
                                    onMouseLeave={(): void => setHoveredItem(0)}
                                />
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
