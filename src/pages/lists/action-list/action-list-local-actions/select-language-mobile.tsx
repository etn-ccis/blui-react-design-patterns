import React from 'react';
import { InfoListItem } from '@pxblue/react-components';
import { Done } from '@material-ui/icons';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        container:{ backgroundColor:theme.palette.background.paper }

    })
);

export const LanguageSelectMobile: React.FC = () => {
    const theme = useTheme()
    const classes = useStyles(theme);
    const [language, setLanguage] = React.useState('english');

    return (
        <div className={classes.container}>
            <InfoListItem 
            title={'Deutsch'} 
            icon={language==='deutsch' ? <Done /> : undefined}
            onClick={(): void => {setLanguage('deutsch')}}
            divider={'full'}
            />
            <InfoListItem 
            title={'English'} 
            icon={language==='english' ? <Done /> : undefined}
            onClick={(): void => {setLanguage('english')}}
            divider={'full'}
            />
            <InfoListItem 
            title={'Español'} 
            icon={language==='espanol' ? <Done /> : undefined}
            onClick={(): void => {setLanguage('espanol')}}
            divider={'full'}
            />
            <InfoListItem 
            title={'Français'} 
            icon={language==='francais' ? <Done /> : undefined}
            onClick={(): void => {setLanguage('francais')}}
            divider={'full'}
            />
        </div>
    );
};
