import { Request } from 'express';
const passport = require('passport');
import {Strategy as DiscordStrategy, Scope, Profile} from '@oauth-everything/passport-discord';
const BnetStrategy = require('passport-bnet').Strategy;
const twitchStrategy = require("passport-twitch-new").Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const SteamStrategy = require('passport-steam').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy; 

passport.use(new BnetStrategy({
  clientID: process.env.BNET_ID,
  clientSecret: process.env.BNET_SECRET,
  callbackURL: process.env.API_URL + "/auth/bnet/return",
  region: "us",
}, function(accessToken  : string | undefined , refreshToken : string | undefined, profile : any, done: Function) {
  return done(null, {'accessToken': accessToken, 'RefreshToken': refreshToken, 'profile': profile});
}));

passport.use(new twitchStrategy({
  clientID: process.env.TWITCH_ID,
  clientSecret: process.env.TWITCH_SECRET,
  callbackURL: 'https://api.drainboard.tk/auth/twitch/return',
  scope: "user_read user:read:follows user:edit",
},
function(accessToken : string | undefined , refreshToken  : string | undefined , profile :any , done : Function) {
  return done(null, {'accessToken': accessToken, 'RefreshToken': refreshToken, 'profile': profile});
}));

passport.use(new RedditStrategy({
  clientID: process.env.REDDIT_KEY,
  clientSecret: process.env.REDDIT_SECRET,
  callbackURL: process.env.API_URL + "/auth/reddit/return",
  state:"tatatitatata",
  scope: "identity vote"
},
function(accessToken : string | undefined , refreshToken  : string | undefined , profile :any , done : Function) {
  return done(null, {'accessToken': accessToken, 'RefreshToken': refreshToken, 'profile': profile});
}));

// passport.use(new SteamStrategy({
//   returnURL: '/auth/steam/return',
//   realm: 'http://api.drainboard.tk',
//   apiKey: process.env.STEAM_KEY,
//   passReqToCallback: true
// },
// function(identifier : String, profile : any, done : Function) { 
//   return done(null, {'accessToken': identifier, 'profile': profile});
// }));

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://steamcommunity.com/oauth/login',
  tokenURL: 'https://api.steampowered.com/ISteamUserOAuth/GetTokenDetails/v1/?access_token=token',
  clientID: process.env.STEAM_KEY,
  callbackURL: process.env.API_URL + "/auth/steam/return"
},
function(accessToken :string | undefined, refreshToken :string | undefined, profile :any, done :Function) {
  return done(null, {'accessToken': accessToken, 'RefreshToken': refreshToken, 'profile': profile});
}
));


passport.use(new DiscordStrategy({
  clientID: <string>process.env.DISCORD_ID,
  clientSecret: <string>process.env.DISCORD_SECRET,
  callbackURL: process.env.API_URL + '/auth/discord/return',
  scope: [Scope.GUILDS, Scope.RPC, Scope.MESSAGES_READ],
  // scope: ['identify', 'guilds', 'guilds.members.read', 'activities.write', 'relationships.read'],
},
function(accessToken : string | undefined , refreshToken : string | undefined , profile :any, cb : any) {
  return cb(null, {'accessToken': accessToken, 'RefreshToken': refreshToken, 'profile': profile});
}));


export default passport;
