// import Twitch from './Twitch';
import Bnet from './Bnet';
// import Reddit from './Reddit';
// import Discord from './Discord';

interface IServiceList {
    [key: string]: any;
}

var services: IServiceList = {};

// services[Twitch.id] = Twitch;
services[Bnet.id] = Bnet;
// services[Reddit.id] = Reddit;
// services[Discord.id] = Discord;

export default services;