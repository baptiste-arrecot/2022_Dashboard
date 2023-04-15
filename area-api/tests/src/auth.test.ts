import { expect } from 'chai';
import request, { Response } from 'supertest';
import mongoUnit from 'mongo-unit';
import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import daoUT from '../dao';
import testData from '../data';

describe('POST /auth/register', (): void =>
{
    before(() => daoUT.init());
    beforeEach(() => mongoUnit.load(testData));
    afterEach(() => mongoUnit.drop());

    it('Missing parameter', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/register')
            .send({ badParam: 'badValue' });

        expect(response.status).to.eq(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.text).to.eq('Missing parameter');
    });

    it('Email already exist', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'test',
                username: 'test',
                email: 'admin@admin.com',
                password: 'password',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Email already exists');
    });

    it('Username already exist', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'test',
                username: 'admin',
                email: 'test@test.com',
                password: 'password',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Username already exists');
    });

    it('Register success', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'test',
                username: 'test',
                email: 'test@test.com',
                password: 'test',
            });

        expect(response.status).to.eq(StatusCodes.OK);
        expect(typeof response.body.jwt).to.eq('string');
    });

});

describe('POST /auth/login', (): void =>
{
    before(() => daoUT.init());
    beforeEach(() => mongoUnit.load(testData));
    afterEach(() => mongoUnit.drop());

    it('Missing parameter', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({ badParam: 'badValue' });

        expect(response.status).to.eq(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.text).to.eq('Missing parameter');
    });

    it('Unknown user: bad username', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                username: 'test',
                password: 'admin',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Authentication failed');
    });

    it('Unknown user: bad email', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'admin',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Authentication failed');
    });

    it('Good email, bad password', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@admin.com',
                password: 'badPassword',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Authentication failed');
    });

    it('Good username, bad password', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                username: 'admin',
                password: 'badPassword',
            });

        expect(response.status).to.eq(StatusCodes.UNAUTHORIZED);
        expect(response.text).to.eq('Authentication failed');
    });

    it('Login success', async (): Promise<void> =>
    {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                username: 'admin',
                password: 'admin',
            });

        expect(response.status).to.eq(StatusCodes.OK);
        expect(typeof response.body.jwt).to.eq('string');
    });
});

describe('Auth Functional Tests', (): void =>
{
    before(() => daoUT.init());
    beforeEach(() => mongoUnit.load(testData));
    afterEach(() => mongoUnit.drop());

    it('Register and auth protected call', async (): Promise<void> =>
    {
        const registerResponse: Response = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'New User',
                username: 'NewUser',
                email: 'NewUser@NewUser.com',
                password: 'NewUserNewUser',
            });

        expect(registerResponse.status).to.eq(StatusCodes.OK);
        expect(typeof registerResponse.body.jwt).to.eq('string');

        const meResponse: Response = await request(app)
            .get('/users/me')
            .set('Authorization', 'Bearer ' + registerResponse.body.jwt);

        expect(meResponse.status).to.eq(StatusCodes.OK);
        expect(meResponse.body.fullName).to.eq('New User');
        expect(meResponse.body.username).to.eq('NewUser');
        expect(meResponse.body.email).to.eq('NewUser@NewUser.com');
    });

    it('Register, login and auth protected call', async (): Promise<void> =>
    {
        const registerResponse: Response = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'New User',
                username: 'NewUser',
                email: 'NewUser@NewUser.com',
                password: 'NewUserNewUser',
            });

        expect(registerResponse.status).to.eq(StatusCodes.OK);
        expect(typeof registerResponse.body.jwt).to.eq('string');

        const loginResponse: Response = await request(app)
            .post('/auth/login')
            .send({
                username: 'NewUser',
                password: 'NewUserNewUser',
            });

        expect(loginResponse.status).to.eq(StatusCodes.OK);
        expect(typeof loginResponse.body.jwt).to.eq('string');

        const meResponse: Response = await request(app)
            .get('/users/me')
            .set('Authorization', 'Bearer ' + registerResponse.body.jwt);

        expect(meResponse.status).to.eq(StatusCodes.OK);
        expect(meResponse.body.fullName).to.eq('New User');
        expect(meResponse.body.username).to.eq('NewUser');
        expect(meResponse.body.email).to.eq('NewUser@NewUser.com');
    });
});
