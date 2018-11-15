import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons'

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, AsyncStorage } from 'react-native';
import api from '../services/api';

// import styles from './styles';

export default class NewTweet extends Component {
    /**Opção para não renderizar o cabeçalho padrão da aplicação */
    static navigationOptions = {
        header: null
    };
    state = {
        newTweet: ""
    };
    /**Função para retornar a página anterior */
    goBack = () => {
        this.props.navigation.pop();
    }
    /**Postagem do conteúdo do tweet na base de dados da API */
    handleNewTweet = async () => {
        const content = this.state.NewTweet;
        const author = await AsyncStorage.getItem('@goTwitter:username')

        await api.post('tweets', { content, author });
        /**Reutilização da função goBack() */
        this.goBack();
    }

    handleInputChange = newTweet => {
        this.setState({ newTweet })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goBack}> <Icon name="close" size={24} color="#4bb0ee" /></TouchableOpacity>>
                    <TouchableOpacity onPress={this.handleNewTweet} style={styles.button}> <Text style={styles.buttonText}>Tweetar</Text> </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.Text}
                    multiline
                    placeholder="O que está acontecendo?"
                    value={this.state.newTweet}
                    onChangeText={this.handleInputChange}
                    placeholderTextColor="#999"
                    returnKeyType="send"
                    onSubmitEditing={this.handleNewTweet} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: "#4BB0EE",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        margin: 20,
        fontSize: 16,
        color: "#333"
    }
});
