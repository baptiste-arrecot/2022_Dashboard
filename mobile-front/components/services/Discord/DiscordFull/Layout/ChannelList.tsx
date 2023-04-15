import React, { useContext, useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { DiscordContext } from '../../Context/DiscordContext';
import { getChannels } from '../../API/discordAPI';

export default function ChanneListComponent() {
    const { accessToken, selectedGuild, setSelectedChannel } = useContext(DiscordContext);
    const [channels, setChannels] = useState<any>([]);

    useEffect(() => {
        if (!selectedGuild) return;
        getChannels(selectedGuild.id, accessToken).then(channels => {
            console.log(channels);
            setChannels(channels);
        }).catch(console.error);
    }, [accessToken, selectedGuild]);
    
    if (!selectedGuild) return (<></>);
    return (
        <Drawer>
            <List>
            {channels.map((guild: any) => (
                <ListItemButton
                key={guild.id}
                onClick={() => setSelectedChannel(guild)}
                >
                    <ListItemText primary={guild.name} />
                </ListItemButton>
            ))}
            </List>
        </Drawer>
    )
}