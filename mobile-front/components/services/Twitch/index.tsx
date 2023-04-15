// import React from 'react';
// import ServiceBase from '../ServiceBase'
// import twitchLogo from './logo-twitch.png';
// import './TwitchPreview.css';
// // import openAuthWindow from '../../Utils/openAuthWindow';
import { getMyProfile } from '../../../apiRequest/apiDash';
// import { TwitchContext, TwitchProvider } from './Context/TwitchContext';

// export default class Twitch extends ServiceBase {
//     static id: string = "service-twitch";
//     id: string = Twitch.id;
//     name: string = "Twitch"
//     logo: string = twitchLogo;
//     user: string = "";

//     servicePreview: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./TwitchPreview'));;
//     serviceFull: React.LazyExoticComponent<() => JSX.Element> = React.lazy(() => import('./FullTwitch/FullTwitch'));;

//     accessToken: string = "";
//     refreshToken: string = "";

//     ServiceContext: React.Context<any> = TwitchContext;
//     ServiceProvider: React.FC<any> = TwitchProvider;

//     generateExtraInfo = () => {
//         return {}
//     }

//     setExtraInfo = (info: any) => {
//     }

//     onAuth = async (setIsAuthenticated: any) => {
//         const data = await openAuthWindow(`http://api.drainboard.tk/auth/twitch`, 'twitch-login-redirect').catch(alert);
//         this.accessToken = data.accessToken;
//         this.refreshToken = data.refreshToken;
//         getMyProfile(data.accessToken)
//             .then(result => {
//                 result = result.data[0];
//                 this.user = result.login;
//                 setIsAuthenticated(true);
//             })
//             .catch(console.error);
//     };
// }
