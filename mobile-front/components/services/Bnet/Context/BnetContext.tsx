import React, { createContext } from 'react';


export const BnetContext = createContext<any>(null);

export const BnetProvider = (props: any) => {
    return (
        <BnetContext.Provider value={{ ...props.value }}>
            {props.children}
        </BnetContext.Provider>
    );
};