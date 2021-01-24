import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { gql } from '@apollo/client';

import './dev.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import apollo from '../services/apollo'

type TParams = { id: string };

interface IUser {
    _id: string,
    name: string,
    username: string,
    bio: string
    avatar: string,
    likes: [IUser]
    dislikes: [IUser]
}

const GETUSERSFREE = gql`
    query getUsersFree($_id: ID!){
        getUsersFree(_id: $_id){
            _id name username bio avatar
            likes {
                _id name username bio avatar
            }
            dislikes {
                _id name username bio avatar
            }
    }
}`

const USERLIKES = gql`
    query storeUserLikes($_id: ID!, $_idTarget: ID!){
        storeUserLikes(_id: $_id, _idTarget: $_idTarget){
            _id name username bio avatar
    }
}`

const USERDISLIKES = gql`
    query storeUserDislikes($_id: ID!, $_idTarget: ID!){
        storeUserDislikes(_id: $_id, _idTarget: $_idTarget){
            _id name username bio avatar
    }
}`

function Dev ({match}: RouteComponentProps<TParams>) {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        async function loadUsers(_id: string){
            await apollo
            .query({
                query: GETUSERSFREE,
                variables: { _id: _id }
            })
            .then(result => {
                if(result.data.getUsersFree){
                    setUsers(result.data.getUsersFree);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
        }
        loadUsers(match.params.id);
    }, [match.params.id]);

    async function handleLike(_idTarget: string){
        await apollo
            .query({
                query: USERLIKES,
                variables: { _id: match.params.id, _idTarget: _idTarget }
            })
            .then(result => {
                if(result.data.storeUserLikes){
                    setUsers(users.filter(user => user._id !== _idTarget));
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    }
    async function handleDislike(_idTarget: string){
        await apollo
            .query({
                query: USERDISLIKES,
                variables: { _id: match.params.id, _idTarget: _idTarget }
            })
            .then(result => {
                if(result.data.storeUserDislikes){
                    setUsers(users.filter(user => user._id !== _idTarget));
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? (
                <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                        <button type="button" onClick={() => handleDislike(user._id)}>
                            <img src={dislike} alt=""/>
                        </button>
                        <button type="button" onClick={() => handleLike(user._id)}>
                            <img src={like} alt=""/>
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
        </div>
    );
}

export default Dev;
