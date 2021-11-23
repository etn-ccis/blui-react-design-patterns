import React from 'react';
import { InfoListItem } from '@pxblue/react-components';
import { Done } from '@material-ui/icons';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

type LanguageData = {
    id: string;
    title: string;
};

const languageData: LanguageData[] = [
    {
        id: 'deutch',
        title: 'Deutsch',
    },
    {
        id: 'english',
        title: 'English',
    },
    {
        id: 'espanol',
        title: 'Español',
    },
    {
        id: 'francais',
        title: 'Français',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: { backgroundColor: theme.palette.background.paper },
    })
);

export const LanguageSelectMobile: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [language, setLanguage] = React.useState('english');

    return (
        <div className={classes.container}>
            {languageData.map((data) => (
                <InfoListItem
                    key={data.id}
                    title={data.title}
                    icon={language === data.id ? <Done /> : undefined}
                    onClick={(): void => {
                        setLanguage(data.id);
                    }}
                    divider={'full'}
                />
            ))}
        </div>
    );
};
