import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModels';
import { IUser } from '../types/user';
import { IService } from '../types/service';
import axios, { AxiosResponse } from 'axios';

const router: Router = Router();

router.get('/services', authenticateJWT, async (request: Request, response: Response): Promise<void> => 
{
    const user: IUser = request.body.currentUser;

    if (!user){
        response.status(StatusCodes.UNAUTHORIZED).send();
        return;
    }
    response
        .status(StatusCodes.OK)
        .send({ services: user.services });
});

router.post('/services', authenticateJWT, async (request: Request, response: Response): Promise<void> =>
{
    const user: IUser = request.body.currentUser;
    const services: [IService] = request.body.services;
    try {
        const updatedUser: (IUser & { _id: number; }) | null = await UserModel
            .findOneAndUpdate({ username: user.username }, { services: services }, { new: true });

        if (updatedUser === null) {
            response
                .status(StatusCodes.NOT_FOUND)
                .send(`User not found: ${user.username}`);
            return;
        }

        response
            .status(StatusCodes.OK)
            .send({ services: user.services });
    }
    catch (error) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(error);
    }

});

router.get('/services/Twitch/topstreams/:game_id/:search', async (request: Request, response: Response): Promise<void> => 
{
    if (request.params.search === 'undefined') {
        var params = (request.params.game_id === 'undefined') ? "" : "?game_id=" + request.params.game_id;
    } else {
        var params = (request.params.game_id === 'undefined') ? "?user_login=" + request.params.search : "?game_id=" + request.params.game_id + "&user_login=" + request.params.search;
    }
    axios.request({
        headers: {
            'Authorization': 'Bearer sin4oz0io6ocxhcuemvklrd2tnzrzb',
            'Client-Id': 'qvry17611kqqt3a6l0dzg5z753havo'
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/streams' + params,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/stream/:user_id', async (request: Request, response: Response): Promise<void> => 
{
    var params = (request.params.user_id === 'undefined') ? "" : "?user_id=" + request.params.user_id;
    axios.request({
        headers: {
            'Authorization': 'Bearer sin4oz0io6ocxhcuemvklrd2tnzrzb',
            'Client-Id': 'qvry17611kqqt3a6l0dzg5z753havo'
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/streams' + params,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/topgames/', async (request: Request, response: Response): Promise<void> => 
{
    axios.request({
        headers: {
            'Authorization': 'Bearer sin4oz0io6ocxhcuemvklrd2tnzrzb',
            'Client-Id': 'qvry17611kqqt3a6l0dzg5z753havo'
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/games/top',
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/user/:user_id', async (request: Request, response: Response): Promise<void> => 
{
    var user_id: string = request.params.user_id;

    axios.request({
        headers: {
            'Authorization': 'Bearer sin4oz0io6ocxhcuemvklrd2tnzrzb',
            'Client-Id': 'qvry17611kqqt3a6l0dzg5z753havo'
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users?id=' + user_id,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/followedusers/:user_id', async (request: Request, response: Response): Promise<void> => 
{
    var user_id: string = request.params.user_id;

    axios.request({
        headers: {
            'Authorization': 'Bearer sin4oz0io6ocxhcuemvklrd2tnzrzb',
            'Client-Id': 'qvry17611kqqt3a6l0dzg5z753havo'
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users/follows?first=25&from_id=' + user_id,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/myprofile/:user_token', async (request: Request, response: Response): Promise<void> => 
{
    var token: string = request.params.user_token;

    if (!token || token === 'undefined') {
        response
        .status(StatusCodes.UNAUTHORIZED)
        .send(`User access token not available`);
        return;
    }
    axios.request({
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': process.env.TWITCH_ID ?? ""
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users',
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/Twitch/followedstreams/:user_token/:user_id', async (request: Request, response: Response): Promise<void> => 
{
    var token: string = request.params.user_token;
    var user_id: string = request.params.user_id;

    if (!token || token === 'undefined') {
        response
        .status(StatusCodes.UNAUTHORIZED)
        .send(`User access token not available`);
        return;
    }
    axios.request({
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': process.env.TWITCH_ID ?? ""
        },
        method: 'GET',
        url: 'https://api.twitch.tv/helix/streams/followed?user_id=' + user_id,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.post('/services/Twitch/update_description/:user_token', async (request: Request, response: Response): Promise<void> => 
{
    var token: string = request.params.user_token;
    var new_description: string = request.body.new_description;

    if (!token || token === 'undefined') {
        response
        .status(StatusCodes.UNAUTHORIZED)
        .send(`User access token not available`);
        return;
    }
    axios.request({
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': process.env.TWITCH_ID ?? "",
        },
        method: 'PUT',
        url: 'https://api.twitch.tv/helix/users?description=' + new_description,
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});

router.get('/services/bnet/searchCards', async (request: Request, response: Response): Promise<void> => {
    const searchQuery: string | any | undefined = request.query?.search;
    const accessToken: string | any | undefined = request.query?.accessToken;

    if (searchQuery === undefined) {
        response.status(404).send({ message: 'Search query not found'});
        return;
    }
    if (accessToken === undefined) {
        response.status(404).send({ message: 'Bnet AccessToken not found'});
        return;
    }
    
    axios.get('https://eu.api.blizzard.com/hearthstone/cards?locale=fr_FR&textFilter=' + searchQuery + '&access_token=' + accessToken).then((searchResults : AxiosResponse | undefined) => {
        if (searchResults === undefined || searchResults === null) {
            response.status(404).send({ message: 'Card not found'});
            return;
        }
        response.status(200).send(searchResults?.data?.cards);
    }).catch(err => {console.error(err);response.status(404).send({ message: 'Card not found'});});
});

router.get('/services/bnet/wowprofile', async (request: Request, response: Response): Promise<void> => {
    const accessToken: string | any | undefined = request.query?.accessToken;

    if (accessToken === undefined) {
        response.status(404).send({ message: 'Bnet AccessToken not found'});
        return;
    }
    axios.get('https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=fr_FR&access_token=' + accessToken).then((WoWProfile : AxiosResponse | undefined) => {
        if (WoWProfile === undefined || WoWProfile === null) {
            response.status(404).send({ message: 'Profile not found'});
            return;
        }
        response.status(200).send(WoWProfile?.data);
    }).catch(err => {response.status(404).send({ message: 'Profile not found'});});
    
});

router.get('/services/bnet/SC2Ladder', async (request: Request, response: Response): Promise<void> => {
    const accessToken: string | any | undefined = request.query?.accessToken;

    if (accessToken === undefined) {
        response.status(401).send({ message: 'Bnet AccessToken not found'});
        return;
    }

    axios.get('https://eu.api.blizzard.com/sc2/ladder/grandmaster/2?access_token=' + accessToken).then((SC2Ladder : AxiosResponse | undefined) => {
        if (SC2Ladder === undefined || SC2Ladder === null) {
            response.status(404).send({ message: 'Ladder not found'});
            return;
        }
        response.status(200).send(SC2Ladder?.data);
    }).catch(err => {console.error(err);response.status(404).send({ message: 'Ladder not found'});});
    
});

router.get('/services/reddit/searchSubreddit', async (request: Request, response: Response): Promise<void> => {
    const search: string | any | undefined = request.query?.search;
    const filter: string | any | undefined = request.query?.filter;

    if (search === undefined) {
        response.status(401).send({ message: 'search not found'});
        return;
    }

    axios.get('https://www.reddit.com/r/' + search + '/' + filter + '.json').then((RedditFeed : AxiosResponse | undefined) => {
        if (RedditFeed === undefined || RedditFeed === null) {
            response.status(404).send({ message: 'RedditFeed not found'});
            return;
        }
        response.status(200).send(RedditFeed?.data);
    }).catch(err => {console.error(err);response.status(404).send({ message: 'RedditFeed not found'});});
    
});

router.get('/services/reddit/Profile', async (request: Request, response: Response): Promise<void> => {
    const accessToken: string | any | undefined = request.query?.accessToken;

    if (accessToken=== undefined) {
        response.status(401).send({ message: 'Reddit accessToken not found'});
        return;
    }

    axios.request({
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        method: 'get',
        url : 'https://oauth.reddit.com/api/v1/me',

    }).then((RedditProfile : AxiosResponse | undefined) => {
        if (RedditProfile === undefined || RedditProfile === null) {
            response.status(404).send({ message: 'RedditProfile not found'});
            return;
        }
        response.status(200).send(RedditProfile?.data);
    }).catch(err => {console.error(err);response.status(404).send({ message: 'RedditProfile not found'});});
    
});

router.post('/services/reddit/vote', async (request: Request, response: Response): Promise<void> => {
    const accessToken: string | any | undefined = request.query?.accessToken;
    const vote: string | any | undefined = request.query?.dir;
    const postID: string | any | undefined = request.query?.postID;


    if (accessToken === undefined) {
        response.status(401).send({ message: 'Reddit AccessToken not found'});
        return;
    }
    if (postID === undefined) {
        response.status(401).send({ message: 'Post not found'});
        return;
    }

    axios.request({
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        method: 'post',
        url : 'https://oauth.reddit.com/api/vote',
        params: {
            id: 't3_' + postID,
            dir: vote,
        }
    }).then((Reddit : AxiosResponse | undefined) => {
        if (Reddit === undefined || Reddit === null) {
            response.status(500).send({ message: 'Something went wrong'});
            return;
        }
        response.status(200).send({message: 'OK'});
    }).catch(console.error);
    
});
/*
router.get('/services/Github/callback/', async (request: Request, response: Response): Promise<void> => 
{
    const code: any = request.query.code;

    if (typeof code !== 'string') {
        response
            .status(StatusCodes.BAD_REQUEST)
            .send('KO');
        return;
    }

    axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        url: `${process.env.GITHUB_AUTH_ENDPOINT}access_token/`,
        params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code: code,
        }
    }).then((result: AxiosResponse<any>) =>
    {
        response.send(result.data);
    }).catch(error =>
    {
        response.send(error);
    });
});
*/

export default router;