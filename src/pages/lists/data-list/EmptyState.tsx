import React from 'react';
import { EmptyState as PXBEmptyState } from '@pxblue/react-components';
import { useTheme } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

export const EmptyState: React.FC = () => {
    const theme = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: `calc(100vh - ${theme.spacing(8)}px)`,
            }}
        >
            <PXBEmptyState icon={<ErrorIcon style={{ fontSize: '100px' }} />} title={'No Items Found'} />
        </div>
    );
};
