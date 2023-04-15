import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { JWT_KEY } from '../app';
import { JsonWebToken } from '../utils/jwt';
import UserModel from '../models/UserModels';
import { IUser } from '../types/user';

export async function authenticateJWT(request: Request, response: Response, next: NextFunction): Promise<void>
{
    const authHeader: string | undefined = request.headers.authorization;
    
    if (authHeader === undefined) {
        response
        .status(StatusCodes.UNAUTHORIZED)
        .send('Missing authorization header');
        return;
    }
    
    const splittedAuthHeader: string[] = authHeader.split(' ');

    if (splittedAuthHeader.length < 1) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('Malformed authorization header');
        return;
    }

    const token: JsonWebToken = splittedAuthHeader[1];

    try {
        const decoded: string | JwtPayload = jwt.verify(token, JWT_KEY);
        const username: string = typeof decoded === 'string' ? JSON.parse(decoded).username : decoded.username;

        const foundUser: (IUser & { _id: number; }) | null = await UserModel.findOne(
            { username: username }
        ).exec();

        if (foundUser === null) {
            response
                .status(StatusCodes.UNAUTHORIZED)
                .send('Unknown user');
            return;
        }

        request.body.currentUser = foundUser;
        next();
    } catch (error) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('Bad JWT');
    }
}