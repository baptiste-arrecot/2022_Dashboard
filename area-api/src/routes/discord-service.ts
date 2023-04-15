import { Router, Request, Response } from 'express';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = 'https://discordapp.com';

const router: Router = Router();

const discordRequest = async (path: string, discordToken: string): Promise<void> => {
    return axios.get(BASE_URL + path, {
        headers: {
            Authorization: `Bearer ${discordToken}`
        }
    });
}

const discordVerifyTokenMiddleware = async (request: Request, response: Response, next: any): Promise<void> => {
    const discordToken: string | string[] | undefined = request.headers.discord_token;
    if (discordToken === undefined || typeof discordToken !== 'string') {
        response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send('Missing discordToken parameter');
        return;
    }
    next();
}

router.get('/services/discord/me/profile', discordVerifyTokenMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {   
        const discordToken: any = req.headers.discord_token;
        const discordUser: any = await discordRequest('/api/v9/users/@me', discordToken);
        res.send({
            discordUserId: discordUser.data.id,
            discordUserName: discordUser.data.username,
            discordUserAvatar: discordUser.data.avatar
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.get('/services/discord/me/guilds', discordVerifyTokenMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {   
        const discordToken: any = req.headers.discord_token;
        const discordChannels: any = await discordRequest('/api/v9/users/@me/guilds', discordToken);
        res.send(discordChannels.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.get('/services/discord/me/dm', discordVerifyTokenMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const discordToken: any = req.headers.discord_token;
        const discordFriends: any = await discordRequest('/api/v9/users/@me/channels', discordToken);
        res.send(discordFriends.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
});

router.get('/services/discord/guilds/:guildId/channels', discordVerifyTokenMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const discordToken: any = req.headers.discord_token;
        const guildId: string = req.params.guildId;
        console.log(guildId);
        const discordChannels: any = await discordRequest(`/api/v9/guilds/${guildId}/channels`, discordToken);
        res.send(discordChannels.data);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
});
export default router;