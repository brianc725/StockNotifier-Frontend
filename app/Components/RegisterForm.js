import React, { Component } from 'react';
import {
  View, TextInput
} from 'react-native';
import styles from '../styles';
import PrimaryButton from './PrimaryButton';
import FloatingLabelInput from './FloatingLabelInput';

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      passwordAgain: undefined,
      touched: {
        username: false,
        password: false,
        passwordAgain: false
      }
    };
  }

  validate(username, password, passwordAgain) {
    // true if empty
    return {
      username: !username || username.length === 0,
      password: !password || password.length === 0,
      passwordAgain: !passwordAgain || password !== passwordAgain
    };
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const badInput = this.validate(
      this.state.username, this.state.password, this.state.passwordAgain);

    const shouldMarkError = (field) => {
      const hasError = badInput[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const disableRegisterButton = badInput.email || badInput.password || badInput.passwordAgain;

    return (
      <View style={styles.container}>
        <FloatingLabelInput label={'Username'}
          style={shouldMarkError('username') ? styles.badInput : styles.input} 
          autoCapitalize="none" 
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(text) => this.setState({username: text})}
          onBlur={this.handleBlur('username')}
          autoCorrect={false} 
          keyboardType='email-address'
          returnKeyType="next" 
          // placeholder='Username'
          // placeholderTextColor='rgba(0,0,0,0.5)'
          />

        <TextInput style={shouldMarkError('password') ? styles.badInput : styles.input}   
          returnKeyType="next"
          onSubmitEditing={() => this.passwordAgainInput.focus()} 
          onChangeText={(text) => this.setState({password: text})}
          onBlur={this.handleBlur('password')}
          ref={(input) => this.passwordInput = input} 
          placeholder='Password'
          placeholderTextColor='rgba(0,0,0,0.5)'
          secureTextEntry/>

        <TextInput style={shouldMarkError('passwordAgain') ? styles.badInput : styles.input}
          returnKeyType="go" 
          onChangeText={(text) => this.setState({passwordAgain: text})}
          onFocus={this.handleBlur('passwordAgain')}
          ref={(input) => this.passwordAgainInput = input}
          placeholder='Password again'
          placeholderTextColor='rgba(0,0,0,0.5)'
          secureTextEntry/>

        <PrimaryButton onPress={this.onSignIn}
          disabled={disableRegisterButton}>
          Sign Up
        </PrimaryButton>
        
      </View>
    );
  }
}
