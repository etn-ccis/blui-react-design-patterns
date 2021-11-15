import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    rightComponentChevron: {
        color: theme.palette.text.secondary,
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
    const [list, setList] = useState(itemList);
    const [hoveredItem, setHoveredItem] = useState(0);
    const [menuPosition, setMenuPosition] = useState<null | HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const options: string[] = ['Delete', 'Save', 'Archive'];

    const onMenuClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number): void => {
            setMenuPosition(event.currentTarget);
            setActiveIndex(i);
        },
        [setMenuPosition, setActiveIndex]
    );

    const onMenuClose = useCallback((): void => {
        setMenuPosition(null);
        setActiveIndex(-1);
    }, [setMenuPosition, setActiveIndex]);

    const onDeleteItem = useCallback(
        (option: string, i: number): void => {
            if (option === 'Delete') {
                const tempList = list;
                tempList.splice(i, 1);
                setList(tempList);
            }
            onMenuClose();
        },
        [list, onMenuClose]
    );

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
                        {list.map(
                            (item, i): JSX.Element => (
                                <InfoListItem
                                    key={i}
                                    data-testid="infoListItem"
                                    classes={{
                                        root: hoveredItem === item.id && !isMobile ? classes.hoveredInfoListItem : '',
                                        rightComponent: classes.rightComponentChevron,
                                    }}
                                    hidePadding
                                    ripple
                                    title={getTitle(item.title)}
                                    divider={itemList.length - 1 !== i || isMobile ? 'full' : undefined}
                                    info={
                                        item.hasTag && isMobile
                                            ? [
                                                  <ListItemTag
                                                      key="active"
                                                      label={'active'}
                                                      backgroundColor={colors.red[500]}
                                                  />,
                                              ]
                                            : undefined
                                    }
                                    rightComponent={
                                        !isMobile ? (
                                            hoveredItem === item.id ? (
                                                <div>
                                                    <Tooltip title={'Delete'}>
                                                        <IconButton
                                                            classes={{
                                                                root: classes.iconButton,
                                                            }}
                                                            data-testid="deleteIcon"
                                                            onClick={(): void => onDeleteItem('Delete', i)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Save'}>
                                                        <IconButton
                                                            classes={{
                                                                root: classes.iconButton,
                                                            }}
                                                            data-testid="saveIcon"
                                                        >
                                                            <BookmarkIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Archive'}>
                                                        <IconButton
                                                            classes={{
                                                                root: classes.iconButton,
                                                            }}
                                                            data-testid="archiveIcon"
                                                        >
                                                            <ArchiveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : item.hasTag ? (
                                                <ListItemTag label={'active'} backgroundColor={colors.red[500]} />
                                            ) : undefined
                                        ) : (
                                            <>
                                                <IconButton
                                                    data-cy={'action-menu'}
                                                    onClick={(evt): void => onMenuClick(evt, i)}
                                                    edge={'end'}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id={'long-menu'}
                                                    anchorEl={menuPosition}
                                                    onClose={onMenuClose}
                                                    open={Boolean(menuPosition)}
                                                    PaperProps={{
                                                        style: {
                                                            width: 154,
                                                        },
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    getContentAnchorEl={null}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem
                                                            key={option}
                                                            onClick={(): void => onDeleteItem(option, activeIndex)}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </>
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
