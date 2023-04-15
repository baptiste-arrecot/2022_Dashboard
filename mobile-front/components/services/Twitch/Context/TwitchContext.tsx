import React, { createContext } from 'react';


export const TwitchContext = createContext<any>(null);

export const TwitchProvider = (props: any) => {
    return (
        <TwitchContext.Provider value={{ ...props.value }}>
            {props.children}
        </TwitchContext.Provider>
    );
};