import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Alert, Button, StyleSheet,
  StatusBar
} from 'react-native';
import styles from '../styles';
import { saveSignIn } from '../auth';

export default class LoginForm extends Component {

  onSignIn = () => {
    saveSignIn();
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Username'
               placeholderTextColor='rgba(0,0,0,0.5)'/>

        <TextInput style = {styles.input}   
                      returnKeyType="go" 
                      ref={(input)=> this.passwordInput = input} 
                      placeholder='Password'
                      placeholderTextColor='rgba(0,0,0,0.5)'
                      secureTextEntry/>

        <TouchableOpacity style={styles.buttonContainer} 
                            onPress={this.onSignIn}>
                    <Text  style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
