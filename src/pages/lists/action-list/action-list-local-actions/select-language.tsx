import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
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

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        updateLanguage(event.target.value as string);
    };

    return (
        <FormControl variant={'outlined'} size={'small'} className={classes.formControl}>
            <Select value={language} onChange={handleChange}>
                <MenuItem value="deutsch">Deutsch</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="espanol">Español</MenuItem>
                <MenuItem value="francais">Français</MenuItem>
            </Select>
        </FormControl>
    );
};
