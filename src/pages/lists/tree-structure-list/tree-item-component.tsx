import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Spacer } from '@brightlayer-ui/react-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClosedFolderIcon from '@material-ui/icons/Folder';
import OpenFolderIcon from '@material-ui/icons/FolderOpen';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import Color from 'color';

const useStyles = makeStyles((theme: Theme) => ({
    accordionRoot: {
        marginBottom: '0 !important',
        marginTop: '0 !important',
        padding: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
        '&::before': {
            display: 'none',
        },
    },
    firstAccordion: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        border: 'none',
    },
    nestedAccordionRoot: {
        boxShadow: 'none',
    },
    accordionSummaryRoot: {
        height: 56,
        '&.Mui-expanded': {
            minHeight: 56,
        },
        paddingLeft: 8,
    },
    accordionSummarySelected: {
        backgroundColor: Color(theme.palette.primary.main).fade(0.95).string(),
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
        color: theme.palette.text.secondary,
    },
    folderIconSelected: {
        color: theme.palette.primary.main,
    },
    accordionDetailsRoot: {
        padding: 0,
    },
}));

export type TreeItem = {
    title: string;
    id: number;
    depth?: number;
    selected?: boolean;
    opened?: boolean;
    children?: TreeItem[];
};

export type TreeItemProps = {
    id: number;
    title: string;
    depth?: number;
    selectedItemId?: number | null;
    selected?: boolean;
    childItems?: TreeItem[];
    setSelectedItem?: (id: number) => void;
};

export const TreeItemComponent = (props: TreeItemProps): JSX.Element => {
    const { id, depth = 0, title, selected, selectedItemId, childItems = [], setSelectedItem = (): void => {} } = props;
    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Accordion
            elevation={0}
            square={isMobile || depth > 0}
            classes={{
                root:
                    id === 0
                        ? clsx(classes.accordionRoot, classes.firstAccordion)
                        : depth > 0
                        ? clsx(classes.accordionRoot, classes.nestedAccordionRoot)
                        : classes.accordionRoot,
            }}
            onClick={(event): void => {
                event.stopPropagation();
                if (childItems && childItems.length > 0) {
                    event.preventDefault();
                    setIsExpanded(!isExpanded);
                }
            }}
            expanded={isExpanded}
        >
            <AccordionSummary
                className={selected ? classes.accordionSummarySelected : ''}
                classes={{ root: classes.accordionSummaryRoot }}
                expandIcon={
                    childItems && childItems.length > 0 ? (
                        <ExpandMoreIcon className={selected ? classes.expandIconSelected : ''} />
                    ) : undefined
                }
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Radio
                        checked={selected}
                        onClick={(event): void => {
                            event.stopPropagation();
                            setSelectedItem(id);
                        }}
                        color={'primary'}
                    />
                    <Spacer width={depth * 32} />
                    {!isExpanded && (
                        <ClosedFolderIcon
                            className={
                                selected ? clsx([classes.folderIcon, classes.folderIconSelected]) : classes.folderIcon
                            }
                        />
                    )}
                    {isExpanded && (
                        <OpenFolderIcon
                            className={
                                selected ? clsx([classes.folderIcon, classes.folderIconSelected]) : classes.folderIcon
                            }
                        />
                    )}
                    <Typography variant={'subtitle1'}>{title}</Typography>
                </div>
            </AccordionSummary>
            {childItems && childItems.length > 0 && (
                <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {childItems.map((item) => (
                            <TreeItemComponent
                                key={item.id}
                                id={item.id}
                                depth={item.depth}
                                title={item.title}
                                childItems={item.children}
                                selected={selectedItemId === item.id}
                                setSelectedItem={(updatedId: number): void => {
                                    setSelectedItem(updatedId);
                                }}
                                selectedItemId={selectedItemId}
                            />
                        ))}
                    </div>
                </AccordionDetails>
            )}
        </Accordion>
    );
};
