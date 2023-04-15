import mongoUnit from 'mongo-unit';
import dao from './dao';

mongoUnit.start()
    .then((): void =>
    {
        const mongoUnitUrl: string = mongoUnit.getUrl();
        console.log('MongoDB Memory Server is running: ', mongoUnitUrl);
        process.env.DATABASE_URL = mongoUnitUrl;
        run(); // this line start mocha tests
    });

after((): Promise<void> =>
{
    console.log('MongoDB Memory Server is stopped');
    dao.close();
    return mongoUnit.stop();
});