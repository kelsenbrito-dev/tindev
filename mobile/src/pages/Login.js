import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';

function Login({ navigation }){
    const [user, setUser] = useState('kelsenbrito-dev')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) navigation.navigate('Dev', { user });
        });
    }, [])

    async function handleLogin(){
        navigation.navigate('Auth', { username: user });
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