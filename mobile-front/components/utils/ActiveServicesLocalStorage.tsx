import ServiceBase from '../services/ServiceBase';
import ServicesList from '../services';

const serializeServices = (services: ServiceBase[]) => {
    const servicesList = services.map((service: ServiceBase) => service.generateInfo());
    return servicesList
}

export function saveActiveServices(services: ServiceBase[], username: string) {
    localStorage.setItem(username, JSON.stringify(serializeServices(services)));
}

export function getActiveServices(username: string): ServiceBase[] {
    const servicesBrut = localStorage.getItem(username)
    if (!servicesBrut) return [];
    const servicesObject = JSON.parse(servicesBrut!)
    return servicesObject.map((serviceInfo: any) => {
        var newService: ServiceBase = new ServicesList[serviceInfo.id]();
        newService.setInfo(serviceInfo);
        return newService;
    });
}