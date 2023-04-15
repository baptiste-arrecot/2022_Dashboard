import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'dotenv/config';
import app, {JWT_KEY, DB_ACCESS} from './app';

var fs = require('fs');
var http = require('http');
var https = require('https');

const privateKey = fs.readFileSync('sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
const ca = fs.readFileSync('sslcert/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

dotenv.config();

const server = (): number =>
{
    if (JWT_KEY === '') {
        console.error('Please define JWT_KEY');
        return 84;
    }

    if (DB_ACCESS === undefined) {
        console.error('Please define DATABASE_ACCESS');
        return 84;
    }

    mongoose.connect(DB_ACCESS)
        .then((): void =>
        {
            console.log('MongoDB connection success');
        }).catch((error): void =>
        {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
            process.exit(84);
        });

    const args = process.argv.slice(2);
    if (args.length !== 0) {
        let num = parseInt(args[0], 10);
        app.set('port', num);
    }
    app.listen(app.get('port'));
    console.log(
        'Api is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('Press CTRL-C to stop\n');

    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(credentials, app);

    httpServer.listen(80);
    httpsServer.listen(443);

    return 0;
};

((): void =>
{
    try {
        server();
    } catch (error) {
        console.error(error);
    }
})();

export default server;