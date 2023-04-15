import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Fab, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import { ServicesContext } from '../Context/ServicesContext';
import { UserContext } from '../Context/UserContext';

import './Drawer.css';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

export default function Drawer() {
    const { setDisplayedService } = useContext(ServicesContext);
    const { setUsername, setToken } = useContext(UserContext);
    const [drawerActivate, setDrawerActivate] = React.useState(false);

    const toggleDrawer = (open: any) => (event: any) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerActivate(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <DrawerHeader>
                <IconButton onClick={toggleDrawer(false)}>
                <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem button key={'Home'} onClick={() => {setDisplayedService(null)}}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={'Info'}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Info'} />
                </ListItem>
                <ListItem button key={'Disconnect'} onClick={() => {
                    setUsername(null);
                    setToken(null);
                }}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Disconnect'} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <Fab color="secondary" aria-label="edit" className="drawer-button" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </Fab>
                <SwipeableDrawer
                        anchor={'left'}
                        open={drawerActivate}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                >
                {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}