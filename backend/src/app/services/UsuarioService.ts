import { UserInputError } from 'apollo-server';
import axios from 'axios';

import User from '../models/User';

const UsuarioService = {
    
    async storeUser(username) {
        const userExists = await User.findOne({username});
        if(userExists) return userExists;

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar } = response.data;
        return await User.create({
            name,
            username,
            bio,
            avatar
        });
    },

    async storeUserLikes(_id, _idTarget, pubsub, topic) {
        const loggedDev = await User.findById({_id});
        if(!loggedDev) throw new UserInputError('Usuário inexistente.');
        
        const targetDev = await User.findById({_id: _idTarget});
        if(!targetDev) throw new UserInputError('Usuário inexistente.');

        if (targetDev.likes.includes(loggedDev._id)){
            await pubsub.publish(topic, { userMatch: loggedDev});
            await pubsub.publish('MESSAGE_UPDATED', { newMessage: {
                root: loggedDev,
                target: targetDev
                } 
            });
        }

        loggedDev.likes.push(targetDev._id);
        return await loggedDev.save();
    },

    async storeUserDislikes(_id, _idTarget) {
        const loggedDev = await User.findById({_id});
        if(!loggedDev) throw new UserInputError('Usuário inexistente.');
        
        const targetDev = await User.findById({_id: _idTarget});
        if(!targetDev) throw new UserInputError('Usuário inexistente.');

        loggedDev.dislikes.push(targetDev._id);

        return await loggedDev.save();
    },

    async getUsersInId(_ids) {
        return await User.find({
            _id: { $in: _ids }
        });
    },

    async getUsersFree(_id) {
        const loggedDev = await User.findById(_id);
        if(loggedDev){
            return await User.find({
                $and: [
                    { _id: { $ne: _id }},
                    { _id: { $nin: loggedDev.likes }},
                    { _id: { $nin: loggedDev.dislikes }}
                ]
            });
        }
        return;
    },

    async getUser(_id, pubsub) {
        const loggedDev = await User.findById(_id);
        if(loggedDev){
            await pubsub.publish('MESSAGE_UPDATED', { getUser: loggedDev });
            return loggedDev;
        }
        return;
    },

};

export default UsuarioService;