import React, { useState, useContext } from 'react';

import ServiceBase from './../../services/ServiceBase';
import { StoreContext } from '../../utils/Store';
import ServicesList from '../../services/index';
import AddServiceButton from './AddServiceButton';

const ActiveServicesList = () => {
  const [displayedService, setDisplayedService] = useState(undefined);
  const { services, setServices } = useContext(StoreContext);

  const addService = (id: any) => {
    var newService = new ServicesList[id]();
    const newServices = [...services, newService];
    setServices(newServices);
  }

  const removeService = (s: any) => {
    services.splice(services.indexOf(s), 1);
    setServices([...services]);
  }

  const openService = (s: any) => {
    setDisplayedService(s);
  }

  return (
    <>
      {services.map((service: ServiceBase , index: number) => 
        <service.previewBoard onRemove={removeService} onOpen={openService} key={index} />
      )}
      <AddServiceButton services={ServicesList} onAddService={addService} />
    </>
  );
}

export default ActiveServicesList;