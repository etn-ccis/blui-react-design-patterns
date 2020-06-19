import React, { useState } from 'react';

// Material-UI components

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { listItems } from '../../../assets/list';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Hidden } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { Spacer } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) => ({
    banner: {
        // IE 11 does not support background blend mode. To see the image, you need to reverse the order of the image and gradient in the background property below.
        background:
            'linear-gradient(rgba(0, 123, 193, 1), rgba(0, 75, 158, 1)),url(https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundBlendMode: 'soft-light',
        minHeight: theme.spacing(34),
        color: '#fff',
    },
    bannerMain: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    content: {
        marginLeft: theme.spacing(8),
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    header: {
        top: 0,
        left: 'auto',
        right: 'auto',
        transform: 'translateY(-100%)',
        transition: 'all 0.5s ease-in-out',
    },
    top: {
        transform: 'translateY(0)',
        top: '0',
    },
    noPadLeft: {
        paddingLeft: '0px',
    },
}));

export const CollapsibleAppBar = (props: any): JSX.Element => {
    const classes = useStyles(props);
    const [list] = useState(listItems);
    const [activeClass, setActiveClass] = useState('');
    const [opacity, setOpacity] = useState(1);
    const dispatch = useDispatch();

    const onScrollHandler = () => {
        setOpacity(window.pageYOffset);
        console.log(window.pageYOffset);
        if (window.pageYOffset > 70) {
            setActiveClass('top');
        } else {
            setActiveClass('');
        }
    };

    /* 
    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.addEventListener('scroll', () => {
                setOpacity(window.pageYOffset);
                if (window.pageYOffset > 70) {
                    setActiveClass('top');
                } else {
                    setActiveClass('');
                }
            });
        }
    }, []);
    */

    return (
        <div id="scroll-area" onScroll={onScrollHandler}>
            <AppBar className={`${classes.header} ${[activeClass ? classes.top : '']}`}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h6" color="inherit">
                            President
                        </Typography>
                        <Typography className="sub-text" variant="body1" color="inherit">
                            Leader of the Free World
                        </Typography>
                    </div>
                    <IconButton color="inherit" edge={'end'}>
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.banner}>
                <Toolbar className={classes.bannerMain}>
                    <div style={{ display: 'flex', width: '100%', minHeight: 64 }}>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: true });
                                }}
                                edge={'start'}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Spacer />
                        <IconButton color="inherit" edge={'end'}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                    <div className={classes.content} style={{ opacity: 1 - opacity / 200 }}>
                        <Typography variant="h4" color="inherit">
                            President
                        </Typography>
                        <Typography variant="h5" color="inherit">
                            Commander in Chief
                        </Typography>
                        <Typography variant="h6" color="inherit">
                            Leader of the Free World
                        </Typography>
                    </div>
                </Toolbar>
            </div>
            <List component="nav">
                {list.map((item, i) => (
                    <ListItem key={`item-${i}`}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <div>
                            <ListItemText primary={item.president} secondary={item.party} />
                            <ListItemText className={classes.noPadLeft} secondary={item.took_office} />
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
