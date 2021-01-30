import React, { FormEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import './login.css';
import logo from '../assets/logo.svg';
import apollo from '../services/apollo'

interface IUser{
    storeUser: {
        _id: string,
        name: string,
        username: string,
        bio: string
    }
}

const LOGIN = gql`
    query storeUser($username: String!){
    storeUser(username: $username){
        _id name username bio avatar
        likes {
            _id name username bio 
        }
    }
}`

function Login({ history }: RouteComponentProps) {
    const [username, setUsername] = useState('kelsenbrito-dev');

    const { loading, error, data } = useQuery<IUser>(LOGIN, { variables: {
        username: username
    }});

    console.log(data);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        await apollo
        .query<IUser>({
            query: LOGIN,
            variables: {
                username: username
            }
        })
        .then(result => {
            if(result.data.storeUser){
                const { _id } = result.data.storeUser;
                history.push(`/dev/${_id}`);
            }
        })
        .catch(err => {
            throw new Error(err);
        });
    }
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input placeholder="Digite seu usuário no Github"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Login;
