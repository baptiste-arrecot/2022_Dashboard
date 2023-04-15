import React, { createContext, useContext, useState, useEffect } from 'react';
import ServiceBase from '../services/ServiceBase';
import ServicesList from '../services';
import { StoreContext } from '../utils/Store';
import { getServicesDatabase, updateServicesDatabase } from '../utils/ActiveServicesDatabase';

export const ServicesContext = createContext<any>(null);

const ServicesProvider = ({ children }: any) => {
    const { username, token } = useContext(StoreContext);
    const [services, setServices] = useState<ServiceBase[]>([]);
    const [displayedService, setDisplayedService] = useState<any>(undefined);
    const [servicesAuth, setServicesAuth] = useState<any>({});

    const updateSaveServices = (services: ServiceBase[]) => {
        setServices(services);
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
        <ServicesContext.Provider value={{ services, addService, removeService, displayedService, setDisplayedService, servicesAuth, setServicesAuth }}>
            {children}
        </ServicesContext.Provider>
    );
};

export default ServicesProvider;