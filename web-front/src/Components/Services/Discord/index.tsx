import React from 'react';
import ServiceBase from '../ServiceBase';
import openAuthWindow from '../../Utils/openAuthWindow';
import DiscordLogo from './Assets/logo-discord.png';
import { DiscordContext, DiscordProvider } from './Context/DiscordContext';
import './DiscordPreview.css';

export default class Discord extends ServiceBase {
    static id: string = "service-Discord";
    id: string = Discord.id;
    name: string = "Discord";
    logo: string = DiscordLogo;
    user: string = "";
    accessToken: string = "";
    refreshToken: string = "";

    servicePreview: React.LazyExoticComponent<() => JSX.Element>;
    serviceFull: React.LazyExoticComponent<() => JSX.Element>;

    ServiceContext: React.Context<any> = DiscordContext;
    ServiceProvider: React.FC<any> = DiscordProvider;

    onAuth = async (setIsAuthenticated: any) => {
        const data = await openAuthWindow(`http://api.drainboard.tk/auth/discord`, 'discord-login-redirect').catch(alert);
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

    constructor() {
        super();
        this.servicePreview = React.lazy(() => import('./DiscordPreview'));
        this.serviceFull = React.lazy(() => import('./DiscordFull/DiscordComponent'));
    }

}