import React, { useState } from 'react';
import { arrayMove, SortableHandle, SortableElement, SortableContainer } from 'react-sortable-hoc';
import { DragIndicator } from '@material-ui/icons';
import { List, AppBar, Toolbar, Typography, Button, Hidden, IconButton } from '@material-ui/core';
import { InfoListItem, ChannelValue } from '@pxblue/react-components';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { President, SortableListItemProps, SortableListEditProps, OnSortEndProps } from '../../overlays/bottom-sheet/models';

const presidentsList: President[] = [
  {
    firstName: "George",
    lastName: "Washington",
    year: 1789
  },
  {
    firstName: "John",
    lastName: "Adams",
    year: 1796
  },
  {
    firstName: "Thomas",
    lastName: "Jefferson",
    year: 1800
  },
  {
    firstName: "James",
    lastName: "Madison",
    year: 1808
  },
  {
    firstName: "James",
    lastName: "Monroe",
    year: 1812
  },
]

// Sortable Components Definitions
const DragHandle = SortableHandle(() => <DragIndicator style={{ height: '20px', width: '20px', cursor: 'pointer' }} />);

const SortableListItem = SortableElement(({ president }: SortableListItemProps) => (
  <InfoListItem
    icon={<DragHandle />}
    title={`${president.firstName} ${president.lastName}`}
    rightComponent={<ChannelValue value={president.year}></ChannelValue>}
  >
  </InfoListItem>
));

export const SortableListEdit = SortableContainer(({ presidents }: SortableListEditProps) => (
  <List style={{ paddingTop: '0px' }} component="nav">
    {
      presidents.map((president: President, i: number) => (<SortableListItem key={`item-${i}`} index={i} president={president} />))
    }
  </List>
));


export const SortableList = (): JSX.Element => {
  const dispatch = useDispatch();
  const [list, setList] = useState<any[]>(presidentsList);
  const [sortable, setSortable] = useState<boolean>(false);

  const onSortEnd = ({ oldIndex, newIndex }: OnSortEndProps): void => {
    setList(arrayMove(list, oldIndex, newIndex));
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={true}>
            <IconButton
              color={'inherit'}
              onClick={(): void => {
                dispatch({ type: TOGGLE_DRAWER, payload: true });
              }}
              edge={'start'}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" color="inherit">
            Sortable List
            </Typography>
          <div style={{ flex: '1 1 0px', textAlign: 'right', marginRight: '-14px' }}>
            <Button style={{ color: 'white' }} onClick={(): void => setSortable(!sortable)}>
              {sortable ? 'Save' : 'Edit'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {sortable &&
        <SortableListEdit
          presidents={list}
          onSortEnd={onSortEnd}
          useDragHandle={true}
        />
      }
      {!sortable &&
        <List className="list" disablePadding component="nav">
          {
            list.map((president: President, i: number) => (
              <InfoListItem
                hidePadding
                key={`president-${i}`}
                title={`${president.firstName} ${president.lastName}`}
                rightComponent={<ChannelValue value={president.year}></ChannelValue>}
              >
              </InfoListItem>
            ))
          }
        </List>
      }
    </div>
  );
};
