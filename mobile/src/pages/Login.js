import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { gql } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';
import apollo from '../services/apollo';

const LOGIN = gql`
    query storeUser($username: String!){
    storeUser(username: $username){
        _id name username bio avatar
        likes {
            _id name username bio 
        }
    }
}`

function Login({ navigation }){
    const [user, setUser] = useState('kelsenbrito-dev')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) navigation.navigate('Dev', { user });
        });
    }, [])

    async function handleLogin(){
        await apollo
        .query({
            query: LOGIN,
            variables: {
                username: user
            }
        })
        .then(async (result) => {
            if(result.data.storeUser){
                const { _id } = result.data.storeUser;
                await AsyncStorage.setItem('user', _id);
                navigation.navigate('Dev', { user: _id });
            }
        })
        .catch(err => {
            throw new Error(err);
        });
    }   

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Image style={styles.logo} source={logo} />

            <TextInput style={styles.input} 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#999" 
                value={user}
                onChangeText={setUser}
                />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

});