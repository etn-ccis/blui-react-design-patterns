import React from 'react';
import Button from '@material-ui/core/Button';
import { EmptyState as PXBEmptyState } from '@pxblue/react-components';
import { useTheme } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import AddIcon from '@material-ui/icons/Add';

type EmptyStateProps = { onAddItem: () => void };

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const theme = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100vh - ${theme.spacing(8)}px)`,
            }}
        >
            <PXBEmptyState
                icon={<ErrorIcon style={{ fontSize: '100px' }} />}
                title={'No Items Found'}
                actions={
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{ margin: theme.spacing() }}
                        onClick={props.onAddItem}
                        startIcon={<AddIcon />}
                    >
                        Add an Item
                    </Button>
                }
            />
        </div>
    );
};
