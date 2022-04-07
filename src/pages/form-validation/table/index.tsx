import React from 'react';
import {
    AppBar,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { InfoListItem } from '@brightlayer-ui/react-components';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}`,
    },
    appbarRoot: {
        padding: 0,
    },
    textFieldRoot: {
        width: 128,
    },
    skinnyInput: {
        paddingTop: 11,
        textAlign: 'right',
    },
    tableContainer: {
        maxWidth: 528,
        width: 'auto',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        boxSizing: 'border-box',
    },
}));

const createData = (id: number, name: string, min: number, max: number): any => ({ id, name, min, max });

const rows = [createData(1, 'Power', 123, 456), createData(2, 'Xpert', 123, 456), createData(3, 'Blue', 123, 456)];

const getLastRowStyles = (index: number): { borderBottomWidth: number } => ({
    borderBottomWidth: index === rows.length - 1 ? 0 : 1,
});

export const TableFormValidation = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const getTable = (): JSX.Element => (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align={'left'}>Name</TableCell>
                        <TableCell align={'right'}>Min</TableCell>
                        <TableCell align={'right'}>Max</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id} hover={false}>
                            <TableCell component={'th'} scope={'row'} style={getLastRowStyles(index)}>
                                {row.id}
                            </TableCell>
                            <TableCell align={'left'} style={getLastRowStyles(index)}>
                                {row.name}
                            </TableCell>
                            <TableCell align={'right'} style={getLastRowStyles(index)}>
                                <TextField
                                    variant={'filled'}
                                    value={row.min}
                                    classes={{
                                        root: classes.textFieldRoot,
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                />
                            </TableCell>
                            <TableCell align={'right'} style={getLastRowStyles(index)}>
                                <TextField
                                    variant={'filled'}
                                    value={row.max}
                                    classes={{
                                        root: classes.textFieldRoot,
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.skinnyInput,
                                        },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const getList = (): JSX.Element => (
        <>
            {rows.map((row, index) => (
                <div key={index}>
                    <InfoListItem
                        icon={
                            <Typography variant={'body1'} style={{ color: theme.palette.text.secondary }}>
                                #{row.id}
                            </Typography>
                        }
                        title={<Typography variant={'h6'}>{row.name}</Typography>}
                    />
                    <InfoListItem
                        title={'Min'}
                        rightComponent={
                            <TextField
                                variant={'filled'}
                                value={row.min}
                                classes={{
                                    root: classes.textFieldRoot,
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.skinnyInput,
                                    },
                                }}
                            />
                        }
                    />
                    <InfoListItem
                        title={'Max'}
                        rightComponent={
                            <TextField
                                variant={'filled'}
                                value={row.max}
                                classes={{
                                    root: classes.textFieldRoot,
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.skinnyInput,
                                    },
                                }}
                            />
                        }
                    />
                    <Divider
                        variant={index === rows.length - 1 ? 'fullWidth' : 'inset'}
                        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
                    />
                </div>
            ))}
        </>
    );

    return (
        <>
            <AppBar data-cy={'blui-toolbar'} position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy={'toolbar-menu'}
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        In a Table
                    </Typography>
                </Toolbar>
            </AppBar>
            {smDown ? null : getTable()}
            {smUp ? null : <div style={{ background: 'white' }}>{getList()}</div>}
            <Typography style={{ padding: theme.spacing(2) }} variant={'body1'}>
                Remember that in a real application you would need to implement form validations to check, for example,
                &quot;Min&quot; is less than &quot;Max&quot;.
            </Typography>
        </>
    );
};
