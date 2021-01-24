import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { gql } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import apollo from '../services/apollo';

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

function Dev({ navigation }){
    apollo.resetStore();
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            async function loadUsers(){
                await apollo
                .query({
                    query: GETUSERSFREE,
                    variables: { _id: id }
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
            loadUsers();    
        } catch (err) {
            throw new Error(err);
        }
        
    }, [id]);

    async function handleDislike(){
        const [{ _id }, ...rest] = users;
        await apollo
            .query({
                query: USERDISLIKES,
                variables: { _id: id, _idTarget: _id }
            })
            .then(result => {
                if(result.data.storeUserDislikes){
                    setUsers(rest);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    async function handleLike(){
        const [{ _id }, ...rest] = users;
        await apollo
            .query({
                query: USERLIKES,
                variables: { _id: id, _idTarget: _id }
            })
            .then(result => {
                if(result.data.storeUserLikes){
                    setUsers(rest);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    }
    
    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer} >
                { users.length === 0 
                    ? <Text style={styles.empty}>Acabou :(</Text>
                    : ( 
                        users.map((user, index) => (
                        <View style={[styles.card, { zIndex: users.length - index }]} key={user._id}>
                            <Image style={styles.avatar} source={{ uri: user.avatar}} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
            
            { users.length > 0 &&
                (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity  style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
                )
            }
            

        </SafeAreaView>
    );
}

export default Dev;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        marginTop: 30,
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f5f5f5',
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

})