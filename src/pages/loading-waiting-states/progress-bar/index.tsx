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
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, VerticalAlignTop, Description } from '@material-ui/icons';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';
import * as Colors from '@pxblue/colors';
type FolderItem = {
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
    { label: 'The The Proudest Team', value: '6' },
];
const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }): JSX.Element => (
    <LinearProgress variant="determinate" {...props} />
);
const uploadFileList: FolderItem[] = [];

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
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
    cardContentStyle: {
        padding: 0,
    },
    formControlStyle: {
        width: '100%',
    },
    radioLabel: {
        display: 'flex',
    },
    iconStyle: {
        fill: Colors.gray[500],
        margin: `0 ${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    },
    formLabel: {
        margin: 0,
        width: '100%',
        padding: theme.spacing(1),
        borderBottom: '1px solid #efe9e9',
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
    infoListItemStyle: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0,
        },
    },
}));

const uploadFileItem = (): FolderItem => ({
    name: 'PX Blue is Awesome.pdf',
    progress: 0,
    status: `Uploading (0%)`,
});

export const ProgressBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const [list, setUploadFileList] = useState<FolderItem[]>(uploadFileList);
    const [progress, setProgress] = useState([0]);

    const uploadFile = useCallback((): void => {
        setUploadFileList([...list, uploadFileItem()]);
    }, [list, setUploadFileList]);

    useEffect(() => {
        for (let i = 0; i <= list.length; i++) {
            setInterval(() => {
                if (list[i]) {
                    if (list[i].progress < 100) {
                        list[i].progress += 1;
                        list[i].status = `Uploading (${list[i].progress}%)`;
                        setProgress([...progress, list[i].progress]);
                    } else {
                        list[i].status = 'Complete';
                        setProgress([...progress, list[i].progress]);
                    }
                }
            }, 100);
        }
    }, [list, setUploadFileList]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                        startIcon={<VerticalAlignTop />}
                        onClick={uploadFile}
                    >
                        <Typography noWrap color={'inherit'}>
                            UPLOAD NEW FILE
                        </Typography>
                    </Button>
                </div>
                <Card>
                    <FormControl className={classes.formControlStyle} component="fieldset">
                        <RadioGroup aria-label="folder" name="folder" value="1">
                            {foldersList.map((option, i) => (
                                <FormControlLabel
                                    className={classes.formLabel}
                                    key={i}
                                    value={option.value}
                                    control={<Radio />}
                                    label={
                                        <div className={classes.radioLabel}>
                                            <Folder className={classes.iconStyle} />
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
                            <div key={`itemKey${i}`} className={classes.infoListItemStyle}>
                            <InfoListItem
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
                                rightComponent={<Button variant="outlined" className={classes.closeButtonContainer}>Cancel</Button>}
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
