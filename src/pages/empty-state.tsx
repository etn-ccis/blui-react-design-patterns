import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {EmptyState} from "@pxblue/react-components";
import React from 'react';
import DevicesIcon from '@material-ui/icons/Devices'
import AddIcon from '@material-ui/icons/AddCircleOutlined'

// @ts-ignore
export const EmptyStatePage = (): JSX.Element => (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
         <AppBar position="static" color="primary">
            <Toolbar>
               <Typography variant="h6">Empty States</Typography>
            </Toolbar>
            {/*
            <Tabs value={this.state.tabSelected} onChange={this.handleChange}>
               <Tab label={"Action"} component={TabNavLink} to={"/action"} />
               <Tab label={"Text Only"} component={TabNavLink} to={"/text-only"} />
               <Tab label={"Placeholder"} component={TabNavLink} to={"/placeholder"} />
               <Tab label={"Sub-Content"} component={TabNavLink} to={"/sub-content"} />
            </Tabs>
            */}
         </AppBar>

         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               padding: '20px',
               height: 'calc(100vh - 80px)'
            }}
         >
            <EmptyState
               //@ts-ignore
               icon={
                  <DevicesIcon style={{ fontSize: '100px', marginBottom: '15px' }} />
               }
               title={"No Devices"}
               actions={
                  <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                     <AddIcon style={{ marginRight: '5px' }} />
                     Add Device
                  </Button>
               }
            />
         </div>
      </div>
);
