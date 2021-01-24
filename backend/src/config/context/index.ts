import { PubSub } from 'apollo-server';

import UsuarioService from '../../app/services/UsuarioService';

const pubsub = new PubSub();

const context = async ({req, res}) => {
    return { 
        usuarioService: UsuarioService,
        pubsub
    };
};

export default context;