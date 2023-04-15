import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModels';
import { IUser } from '../types/user';
import { generateJwt } from '../utils/jwt';
import { sanitizeUser } from '../utils/user';
import { Auth } from '../types/auth';
import passport from '../passport-setup';
import { IService } from '../types/service';
import { authenticateJWT } from '../middleware/auth';


const router: Router = Router();
    

router.post('/auth/login', async (request: Request, response: Response): Promise<void> => 
{
    const username: string | undefined = request.body.username;
    const email: string | undefined = request.body.email;
    const password: string | undefined = request.body.password;
    const isGoogleAuth: boolean | undefined = request.body.isGoogleAuth;
    
    if ((username === undefined && email === undefined) ||
    password === undefined || isGoogleAuth === undefined) {
        response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send('Missing parameter');
        return;
    }
    let foundUser: (IUser & { _id: number; }) | null = await UserModel.findOne(
        username
        ? { username: username }
        : { email: email }
        ).exec();
        
        if (foundUser === null) {
            response
            .status(StatusCodes.UNAUTHORIZED)
            .send('Authentication failed');
            return;
        }
        
        const passwordValid: Boolean = bcrypt.compareSync(password, foundUser.password);
        
        if (passwordValid === false) {
            response
            .status(StatusCodes.UNAUTHORIZED)
            .send('Authentication failed');
            return;
    }
    const jwt: string = generateJwt(foundUser);
    foundUser = await UserModel.findOneAndUpdate({username: request.body.username},
        {jwt: jwt}
    );
    if (foundUser != null) {
        response.send({ jwt: jwt, user: sanitizeUser(foundUser) });
    } else {
        response.status(500).send('Internal Server Error');
    }
});

router.post('/auth/register', async (request: Request, response: Response): Promise<void> => 
{
    if (request.body.username === undefined ||
        request.body.password === undefined ||
        request.body.isGoogleAuth === undefined) {
            response
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .send('Missing parameter');
            return;
        }
        
        const foundUsernameUser: (IUser & { _id: number; }) | null = await UserModel.findOne(
            { username: request.body.username }
            ).exec();
            
            if (foundUsernameUser !== null && foundUsernameUser.isGoogleAuth === request.body.isGoogleAuth) {
                response
                .status(StatusCodes.UNAUTHORIZED)
                .send('Username already exists');
                return;
            }
            
            const saltPassword: string = await bcrypt.genSalt(10);
            const securePassword: string = await bcrypt.hash(request.body.password, saltPassword);
            
            try {
                let newUser: IUser | null = await UserModel.create({
                    username: request.body.username,
                    password: securePassword,
                    date: Date.now(),
                    jwt: '',
                    isGoogleAuth: request.body.isGoogleAuth,
                    services: []
                });
                const jwt: string = generateJwt(newUser);
                newUser = await UserModel.findOneAndUpdate({username: request.body.username},
                    {jwt: jwt}
                );
                if (newUser != null) {
                    response.send({ jwt: jwt, user: sanitizeUser(newUser) });
                } else {
                    response.status(500).send('Internal Server Error');
                }
            } catch (error) {
                response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(error);
            }
});

router.get('/auth/steam', 
// authenticateJWT,
passport.authenticate('oauth2', { failureRedirect : '/error'}));

router.get('/auth/steam/return',  (req, res) => {    
    passport.authenticate('steam', ((auth: Auth) => {
        res.redirect('http://localhost:3000/auth_callback?accessToken=' + auth.accessToken);
    }))(req, res)
});

router.get('/auth/twitch',
    passport.authenticate("twitch", { failureRedirect: '/error' })
);

router.route('/auth/twitch/return').get(((req :Request, res :Response) => {

    passport.authenticate('twitch', (async (err :any, auth: Auth) => {
        res.redirect('http://localhost:3000/auth_callback?accessToken=' + auth.accessToken + '&refreshToken=' + auth.RefreshToken);
    }))(req, res);
}));

router.get('/auth/discord',
    passport.authenticate("discord", { failureRedirect: '/error' })
);

router.route('/auth/discord/return').get(((req :Request, res :Response) => {
    passport.authenticate('discord', (async (err :any, auth: any) => {
        res.redirect('http://localhost:3000/auth_callback?accessToken=' + auth.accessToken + '&refreshToken=' + auth.RefreshToken + '&username=' + auth.profile?.username);
    }))(req, res);
}));

router.get('/auth/reddit', 
    passport.authenticate("reddit", { failureRedirect: '/error' })
);

router.route('/auth/reddit/return').get(((req :Request, res :Response) => {
    passport.authenticate('reddit', (async (err :any, auth: Auth) => {
        res.redirect('http://localhost:3000/auth_callback?accessToken=' + auth.accessToken + '&username=' + auth.profile?.name);
    }))(req, res);
}));

router.get('/auth/bnet',
    passport.authenticate("bnet", { failureRedirect: '/error' })
);

router.route('/auth/bnet/return').get(((req :Request, res :Response) => {

    passport.authenticate('bnet', (async (err :any, auth: Auth) => {
        res.redirect('http://localhost:3000/auth_callback?accessToken=' + auth.accessToken + '&refreshToken=' + auth.RefreshToken +'&username=' + auth.profile?.battletag);
    }))(req, res);
}));

router.get('/error', function(req, res) {
    res.send('INTERNAL ERROR IN AUTHENTICATION');
})

            
export default router;
            