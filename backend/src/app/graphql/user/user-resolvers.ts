
import channel from '../../channel';

export default {
    User: {
        likes: async (user, __, { usuarioService }) => await usuarioService.getUsersInId(user.likes),
        dislikes: async (user, __, { usuarioService }) => await usuarioService.getUsersInId(user.dislikes)
    },

    Query: {
        storeUser: async (_, { username }, { usuarioService }) => {
            return  await usuarioService.storeUser(username);
        },

        storeUserLikes: async (_, { _id, _idTarget }, { usuarioService, pubsub }) => {
            return  await usuarioService.storeUserLikes(_id, _idTarget, pubsub, channel.USER_MATCH);
        },

        storeUserDislikes: async (_, { _id, _idTarget }, { usuarioService }) => {
            return  await usuarioService.storeUserDislikes(_id, _idTarget);
        },

        getUsersFree: async (_, { _id }, { usuarioService }) => {
            return  await usuarioService.getUsersFree(_id);
        },
    },

    Subscription: {
        userMatch: {
            subscribe: (_, args, { pubsub }) => pubsub.asyncIterator([channel.USER_MATCH]),
        },
    }
};