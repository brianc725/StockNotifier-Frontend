import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity
} from 'react-native';
import styles from '../styles';
import Button from './PrimaryButton';
import DisabledButton from '../Components/DisabledButton';

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
    
    let registerButton;
    if (disableRegisterButton) {
      registerButton = <DisabledButton>REGISTER</DisabledButton>
    } else {
      registerButton = <PrimaryButton>REGISTER</PrimaryButton>
    }

    return (
      <View style={styles.container}>
        <TextInput style={shouldMarkError('username') ? styles.badInput : styles.input} 
          autoCapitalize="none" 
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(text) => this.setState({username: text})}
          onBlur={this.handleBlur('username')}
          autoCorrect={false} 
          keyboardType='email-address'
          returnKeyType="next" 
          placeholder='Username'
          placeholderTextColor='rgba(0,0,0,0.5)'
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

        {registerButton}

        <TouchableOpacity style={styles.secondaryButtonContainer}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>GO TO LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
