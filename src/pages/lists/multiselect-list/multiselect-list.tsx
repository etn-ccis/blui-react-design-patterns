import React, { useState } from 'react';
import { makeStyles, createStyles, AppBar, Toolbar, Typography, List, ListItem, Checkbox, IconButton, Hidden, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu';
import ComputerIcon from '@material-ui/icons/Computer'
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { EmptyState, InfoListItem } from '@pxblue/react-components';

export type ListItem = {
  id: number;
  name: string;
  details: string;
  checked: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      maxWidth: '500px',
      position: 'fixed',
      bottom: 0,
      left: '50%',
      background: '#fff',
      transform: 'translateX(-50%, 100%)',
      transition: 'all 0.2s cubic- bezier(0.4, 0.0, 0.2, 1)',
      opacity: 0,
      padding: '4px',
      paddingLeft: '32px',
      visibility: 'hidden',
      boxShadow: '0px -8px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    },
    snackbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      lineHeight: '36px',
      opacity: 1,
    },
    active: {
      opacity: 1,
      transform: 'translateX(-50%, 0)',
      visibility: 'visible',
    }
  })
);

export const MultiselectList = (): JSX.Element => {

  const classes = useStyles();
  const dispatch = useDispatch();

  function createItem(index: number, randomStatus: string): ListItem {
    return {
      id: index,
      name: `Item ${index}`,
      details: `Status: ${randomStatus}`,
      checked: false,
    };
  }

  function createRandomItem(): ListItem {
    const int = parseInt(`${Math.random() * 100}`, 10);
    const randomStatus = Math.random() >= 0.3 ? "normal" : "alarm";
    return createItem(int, randomStatus);
  }

  const generatedList = [];

  for (let i = 0; i < 10; i++) {
    generatedList.push(createRandomItem());
  }

  const [list, setList] = useState<ListItem[]>(generatedList);
  const [selectedItems, setSelectedItems] = useState<any>([]);

  function onSelect(item: ListItem): void {
    if (selectedItems.indexOf(item) === -1) {
      setSelectedItems([...selectedItems, item])
    }
    else {
      const index = selectedItems.indexOf(item);
      setSelectedItems(selectedItems.filter((_: ListItem, i: number) => i !== index));
    }
  };

  function isSelected(item: ListItem): boolean {
    return selectedItems.indexOf(item) !== -1;
  }

  function onAddItem(): void {
    setList([...list, createRandomItem()]);
  }

  function onDelete(): void {
    const updatedList = [...list];

    selectedItems.forEach((item: ListItem) => {
      const index = updatedList.indexOf(item);
      updatedList.splice(index, 1);
    });

    setList(updatedList);
    setSelectedItems([]);
  }

  function onCancel(): void {
    list.forEach((item: ListItem): void => {
      item.checked = false;
    })
    setSelectedItems([]);
  }

  const getEmptyComponent = (): JSX.Element => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        height: 'calc(100vh - 128px)',
      }}
    >
      <EmptyState
        icon={<ComputerIcon style={{ fontSize: '100px' }} />}
        title={'No Items Found'}
        actions={
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={(): void => onAddItem()}
          >
            <AddIcon style={{ marginRight: '5px' }} />
                    Add an Item
                </Button>
        }
      />
    </div>
  );

  return (
    <div style={{ overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={true}>
            <IconButton
              color={'inherit'}
              onClick={(): void => {
                dispatch({ type: TOGGLE_DRAWER, payload: true });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '-12px',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" data-cy="pxb-toolbar" color="inherit">
            Multiselect list
          </Typography>
          <div style={{ flex: '1 1 0px' }} />
          <IconButton
            id="add-item-button"
            data-cy="toolbar-add"
            color="inherit"
            aria-label="add"
            onClick={(): void => {
              onAddItem();
            }}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {list.length < 1 && getEmptyComponent()}
      <List data-cy="list-content" className="list">
        {list.map((item, index) => (
          <InfoListItem key={`listItem_${index}`}
            icon={<Checkbox className="checkbox" value={item.name}
              onChange={(): void => onSelect(item)}
              checked={isSelected(item)} />}
            title={item.name}
            subtitle={item.details} chevron> </InfoListItem>
        ))}
      </List>
      <footer data-cy="snackbar" className={selectedItems.length > 0 ? clsx(classes.snackbar, classes.active, classes.footer) : clsx(classes.snackbar, classes.footer)}>
        <Typography>{selectedItems.length} selected items</Typography>
        <div>
          <IconButton id="remove-items-button" onClick={onDelete} data-cy="snackbar-delete">
            <DeleteIcon />
          </IconButton>
          <IconButton id="cancel-button" onClick={onCancel} data-cy="snackbar-cancel">
            <CancelIcon />
          </IconButton>
        </div>
      </footer >
    </div >
  )
}