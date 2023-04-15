import React, { useContext } from 'react';
import ServicesList from '../Services'
import ServiceBase from '../Services/ServiceBase';
import AddServiceButton from '../Buttons/AddServiceButton';
import { ServicesContext } from '../Context/ServicesContext';
import './ActiveServicesList.css';

export default function ActiveServicesList() {
    const { services, addService, removeService, setDisplayedService } = useContext(ServicesContext);

    const openService = (s: ServiceBase) => {
        setDisplayedService(s);
    }

    return (
        <div className="active-services-list">
            { services.map((service: ServiceBase, index: number) => 
                <service.previewBoard onRemove={removeService} onOpen={openService} key={index} />
            )}
            <AddServiceButton services={ServicesList} onAddService={addService} />
        </div>
    );
}