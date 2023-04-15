import { Request } from '@types/express';

type profileBnet = {
    sub: string,
    id :number,
    battletag: string,
    provider: string,
    token: string,
    name: string
}

type profileReddit = {
    sub: string,
    id :number,
    name: string
    provider: string,
    token: string,
}

export type Auth =
{
    accessToken: string;
    RefreshToken: string;
    profile: profileBnet;
}
