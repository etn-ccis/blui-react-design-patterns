import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Spacer } from '@brightlayer-ui/react-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClosedFolderIcon from '@material-ui/icons/Folder';
import OpenFolderIcon from '@material-ui/icons/FolderOpen';
import { Accordion, AccordionDetails, AccordionSummary, Radio } from '@material-ui/core';

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
    accordionRoot: {
        marginBottom: '0 !important',
        marginTop: '0 !important',
    },
    accordionSummaryRoot: {
        height: 56,
    },
    accordionSummarySelected: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    expandIconSelected: {
        color: theme.palette.primary.main,
    },
    folderIcon: {
        width: 18,
        height: 18,
        marginLeft: 8,
        marginRight: 16,
    },
}));

export type TreeItem = {
    title: string;
    id: number;
    selected?: boolean;
    opened?: boolean;
    children?: TreeItem[];
};

const treeItems: TreeItem[] = [
    {
        id: 0,
        title: 'The Best Design Team',
        children: [
            {
                id: 1,
                title: 'Studio Blue',
            },
        ],
    },
    {
        id: 2,
        title: 'The Best UX Team',
        children: [
            {
                id: 3,
                title: 'Design Thinking',
            },
            {
                id: 4,
                title: 'User Interface',
                children: [
                    {
                        id: 5,
                        title: 'Design System',
                    },
                    {
                        id: 6,
                        title: 'Component Library',
                    },
                ],
            },
        ],
    },
];

// type TreeItemProps = {
//     title: string;
//     selected?: boolean;
//     open?: boolean;
//     children?: TreeItem[];
// }

// export const TreeItem = (props: TreeItemProps): JSX.Element => {
//     const {title, selected, open, children} = props;
//     const dispatch = useDispatch();
//     const theme = useTheme();
//     const classes = useStyles(theme);
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const [isExpanded, setIsExpanded] = useState(false);

//     return(
//                     <Accordion
//                         square={isMobile}
//                         classes={{ root: classes.accordionRoot }}
//                         onClick={(): void => {
//                             setIsExpanded(!isExpanded);
//                         }}
//                     >
//                         <AccordionSummary
//                             className={selectedItem === item.id ? classes.accordionSummarySelected : ''}
//                             classes={{ root: classes.accordionSummaryRoot }}
//                             expandIcon={
//                                 <ExpandMoreIcon
//                                     className={selectedItem === item.id ? classes.expandIconSelected : ''}
//                                 />
//                             }
//                         >
//                             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                                 <Radio
//                                     checked={selectedItem === item.id}
//                                     onClick={(event): void => {
//                                         event.stopPropagation();
//                                         setSelectedItem(item.id);
//                                     }}
//                                 />
//                                 {isExpanded ? (
//                                     <OpenFolderIcon className={classes.folderIcon} />
//                                 ) : (
//                                     <ClosedFolderIcon className={classes.folderIcon} />
//                                 )}
//                                 {/* {!isExpanded && <ClosedFolderIcon className={classes.folderIcon} />}
//                                 {isExpanded && <OpenFolderIcon className={classes.folderIcon} />} */}
//                                 <Typography variant={'subtitle1'}>{item.title}</Typography>
//                             </div>
//                         </AccordionSummary>
//                         {item && item.children && item?.children?.length > 0 && <AccordionDetails></AccordionDetails>}
//                     </Accordion>
//     );
// };

export const TreeStructureList = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedItem, setSelectedItem] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const renderTreeList = useCallback(
        (): JSX.Element => (
            <div>
                {treeItems.map((item) => (
                    <Accordion
                        key={item.id}
                        square={isMobile}
                        classes={{ root: classes.accordionRoot }}
                        onClick={(): void => {
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <AccordionSummary
                            className={selectedItem === item.id ? classes.accordionSummarySelected : ''}
                            classes={{ root: classes.accordionSummaryRoot }}
                            expandIcon={
                                <ExpandMoreIcon
                                    className={selectedItem === item.id ? classes.expandIconSelected : ''}
                                />
                            }
                        >
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Radio
                                    checked={selectedItem === item.id}
                                    onClick={(event): void => {
                                        event.stopPropagation();
                                        setSelectedItem(item.id);
                                    }}
                                />
                                {isExpanded ? (
                                    <OpenFolderIcon className={classes.folderIcon} />
                                ) : (
                                    <ClosedFolderIcon className={classes.folderIcon} />
                                )}
                                {/* {!isExpanded && <ClosedFolderIcon className={classes.folderIcon} />}
                                {isExpanded && <OpenFolderIcon className={classes.folderIcon} />} */}
                                <Typography variant={'subtitle1'}>{item.title}</Typography>
                            </div>
                        </AccordionSummary>
                        {item && item.children && item?.children?.length > 0 && <AccordionDetails></AccordionDetails>}
                    </Accordion>
                ))}
            </div>
        ),
        [selectedItem, isMobile, isExpanded]
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
                        >
                            Move File
                        </Button>
                    </div>
                )}
                {/* <Card classes={{ root: classes.card }}>
                    <CardContent classes={{ root: classes.cardContent }}> */}
                {renderTreeList()}
                {/* </CardContent>
                </Card> */}
            </div>
        </div>
    );
};
