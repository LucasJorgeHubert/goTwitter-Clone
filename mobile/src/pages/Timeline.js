import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import socket from 'socket.io-client'

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

import Tweet from '../components/Tweet';

// import styles from './styles';

export default class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Início",
        headerRight: (<TouchableOpacity onPress={() => navigation.navigate('New')}><Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4bb0ee" /></TouchableOpacity>)
    })

    state = {
        tweets: []
    };
    /**Chamada dos eventos socket para atualização automática e chamada dos dados da API */
    async componentDidMount() {

        this.subscribeToEvents();
        const response = await api.get('/tweets');

        this.setState({ tweets: response.data });
    };
    /**Socket para atualização por evento */
    subscribeToEvents = () => {
        /**Insira o IP da maquina que está sendo utilizada como base de dados */
        const io = socket('http://192.168.1.101:5000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        });
        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet) })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.tweets} keyExtractor={tweet => tweet._id} renderItem={({ item }) => <Tweet tweet={item} />} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
