import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Alert, Button, StyleSheet,
  StatusBar
} from 'react-native';

export default class LoginForm extends Component {
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
                            // onPress={onButtonPress}>
                            >
                    <Text  style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input:{
    height: 40,
    width: 300,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'rgba(0,0,0,0.7)'
  },
  buttonContainer:{
      backgroundColor: '#2980b6',
      padding: 15,
      width: 300
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
});
