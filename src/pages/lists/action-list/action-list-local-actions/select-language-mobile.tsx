import React from 'react';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { Done } from '@material-ui/icons';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export type LanguageSelectProps = {
    language: string;
    updateLanguage: (tempLanguage: string) => void;
    navigateBack?: () => void;
};

type LanguageData = {
    id: string;
    title: string;
};

const languageData: LanguageData[] = [
    {
        id: 'deutsch',
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

export const LanguageSelectMobile = (props: LanguageSelectProps): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { language, updateLanguage, navigateBack = (): void => {} } = props;

    return (
        <div className={classes.container}>
            {languageData.map((data) => (
                <InfoListItem
                    key={data.id}
                    title={data.title}
                    data-testid="LanguageMobile"
                    icon={language === data.id ? <Done /> : undefined}
                    onClick={(): void => {
                        updateLanguage(data.id);
                        navigateBack();
                    }}
                    divider={'full'}
                />
            ))}
        </div>
    );
};
