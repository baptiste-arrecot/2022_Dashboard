import React, { createContext, useState } from 'react';


export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUsername(username);
      setToken(token);
    }
  }, []);

  React.useEffect(() => {
    if (token && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [token, username]);

  return (
    <UserContext.Provider value={{ username, setUsername, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;