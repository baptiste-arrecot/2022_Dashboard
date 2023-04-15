import React, { Suspense, useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ServicesContext } from '../Context/ServicesContext';
import './ServiceBase.css';

export default abstract class ServiceBase {
    abstract servicePreview: React.LazyExoticComponent<() => JSX.Element>;
    abstract serviceFull: React.LazyExoticComponent<() => JSX.Element>;
    abstract name: string;
    abstract logo: string;
    abstract user: string;
    abstract refreshToken: string;
    abstract accessToken: string;
    abstract id: string;
    abstract onAuth: (setIsAuthenticated: any) => Promise<void>;
    abstract generateExtraInfo: () => any;
    abstract setExtraInfo: (info: any) => void;

    abstract ServiceContext: React.Context<any>;
    abstract ServiceProvider: React.FC<any>;

    static id: string = "";
    uniqueId: string = Math.random().toString(36).substr(2, 9);

    generateInfo = () => {
        return {
            id: this.id,
            uniqueId: this.uniqueId,
            user: this.user,
            refreshToken: this.refreshToken,
            accessToken: this.accessToken
        }
    };

    setInfo = (info: any) => {
        this.id = info.id;
        this.uniqueId = info.uniqueId;
        this.user = info.user;
        this.refreshToken = info.refreshToken;
        this.accessToken = info.accessToken;
    };

    previewBoard: any = (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState(this.user ? true : false);
        const { refreshServices } = useContext(ServicesContext);

        return (
            <div className={"serviceboard-container board-" + this.name.toLowerCase().replace(/\.|%[0-9a-z]{2}/gi, '')}>
                <div className="serviceboard-toolbar">
                    <span className="remove-button" onClick={() => props.onRemove(this)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                {isAuthenticated ? (
                    // **** Preview **** //
                    <>
                        <div className="serviceboard-header">
                            <img className="serviceboard-logo" src={this.logo} alt={this.name} />
                            <div className="serviceboard-info">
                                <span className="serviceboard-name">{this.name}</span>
                                <span className="serviceboard-user">Connected as {this.user}</span>
                            </div>
                        </div>
                        <button className="form-btn" onClick={() => {props.onOpen(this)}}>Ouvrir</button>
                        <this.ServiceProvider value={{ accessToken: this.accessToken }}>
                            <Suspense fallback={<div>Chargement...</div>}>
                                <this.servicePreview />
                            </Suspense>
                        </this.ServiceProvider>
                    </>
                    // ***************** //
                ) : (
                    // **** Auth **** //
                    <div className="serviceboard-auth-container">
                        <img className="serviceboard-logo" src={this.logo} alt={this.name} />
                        <span className="serviceboard-name">{this.name}</span>
                        <button className="form-btn" onClick={() => {
                            this.onAuth(setIsAuthenticated).then(refreshServices).catch(console.error);
                        }}>Se connecter</button>
                    </div>
                    // ************** //
                )}
            </div>
        );
    }

    ServiceComponent: any = (props: any) => {
        return (
            <div>
                <this.ServiceProvider value={{ accessToken: this.accessToken }}>
                    <Suspense fallback={<div>Chargement...</div>}>
                        <this.serviceFull />
                    </Suspense >
                </this.ServiceProvider>
            </div>
        )
    }
}