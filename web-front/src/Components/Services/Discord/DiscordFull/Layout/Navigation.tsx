import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getGuilds } from '../../API/discordAPI';
import { DiscordContext } from "../../Context/DiscordContext";

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const AppBar: any = styled(MuiAppBar, {
    shouldForwardProp: (prop: any) => prop !== "open"
})((props: any) => ({
    zIndex: props.theme.zIndex.drawer - 1,
    transition: props.theme.transitions.create(["width", "margin"], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.leavingScreen
    }),
    ...(props.open && {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: props.theme.transitions.create(["width", "margin"], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer: any = styled(MuiDrawer, {
    shouldForwardProp: (prop: any) => prop !== "open"
})((props: any) => ({
    zIndex: props.theme.zIndex.drawer - 2 ,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(props.open && {
        ...openedMixin(props.theme),
        "& .MuiDrawer-paper": openedMixin(props.theme)
    }),
    ...(!props.open && {
        ...closedMixin(props.theme),
        "& .MuiDrawer-paper": closedMixin(props.theme)
    })
}));

export default function NavigationComponent(props: any) {
    const theme = useTheme();
    const [open, setOpen] = React.useState<Boolean>(false);
    const [guilds, setGuilds] = useState<any>([]);
    const { accessToken, setSelectedGuild, setSelectedChannel } = useContext(DiscordContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log('refresh guild list (fetching...)');
        getGuilds(accessToken).then(res => {
            setGuilds(res);
        });
    }, [accessToken]);

    return (
        <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
            <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                Mini variant drawer
            </Typography>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="end"
                sx={{
                marginLeft: 5,
                ...(open && { display: "none" })
                }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {props.children}
        </Box>

        <Drawer variant="permanent" open={open} anchor="right">
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {guilds.map((guild: any) => (
                <ListItemButton
                key={guild.id}
                onClick={() => {
                    setSelectedGuild(guild)
                    // setSelectedChannel(guild.channels[0])
                    setSelectedChannel(null);
                }}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                }}>
                    <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                    }}>
                        {guild.icon ? <Avatar alt={guild.name} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} />
                                    : <Avatar alt={guild.name} src="null" />}
                    </ListItemIcon>
                    <ListItemText primary={guild.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            ))}
            </List>
        </Drawer>

        </Box>
    );
}