import mongoose from 'mongoose';
import UserModel from '../src/models/UserModels';

export = {
    init: () =>
    {
        const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

        if (DATABASE_URL === undefined) {
            console.log('Please specify DATABASE_URL');
            return;
        }

        mongoose.connect(DATABASE_URL).then((): void =>
        {
            console.log('MongoDB connection success');
        }).catch((error): void =>
        {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
            process.exit(84);
        });
    },
    close: () => mongoose.disconnect(),
    User: UserModel,
};