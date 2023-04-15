import React from 'react';
import ServiceBase from '../ServiceBase'
import RedditLogo from '../../../Assets/icons/icon-reddit.png';
import './RedditPreview.css';
import openAuthWindow from '../../Utils/openAuthWindow';
import { RedditContext, RedditProvider } from './Context/RedditContext';

export default class Reddit extends ServiceBase {
    static id: string = "service-Reddit";
    id :string = Reddit.id;
    name: string = "Reddit"
    logo: string = RedditLogo;
    user: string = "";

    accessToken: string = "";
    refreshToken: string = "";

    servicePreview: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./RedditPreview'));
    serviceFull: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./RedditWidgets/RedditApp'));

    ServiceContext: React.Context<any> = RedditContext;
    ServiceProvider: React.FC<any> = RedditProvider;

    onAuth = async (setIsAuthenticated: any) => {
        const data = await openAuthWindow(`http://api.drainboard.tk/auth/reddit`, 'reddit-login-redirect').catch(alert);
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.username;
        setIsAuthenticated(true);
    };

    generateExtraInfo = () => {
        return {}
    };

    setExtraInfo = (info: any) => {
    };
}