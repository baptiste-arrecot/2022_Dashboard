import { Document } from 'mongoose';
import { IService } from './service';

export interface IUser extends Document
{
    username: string;
    password: string;
    date: Date;
    jwt: string;
    isGoogleAuth: boolean;
    services: IService[];
}

export interface ISanitizedUser
{
    username: string;
    date: Date;
    services: IService[];
}