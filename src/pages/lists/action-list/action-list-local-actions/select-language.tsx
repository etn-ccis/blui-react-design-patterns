import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { LanguageSelectProps } from './select-language-mobile';

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: 200,
        },
    })
);

export const LanguageSelect = (props: LanguageSelectProps): JSX.Element => {
    const classes = useStyles();
    const { language, updateLanguage } = props;

    const handleChange = (event: SelectChangeEvent): void => {
        updateLanguage(event.target.value);
    };

    return (
        <FormControl variant={'outlined'} size={'small'} className={classes.formControl}>
            <Select value={language} onChange={handleChange} data-testid="LanguageDesktop">
                <MenuItem value="deutsch">Deutsch</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="espanol">Español</MenuItem>
                <MenuItem value="francais">Français</MenuItem>
            </Select>
        </FormControl>
    );
};
