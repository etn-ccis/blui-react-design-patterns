import React, {useCallback} from 'react';
import { Drawer ,List, ListItem, ListItemText, useTheme} from '@material-ui/core';


export const BottomSheet = (): JSX.Element => {
    // const dispatch = useDispatch();
    // const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const closeMenu = useCallback(() => {
        // onClose();
        // setAnchorEl(null);
        // (): void => { } 
    }, []);

    return (
        <Drawer data-cy="bottom-sheet" transitionDuration={theme.transitions.duration.short} anchor={'bottom'} open={true} onClose={closeMenu}>
            <List>
            {['All Locations', 'Gary Steel Works', 'US Steel'].map((text) => (
            <ListItem key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        </Drawer>
    );
};
