const express = require('express');
import { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeAuth from './routes/authentication';
import routeService from './routes/service';
import routeDiscordService from './routes/discord-service';
import passport from './passport-setup';
import dotenv from 'dotenv';

const session = require('express-session');

const app: Express = express();

dotenv.config();

export const PORT: string = process.env.PORT ??  '8080';
export const DB_ACCESS: string | undefined = process.env.DATABASE_ACCESS;
export const JWT_KEY: string = process.env.JWT_SECRET ?? '';

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true})
);
app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user : any, done : any) {
    done(null, user);
});
passport.deserializeUser(function(obj : any, done : any) {
    done(null, obj);
});

app.use('/', routeAuth);
app.use('/', routeService);
app.use('/', routeDiscordService);

export default app;