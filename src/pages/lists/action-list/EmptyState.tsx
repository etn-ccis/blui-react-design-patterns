import React from 'react';
import Button from '@mui/material/Button';
import { EmptyState as BLUIEmptyState } from '@brightlayer-ui/react-components';
import { useTheme } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';

type EmptyStateProps = { onAddItem: () => void };

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const theme = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100vh - ${theme.spacing(8)})`,
            }}
        >
            <BLUIEmptyState
                icon={<ErrorIcon style={{ fontSize: '100px' }} />}
                title={'No Items Found'}
                actions={
                    <Button
                        data-cy="blui-empty-state-add"
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
