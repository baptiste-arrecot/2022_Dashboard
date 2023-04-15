import { IUser, ISanitizedUser } from '../types/user';

export function sanitizeUser(user: IUser): ISanitizedUser
{
    return {
        username: user.username,
        date: user.date,
        services: user.services
    }
}