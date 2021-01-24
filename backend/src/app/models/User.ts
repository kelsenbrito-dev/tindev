import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document { 
    name: string,
    username: string,
    avatar: string,
    bio: string,
    likes: [Schema.Types.ObjectId],
    dislikes: [Schema.Types.ObjectId],
 }

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    avatar: { type: String },
    bio: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},{ timestamps: true });

export default model<IUser>('User', UserSchema);