import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import graphql from './app/graphql';
import config from './config';

const createServer = async () => {

    try {
        dotenv.config();

        // concexão com o banco de dados
        mongoose.connect(process.env.DATABASE_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        
        const db = mongoose.connection;
        db.on('error', (err) => console.log(err));
        db.on('open', () => console.log('Database connected!'));
        
        // confirguração do apollo server
        const server = new ApolloServer({ 
            ...graphql,
            ...config,
        });

        // inicia a aplicação na porta 4000
        server.listen(4000, () =>
            console.log(
                `🚀 Server ready at http://localhost:4000/graphql`
            )
        )
    } catch (error) {
        console.log(error)
    }
};

createServer();