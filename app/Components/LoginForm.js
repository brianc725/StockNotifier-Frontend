import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity
} from 'react-native';
import styles from '../styles';
import { saveSignIn } from '../auth';
import PrimaryButton from './PrimaryButton';
import DisabledButton from '../Components/DisabledButton';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn = () => {
    saveSignIn();
    this.props.navigation.navigate('App');
  }

  validate(username, password) {
    // true if empty
    return {
      username: !username || username.length === 0,
      password: !password || password.length === 0,
    };
  }

  render() {
    const emptyInput = this.validate(this.state.username, this.state.password)

    let button;
    if (emptyInput.username || emptyInput.password) {
      button = <DisabledButton>LOG IN</DisabledButton>
    } else {
      button = <PrimaryButton onPress={this.onSignIn}>LOG IN</PrimaryButton>
    }

    return (
      <View style={styles.container}>
        <TextInput style={styles.input} 
          autoCapitalize="none" 
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(text) => this.setState({username: text})}
          autoCorrect={false} 
          keyboardType='email-address' 
          returnKeyType="next" 
          placeholder='Username'
          placeholderTextColor='rgba(0,0,0,0.5)'/>

        <TextInput style={styles.input}   
          returnKeyType="go" 
          onChangeText={(text) => this.setState({password: text})}
          ref={(input)=> this.passwordInput = input}
          placeholder='Password'
          placeholderTextColor='rgba(0,0,0,0.5)'
          secureTextEntry/>

        {button}
        
      </View>
    );
  }
}
