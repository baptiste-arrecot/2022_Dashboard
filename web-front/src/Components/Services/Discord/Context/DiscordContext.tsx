import React, { createContext, useState } from 'react';


export const DiscordContext = createContext<any>(null);

export const DiscordProvider = (props: any) => {
    const [selectedGuild, setSelectedGuild] = React.useState<any>(null);
    const [selectedChannel, setSelectedChannel] = React.useState<any>(null);

    return (
        <DiscordContext.Provider value={{ ...props.value, selectedGuild, setSelectedGuild, selectedChannel, setSelectedChannel }}>
            {props.children}
        </DiscordContext.Provider>
    );
};