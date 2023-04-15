import React from 'react';
import ServiceBase from '../ServiceBase'
import BnetLogo from '../../../Assets/icons/icon-bnet.png';
import './BnetPreview.css';
import openAuthWindow from '../../Utils/openAuthWindow';
import { BnetContext, BnetProvider } from './Context/BnetContext';

export default class Bnet extends ServiceBase {
    static id: string = "service-Bnet";
    id :string = Bnet.id;
    name: string = "Bnet"
    logo: string = BnetLogo;
    user: string = "";

    accessToken: string = "";
    refreshToken: string = "";

    servicePreview: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./BnetPreview'));;
    serviceFull: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./BnetWidgets/BnetWidgets'));

    ServiceContext: React.Context<any> = BnetContext;
    ServiceProvider: React.FC<any> = BnetProvider;

    onAuth = async (setIsAuthenticated: any) => {
        const data = await openAuthWindow(`http://api.drainboard.tk/auth/bnet`, 'bnet-login-redirect').catch(alert);
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.username;
        setIsAuthenticated(true);
    };

    generateExtraInfo = () => {
        return {}
    }

    setExtraInfo = (info: any) => {
    };

    tokenisinvalid = (setIsAuthenticated: any) => {
        setIsAuthenticated(false);
    }
}