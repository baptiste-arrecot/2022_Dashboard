import React, { createContext, useContext, useState, useEffect } from 'react';
import ServiceBase from '../Services/ServiceBase';
import { getActiveServices, saveActiveServices } from '../Utils/ActiveServicesLocalStorage';
import ServicesList from '../Services';
import { UserContext } from '../Context/UserContext';
import { getServicesDatabase, updateServicesDatabase } from '../Utils/ActiveServicesDatabase';

export const ServicesContext = createContext<any>(null);

const ServicesProvider = ({ children }: any) => {
    const { username, token } = useContext(UserContext);
    const [services, setServices] = useState<ServiceBase[]>(getActiveServices(username));
    const [displayedService, setDisplayedService] = useState<any>(undefined);

    const refreshServices = () => {
        saveActiveServices(services, username);
    }

    const updateSaveServices = (services: ServiceBase[]) => {
        setServices(services);
        saveActiveServices(services, username);
        updateServicesDatabase(services.map(service => service.generateInfo()), token).catch(console.error);
    }

    const addService = (id: string) => {
        var newService = new ServicesList[id]();
        const newServices = [...services, newService];
        updateSaveServices(newServices);
    }

    const removeService = (s: ServiceBase) => {
        services.splice(services.indexOf(s), 1);
        const newServices = [...services];
        updateSaveServices(newServices);
    }

    useEffect(() => {
        getServicesDatabase(token).then((services: any) => {
            setServices(services.map((service: any) => {
                var newService = new ServicesList[service.id]();
                newService.setInfo(service);
                return newService;
            }));
        }).catch(console.error);
    }, []);

    return (
        <ServicesContext.Provider value={{ services, addService, removeService, refreshServices, displayedService, setDisplayedService }}>
            {children}
        </ServicesContext.Provider>
    );
};

export default ServicesProvider;