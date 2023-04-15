import { createContext, useState } from 'react';

const createStore = () => {
  const [username, setUsername] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [services, setServices] = useState<any>([]);
  const [isDarkMode, setIsDarkMode] = useState<Boolean>(false);
  const [servicesAuth, setServicesAuth] = useState<any>({});
  const [display, setDisplay] = useState<string>("");

  return ({
      username, setUsername,
      token, setToken,
      services, setServices,
      servicesAuth, setServicesAuth,
      isDarkMode, setIsDarkMode,
      display, setDisplay
  });
}

const store = createStore;

export const StoreContext = createContext<any>(store);

export default createStore;
