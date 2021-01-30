import React from 'react';
import { View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

const LOGIN = gql`
    query storeUser($username: String!){
    storeUser(username: $username){
        _id name username bio avatar
        likes {
            _id name username bio 
        }
    }
}`

function Auth({ navigation }){
    const username = navigation.getParam('username');

    const { loading, data } = useQuery(LOGIN,{variables: { username }});
    if (loading) return <View></View>;

    if(data.storeUser){
        const { _id } = data.storeUser;
        AsyncStorage.setItem('user', _id);
        navigation.navigate('Dev', { user: _id });
    }

    return (
        <View/>
    );
}

export default Auth;