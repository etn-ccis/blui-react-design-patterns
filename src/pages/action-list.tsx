import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import './style.css';

const options = ['Delete', 'View Details'];

const ITEM_HEIGHT = 48;

export class ActionList extends React.Component {
    state: any;

    constructor(props: any) {
        super(props);
        const list = [];
        /*
        Here we manually create the elements in the list using createItem(). Using onAddItem() would lead to an error ("cannot call setState on an unmounted component"). In the constructor, the component has not yet finished mounting, so we are unable to modify the state via setState (it hasn't been initialized yet). The details of the setState call also include a re-render of the component, which cannot happen if the component has not finished initializing. So we have to directly instantiate the value of the list in the constructor. 
        */
        for (let i = 0; i < 10; i++) {
            list.push(this.createRandomItem());
        }
        this.state = {
            list: list,
            menuPosition: null,
            selectedIndex: null,
            activeMenu: null,
        };
    }

    onAddItem(): void {
        const tempList = this.state.list;
        tempList.push(this.createRandomItem());
        this.setState({ list: tempList });
    }
    createItem(index: number): any {
        return { id: index, name: `Item ${index}`, details: `Item ${index} occured` };
    }
    createRandomItem(): any {
        const int = parseInt(`${Math.random() * 100}`, 10);
        return this.createItem(int);
    }

    onMenuClick(event: any, i: number): void {
        this.setState({ menuPosition: event.currentTarget, activeMenu: i });
    }

    onMenuItemClick(option: any, i: number): void {
        if (option === 'Delete') {
            const tempList = this.state.list;
            tempList.splice(i, 1);
            this.setState({ list: tempList });
        }
        this.onMenuClose();
    }

    onMenuClose(): void {
        this.setState({ menuPosition: null, activeMenu: null });
    }

    onRemoveAll(): void {
        this.setState({ list: [] });
    }

    onSelected(item: any): void {
        this.setState({ selectedIndex: item });
    }

    isSelected(item: any): any {
        return this.state.selectedIndex === item;
    }

    getEmptyComponent(): any {
        return (
            <div style={{ paddingLeft: '10px' }}>
                <Typography variant="h4">No Items Found</Typography>
                <Button data-cy="add-item" variant="contained" onClick={(): void => this.onAddItem()}>
                    Add an Item
                </Button>
            </div>
        );
    }

    render(): any {
        const { menuPosition } = this.state;

        return (
            <div style={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
                <div style={{ flex: '4', padding: '16px', height: '100vh', overflowY: 'scroll' }}>
                    <AppBar position="static">
                        <Toolbar data-cy="pxb-toolbar">
                            <Typography variant="h6" color="inherit">
                                Action List
                            </Typography>
                            <div style={{ flex: '1 1 0px' }} />
                            <IconButton
                                data-cy="toolbar-delete"
                                color="inherit"
                                aria-label="Delete"
                                onClick={(): void => {
                                    this.onRemoveAll();
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                data-cy="toolbar-add"
                                color="inherit"
                                aria-label="add"
                                onClick={(): void => {
                                    this.onAddItem();
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {this.state.list.length < 1 && this.getEmptyComponent()}
                    <List className="list" data-cy="list-content" style={{ paddingTop: '0px' }} component="nav">
                        {this.state.list.map((item: any, i: number): any => (
                            <ListItem
                                key={`item_${i}`}
                                button
                                className={this.isSelected(i) ? 'selected' : ''}
                                onClick={(): any => this.onSelected(i)}
                            >
                                <ListItemText primary={item.name} secondary={item.details}></ListItemText>
                                <IconButton data-cy="action-menu" onClick={(evt: any): any => this.onMenuClick(evt, i)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Menu
                        id="long-menu"
                        anchorEl={menuPosition}
                        open={Boolean(menuPosition)}
                        onClose={this.onMenuClose.bind(this)}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option}
                                onClick={(): void => this.onMenuItemClick(option, this.state.activeMenu)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div
                    style={{
                        flex: '1',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                        padding: '16px',
                        minWidth: '200px',
                    }}
                >
                    Action list demonstrates how to build a list with actions available on individual list items.
                </div>
            </div>
        );
    }
}

export default ActionList;
