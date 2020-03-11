import { AppBar, Button, Toolbar, Typography, Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import { EmptyState } from '@pxblue/react-components';
import React, { useState } from 'react';
import DevicesIcon from '@material-ui/icons/Devices';
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import AlertIcon from '@material-ui/icons/NotificationImportant';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import * as PXBColors from '@pxblue/colors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function TabPanel(props: any): any {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const deviceConstants = [
    { id: 101 },
    { id: 201, performance: 'Poor', battery: '20%' },
    { id: 202, performance: 'Average', battery: '15%' },
    { id: 203, performance: 'Excellent', battery: '96%' },
];

const useStyles = makeStyles(() => ({
    deviceCard: {
        minWidth: '200px',
        width: '100%',
        height: '160px',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        padding: '0px',
        minHeight: '45px',
        paddingLeft: '16px',
        backgroundColor: PXBColors.blue[500],
        color: 'white',
    },
    main: {
        display: 'flex',
    },
    mainContent: {
        flex: '4',
        padding: '16px',
    },
    rightSideBar: {
        flex: '1',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '16px',
        minWidth: '200px',
    },
}));

// @ts-ignore
export const EmptyStatePage = (props): JSX.Element => {
    const [value, setValue] = useState(0);
    const classes = useStyles(props);

    const handleChange = (event: any, newValue: any): void => {
        setValue(newValue);
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainContent}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h6">Empty States</Typography>
                        </Toolbar>

                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Action" />
                            <Tab label="Text Only" />
                            <Tab label="Placeholder" />
                            <Tab label="Subcontent" />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                height: 'calc(100vh - 128px)',
                            }}
                        >
                            <EmptyState
                                //@ts-ignore
                                icon={<DevicesIcon style={{ fontSize: '100px', marginBottom: '15px' }} />}
                                title={'No Devices'}
                                actions={
                                    <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                                        <AddIcon style={{ marginRight: '5px' }} />
                                        Add Device
                                    </Button>
                                }
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                height: 'calc(100vh - 128px)',
                            }}
                        >
                            <EmptyState
                                icon={<AlertIcon style={{ fontSize: '100px', marginBottom: '15px' }} />}
                                title={'No Alarms Found'}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                height: 'calc(100vh - 128px)',
                            }}
                        >
                            <EmptyState
                                icon={<TrendingUpIcon style={{ fontSize: '100px', marginBottom: '15px' }} />}
                                title={'Predictions Page Coming Soon'}
                                description={'A fully redesigned predictions page is coming in our next release!'}
                                actions={
                                    <Button variant="outlined" size="small" color="primary" style={{ margin: '10px' }}>
                                        Learn More
                                    </Button>
                                }
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Grid container spacing={4}>
                            {deviceConstants.map((deviceOutput, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index.toString()}>
                                    <Card className={classes.deviceCard}>
                                        <CardHeader
                                            className={classes.cardHeader}
                                            title={
                                                <Typography variant="subtitle1" color="inherit">
                                                    Device {deviceOutput.id}
                                                </Typography>
                                            }
                                        />
                                        <CardContent style={{ flex: '1 1 0px', padding: '0px', height: 0 }}>
                                            {!deviceOutput.performance ? (
                                                <EmptyState
                                                    title="No Data"
                                                    icon={
                                                        <DevicesIcon
                                                            style={{ fontSize: '30px', margin: '10px 0 5px 0' }}
                                                        />
                                                    }
                                                />
                                            ) : (
                                                <List style={{ padding: '0px' }} dense={true}>
                                                    <ListItem>
                                                        <ListItemText primary={'Performance'} />
                                                        <ListItemText
                                                            style={{ textAlign: 'right' }}
                                                            primary={deviceOutput.performance}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText primary={'Battery Life'} />
                                                        <ListItemText
                                                            style={{ textAlign: 'right' }}
                                                            primary={deviceOutput.battery}
                                                        />
                                                    </ListItem>
                                                    <CardActions style={{ float: 'right' }}>
                                                        <Button size="small" color="primary">
                                                            Report
                                                        </Button>
                                                        <Button size="small" color="primary">
                                                            Learn More
                                                        </Button>
                                                    </CardActions>
                                                </List>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                </div>
            </div>
            <div className={classes.rightSideBar}>
                The EmptyState component is an element that can be used as a placeholder when no data is present (such
                as an empty list, or a placeholder page for future content). This is only used when no data is
                available, rather than during loading.
            </div>
        </div>
    );
};
