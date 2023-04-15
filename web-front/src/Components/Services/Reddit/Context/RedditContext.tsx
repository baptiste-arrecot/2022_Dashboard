import React, { createContext } from 'react';


export const RedditContext = createContext<any>(null);

export const RedditProvider = (props: any) => {
    return (
        <RedditContext.Provider value={{ ...props.value }}>
            {props.children}
        </RedditContext.Provider>
    );
};