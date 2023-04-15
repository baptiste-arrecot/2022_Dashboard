import React from 'react';
import ServiceBase from '../ServiceBase';
import './BnetPreview.css';
import { WebView } from 'react-native-webview';
import { BnetContext, BnetProvider } from './Context/BnetContext';

export default class Bnet extends ServiceBase {
    static id: string = "service-Bnet";
    id :string = Bnet.id;
    name: string = "Bnet"
    logo: string = '';
    user: string = "";

    accessToken: string = "";
    refreshToken: string = "";

    servicePreview: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./BnetPreview'));;
    serviceFull: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./BnetWidgets/BnetWidgets'));

    ServiceContext: React.Context<any> = BnetContext;
    ServiceProvider: React.FC<any> = BnetProvider;

    onAuth = async (setModal: any, setIsAuthenticated: any) => {
        return (<WebView
            source={{ uri: 'http://api.drainboard.tk/auth/bnet' }}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onNavigationStateChange={(state :any) => {
                if (state.url.includes('http://localhost:3000')) {
                    let parsedurl = state.url.split('=&');
                    this.accessToken = parsedurl[1];
                    this.refreshToken = parsedurl[3];
                    this.user = parsedurl[5];
                    setModal(false);
                    setIsAuthenticated(true);
                }
            }}    
        />)
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