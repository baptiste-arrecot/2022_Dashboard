import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user';
import { IService } from '../types/service';

const ServiceSchema = new Schema<IService>({
    id: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: String,
        required: false,
    }
});

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    jwt: {
        type: String,
        required: false
    },
    isGoogleAuth: {
        type: Boolean,
        required: true
    },
    services: [ServiceSchema]
});

export default mongoose.model<IUser>('mytable', UserSchema);
