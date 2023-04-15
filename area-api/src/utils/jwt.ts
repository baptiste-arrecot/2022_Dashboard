import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import { JWT_KEY } from '../app';

export type JsonWebToken = string;

export function generateJwt(user: IUser): JsonWebToken
{
    return jwt.sign({
        username: user.username,
    }, JWT_KEY, { expiresIn: '60d' });
}
