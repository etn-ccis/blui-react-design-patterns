import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar,
    Button,
    Card,
    Toolbar,
    Typography,
    Hidden,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    List,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, Publish, Description } from '@material-ui/icons';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';
import * as Colors from '@pxblue/colors';
type FolderItem = {
    id: string;
    name: string;
    progress: number;
    status: string;
};
const foldersList = [
    { label: 'The Best Dev Team', value: '1' },
    { label: 'The Best Design Team', value: '2' },
    { label: 'The Best UX Team', value: '3' },
    { label: 'The Best Management Team', value: '4' },
    { label: 'The Best Facility Team', value: '5' },
    { label: 'The Proudest Team', value: '6' },
];
const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }): JSX.Element => (
    <LinearProgress variant="determinate" {...props} />
);
const uploadFileList: FolderItem[] = [];

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        maxWidth: 600,
        margin: '0 auto',
    },
    uploadButtonContainer: {
        textAlign: 'right',
        paddingBottom: theme.spacing(2),
    },
    closeButtonContainer: {
        color: Colors.black[50],
        borderColor: Colors.black[50],
    },
    formControl: {
        width: '100%',
    },
    radioLabel: {
        display: 'flex',
    },
    icon: {
        fill: Colors.gray[500],
        margin: `0 ${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    },
    formLabel: {
        margin: 0,
        width: '100%',
        padding: theme.spacing(1),
        borderBottom: `1px solid ${Colors.gray[50]}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    placementOfList: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    infoList: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0,
        },
    },
    subTitle: {
        color: Colors.black[200],
    },
}));
const createFileItem = (): FolderItem => ({
    id: `${Math.random() * 100}`,
    name: 'PX Blue is Awesome.pdf',
    progress: 0,
    status: `Uploading (0%)`,
});

export const ProgressBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [list, setUploadFileList] = useState<FolderItem[]>(uploadFileList);

    const uploadFile = useCallback((): void => {
        setUploadFileList((oldList) => [...oldList, createFileItem()]);
    }, [list, setUploadFileList]);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            const newList = [...list];
            for (let i = 0; i < list.length; i++) {
                if (list[i].progress < 100) {
                    const newItem: FolderItem = {
                        ...list[i],
                        progress: list[i].progress + 1,
                        status: `Uploading (${list[i].progress + 1})`,
                    };
                    newList[i] = newItem;
                } else {
                    const newItem: FolderItem = {
                        ...list[i],
                        status: `Complete`,
                    };
                    newList[i] = newItem;
                    setTimeout(() => {
                        setUploadFileList((oldList) => oldList.filter((item) => item.id !== list[i].id));
                    }, 10000);
                }
            }
            setUploadFileList(newList);
        }, 100);
        if (list.length < 1) {
            clearInterval(progressInterval);
        }
        return (): void => {
            clearInterval(progressInterval);
        };
    }, [list]);

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
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
                    <Typography variant={'h6'} color={'inherit'}>
                        Progress Bars
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <div className={classes.uploadButtonContainer}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<Publish />}
                        onClick={uploadFile}
                    >
                        UPLOAD NEW FILE
                    </Button>
                </div>
                <Card>
                    <FormControl className={classes.formControl} component="fieldset">
                        <RadioGroup aria-label="folder" name="folder" value="1">
                            {foldersList.map((option, i) => (
                                <FormControlLabel
                                    className={classes.formLabel}
                                    key={i}
                                    value={option.value}
                                    control={<Radio />}
                                    label={
                                        <div className={classes.radioLabel}>
                                            <Folder className={classes.icon} />
                                            <Typography> {option.label} </Typography>
                                        </div>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Card>
                <List data-cy={'list-content'} disablePadding component="nav" className={classes.placementOfList}>
                    {list.map(
                        (item, i): JSX.Element => (
                            <div key={`itemKey${i}`} className={classes.infoList}>
                                <InfoListItem
                                    classes={{
                                        subtitle: classes.subTitle,
                                    }}
                                    key={i}
                                    hidePadding
                                    ripple
                                    backgroundColor={Colors.black[900]}
                                    fontColor={Colors.black[50]}
                                    color={Colors.black[50]}
                                    title={item.name}
                                    subtitle={item.status}
                                    icon={<Description />}
                                    iconAlign="left"
                                    iconColor={Colors.black[200]}
                                    rightComponent={
                                        <Button variant="outlined" className={classes.closeButtonContainer}>
                                            Cancel
                                        </Button>
                                    }
                                />
                                <LinearProgressWithLabel value={item.progress} key={`progress${i}`} />
                            </div>
                        )
                    )}
                </List>
            </div>
        </div>
    );
};
