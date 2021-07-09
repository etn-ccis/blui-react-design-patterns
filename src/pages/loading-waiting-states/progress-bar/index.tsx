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
    // Box,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, VerticalAlignTop, Description } from '@material-ui/icons';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import LinearProgressWithLabel, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@pxblue/react-components';
import * as Colors from '@pxblue/colors';
// import { Alarm } from '@material-ui/icons';
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
// export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }): JSX.Element => {
    // return (
        <LinearProgress variant="determinate" {...props} />
    // );
);
const uploadFileList: FolderItem[] = [];

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: '16px 24px',
        maxWidth: 600,
        margin: '0 auto',
    },
    buttonContainer: {
        textAlign: 'right',
        paddingBottom: theme.spacing(2),
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
        margin: '0 16px 0 8px',
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
    appbarRoot: {
        padding: 0,
    },
    toolbarGutters: {
        padding: '0 16px',
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

    // const uploadFile = useCallback((): void => {
    //     setUploadFileList([...list, uploadFileItem]);
    // }, [list, setUploadFileList]);

    const uploadFile = useCallback((): void => {
        setUploadFileList([...list, uploadFileItem()]);
        // for (let i = 0; i <= list.length; i++) {
        //     const interval = setInterval(() => {
        //         if (list[i]) {
        //             if (list[i].progress < 100) {
        //                 list[i].progress += 1;
        //                 list[i].status = `Uploading (${list[i].progress}%)`;
        //             } else {
        //                 // this.uploadFileList[i].status = 'Complete';
        //                 clearInterval(interval);
        //             }
        //         }
        //     }, 100);
        //     setTimeout(() => {
        //         list.splice(i, 1);
        //     }, 10000);
        // }
    }, [list, setUploadFileList]);
    
    useEffect(() => {
        // uploadFile();
        for (let i = 0; i <= list.length; i++) {
        setInterval(() => {
            // setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
            if (list[i]) {
                            if (list[i].progress < 100) {
                                list[i].progress += 1;
                                list[i].status = `Uploading (${list[i].progress}%)`;
                                // setProgress()
                                setProgress([
                                    ...progress,
                                    list[i].progress
                                  ]);
                                // setProgress([list[i].progress]);
                                // setProgress( progress1 => [...progress1, list[i].progress]);
                                // setProgress( (arr) => {
                                //     [...arr, list[i].progress]
                                // });

                            } else {
                                list[i].status = 'Complete';
                                setProgress([
                                    ...progress,
                                    list[i].progress
                                  ]);
                                // clearInterval(timer);
                                //   setTimeout(() => {
                                //       setProgress([
                                //           ...progress,
                                //           list[i].progress
                                //         ]);
                                //         list.splice(i, 1);
                                //   }, 3000);
                            }
                        }
          }, 100);
          setTimeout(() => {
            // setProgress([
            //               ...progress,
            //               list[i].progress
            //             ]);
            // list.splice(i, 1);
            // clearInterval(timer);
            
        }, 10000);
    }}, [list, setUploadFileList]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                <div className={classes.buttonContainer}>
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
                        <RadioGroup aria-label="folder" name="folder" value='1'>
                            {foldersList.map((option, i) => (
                                <FormControlLabel className={classes.formLabel} key={i} value={option.value} control={<Radio />}
                                    label={
                                        <div className={classes.radioLabel}>
                                            <Folder className={classes.iconStyle}/>
                                            <Typography> {option.label} </Typography>
                                        </div>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Card>
                <List data-cy={'list-content'} disablePadding component="nav" className={'list'}>
                {list.map(
                    (item, i): JSX.Element => (
                        <InfoListItem
                            key={i}
                            hidePadding
                            ripple
                            title={item.name}
                            subtitle={item.status}
                            icon={<Description />}
                            iconAlign='left'
                            iconColor={Colors.black[500]}
                            info={[
                                <LinearProgressWithLabel value={item.progress} key={`progress${i}`}/>
                            ]}
                            rightComponent={
                                <Button
                                    variant="outlined"
                                >
                                Cancel    
                                </Button>
                            }
                        />
                    )
                )}
            </List>
            </div>
        </div>
    );
};
