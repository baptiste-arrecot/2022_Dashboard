import React, { useContext, useEffect, useState } from "react";

import { getGuilds } from '../../API/discordAPI';

export default function NavigationComponent(props: any) {
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
        console.log('refresh guild list (fetching...)');
        getGuilds(props.accessToken).then(res => {
            console.log('refresh guild list (fetched)', res);
            if (res)
                setGuilds(res);
        });
    }, [props.accessToken]);

    return (
        <React.Fragment>
            {guilds.map((guild: any) => (
                <Text>
                    {guild.name}
                </Text>
            ))}
        </React.Fragment>
    )
            // key={guild.id}
            //         {guild.icon ? <Avatar alt={guild.name} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} />
            //                     : <Avatar alt={guild.name} src="null" />}
                
}