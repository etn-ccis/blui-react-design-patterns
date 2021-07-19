import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardContent,
    Toolbar,
    Typography,
    Hidden,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    List,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, Description, Publish } from '@material-ui/icons';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@pxblue/colors';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
type FolderItem = {
    id: number;
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
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    uploadButtonContainer: {
        textAlign: 'right',
        paddingBottom: `${theme.spacing(2)}px`,
    },
    closeButtonContainer: {
        color: Colors.black[50],
        borderColor: Colors.black[50],
        [theme.breakpoints.up('sm')]: {
            width: '80px',
        },
    },
    formControl: {
        width: '100%',
    },
    radioLabel: {
        display: 'flex',
    },
    icon: {
        fill: Colors.black[200],
        marginLeft: `${theme.spacing(0.5)}px`,
    },
    iconContainer: {
        marginRight: `${theme.spacing(2)}px`,
        maxWidth: '40px',
        minWidth: '40px',
        width: '40px',
        marginTop: `${theme.spacing(1)}px`,
    },
    formLabel: {
        margin: 0,
        width: '100%',
        padding: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.divider}`,
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
        [theme.breakpoints.down('xs')]: {
            bottom: 0,
            right: 0,
            width: '100%',
        },
    },
    snackbarItem: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0,
        },
    },
    subTitle: {
        color: Colors.black[200],
    },
    snackbarRoot: {
        position: 'inherit',
        transform: 'none',
    },
    snackbarAction: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
        },
    },
    SnackbarContent: {
        borderRadius: 0,
        padding: `0 ${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    },
    messageContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    messageTextContainer: {
        marginRight: `${theme.spacing(3)}px`,
    },
    snackbarEnter: {
        opacity: 0,
    },
    snackbarEnterActive: {
        opacity: 1,
        transition: 'opacity 500ms ease-in',
    },
    snackbar: {
        opacity: 1,
    },
    snackbarActive: {
        opacity: 0,
        transition: 'opacity 500ms ease-in',
    },
}));
const createFileItem = (increment: number): FolderItem => ({
    id: increment,
    name: 'PX Blue is Awesome.pdf',
    progress: 0,
    status: `Uploading (0%)`,
});

let nextFileIndex = 0;

export const ProgressBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [fileUploadList, setFileUploadList] = useState<FolderItem[]>(uploadFileList);

    const [radioButtonvalue, setRadioButtonvalue] = useState('1');
    const changeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRadioButtonvalue((event.target as HTMLInputElement).value);
    };

    const uploadFile = useCallback((): void => {
        setFileUploadList((oldList) => [...oldList, createFileItem(nextFileIndex++)]);
    }, [fileUploadList, setFileUploadList]);

    const removeListItem = useCallback((id: number, status: string): void => {
        if (status === 'Complete') {
            return;
        }
        setFileUploadList((oldList) => oldList.filter((item) => item.id !== id));
    }, []);

    const handleRequestClose = useCallback((event: any, reason: string, id: number) => {
        if (reason === 'clickaway') {
            return;
        }
        setFileUploadList((oldList) => oldList.filter((item) => item.id !== id));
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            const newList = [...fileUploadList];
            for (let i = 0; i < fileUploadList.length; i++) {
                if (fileUploadList[i].progress < 100) {
                    const newPercent = Math.min(100, fileUploadList[i].progress + Math.ceil(Math.random() * 5));
                    const newItem: FolderItem = {
                        ...fileUploadList[i],
                        progress: newPercent,
                        status: `Uploading (${newPercent}%)`,
                    };
                    newList[i] = newItem;
                } else {
                    const newItem: FolderItem = {
                        ...fileUploadList[i],
                        status: `Complete`,
                    };
                    newList[i] = newItem;
                }
            }
            setFileUploadList(newList);
        }, 100);
        if (fileUploadList.length < 1) {
            clearInterval(progressInterval);
        }
        return (): void => {
            clearInterval(progressInterval);
        };
    }, [fileUploadList]);

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
                    <Button variant={'contained'} color={'primary'} startIcon={<Publish />} onClick={uploadFile}>
                        UPLOAD NEW FILE
                    </Button>
                </div>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <FormControl className={classes.formControl} component="fieldset">
                            <RadioGroup
                                aria-label="folder"
                                name="folder"
                                value={radioButtonvalue}
                                onChange={changeRadioGroup}
                            >
                                {foldersList.map((option, i) => (
                                    <FormControlLabel
                                        className={classes.formLabel}
                                        key={i}
                                        value={option.value}
                                        control={<Radio />}
                                        label={
                                            <div className={classes.radioLabel}>
                                                <Folder className={classes.icon} />
                                                <Typography style={{ marginLeft: '16px' }}> {option.label} </Typography>
                                            </div>
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
                <List data-cy={'list-content'} disablePadding component="nav" className={classes.placementOfList}>
                    <TransitionGroup>
                        {fileUploadList.map(
                            (item, i): JSX.Element => (
                                <CSSTransition
                                    key={`transitionKey${item.id}`}
                                    timeout={500}
                                    className={classes.snackbarItem}
                                    classNames={{
                                        enter: classes.snackbarEnter,
                                        enterActive: classes.snackbarEnterActive,
                                        exit: classes.snackbar,
                                        exitActive: classes.snackbarActive,
                                    }}
                                >
                                    <div key={`itemKey${item.id}`}>
                                        <Snackbar
                                            classes={{ root: classes.snackbarRoot }}
                                            open={true}
                                            autoHideDuration={item.progress === 100 ? 3000 : null}
                                            onClose={(e, reason): void => handleRequestClose(e, reason, item.id)}
                                        >
                                            <SnackbarContent
                                                classes={{
                                                    root: classes.SnackbarContent,
                                                    action: classes.snackbarAction,
                                                }}
                                                action={
                                                    <>
                                                        <Button
                                                            variant="outlined"
                                                            className={classes.closeButtonContainer}
                                                            onClick={(): void => removeListItem(item.id, item.status)}
                                                        >
                                                            {item.progress === 100 ? 'View' : 'Cancel'}
                                                        </Button>
                                                    </>
                                                }
                                                message={
                                                    <div className={classes.messageContainer}>
                                                        <div className={classes.iconContainer}>
                                                            <Description className={classes.icon} />
                                                        </div>
                                                        <div className={classes.messageTextContainer}>
                                                            <Typography variant={'subtitle1'} color={'inherit'}>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                variant={'subtitle2'}
                                                                className={classes.subTitle}
                                                            >
                                                                {item.status}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Snackbar>
                                        <LinearProgressWithLabel value={item.progress} key={`progress${i}`} />
                                    </div>
                                </CSSTransition>
                            )
                        )}
                    </TransitionGroup>
                </List>
            </div>
        </div>
    );
};
