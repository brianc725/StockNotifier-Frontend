import React, { Component } from 'react';
import {
  View, TextInput, Text, Animated
} from 'react-native';
import styles from '../styles';
import PrimaryButton from './PrimaryButton';

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: "",
        password: "",
        passwordAgain: "",
      },
      touched: {
        username: false,
        password: false,
        passwordAgain: false
      },
      focused: {
        username: false,
        password: false,
        passwordAgain: false
      },
      slidingAnims: {
        username: new Animated.Value(0),
        password: new Animated.Value(0),
        passwordAgain: new Animated.Value(0),
      }
    };
  }

  validate(username, password, passwordAgain) {
    // true if empty
    return {
      username: username.length === 0,
      password: password.length === 0,
      passwordAgain: passwordAgain.length === 0 || password !== passwordAgain
    };
  }

  handleBlur = (field) => (evt) => {
    if (this.state.fields[field].length === 0) {
      Animated.timing(
        this.state.slidingAnims[field],
        {
          toValue: 0,
          duration: 200,
        }
      ).start();
    }
    this.setState({
      touched: { ...this.state.touched, [field]: true },
      focused: { ...this.state.focused, [field]: false },
    });
  }

  handleFocus = (field) => (evt) => {
    Animated.timing(
      this.state.slidingAnims[field],
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
    this.setState({
      focused: { ...this.state.focused, [field]: true },
    });
  }

  labelStyle(field) {
    const top = this.state.slidingAnims[field].interpolate({
      inputRange: [0, 1],
      outputRange: [30, 10],
    });

    const fontSize = this.state.slidingAnims[field].interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    });

    return {
      position: 'absolute',
      left: 0,
      top: top,
      fontSize: fontSize,
      color: 'rgba(0,0,0,0.5)'
    };
  }

  errmsg(field, code) {
    switch (code) {
      case 0: return null;
      default: return "input error in " + field;
    }
  }

  render() {
    const badInput = this.validate(
      this.state.fields['username'],
      this.state.fields['password'],
      this.state.fields['passwordAgain']
    );

    const shouldMarkError = (field) => {
      const hasError = badInput[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <View style={styles.container}>
        <View style={styles.floatingLabelInputContainer}>
          <Animated.Text style={this.labelStyle('username')}>
            Username
          </Animated.Text>
          <TextInput
            style={shouldMarkError('username') ? styles.badInput : styles.input}
            autoCapitalize="none" 
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={(text) => this.setState({fields: {...this.state.fields, username: text}})}
            onBlur={this.handleBlur('username')}
            onFocus={this.handleFocus('username')}
            autoCorrect={false} 
            keyboardType='email-address'
            returnKeyType="next" 
          />
          <Text style={styles.errmsg}>{this.errmsg('username', 0)}</Text>
        </View>

        <View style={styles.floatingLabelInputContainer}>
          <Animated.Text style={this.labelStyle('password')}>
            Password
          </Animated.Text>
          <TextInput
            style={shouldMarkError('password') ? styles.badInput : styles.input}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordAgainInput.focus()} 
            onChangeText={(text) => this.setState({fields: {...this.state.fields, password: text}})}
            onBlur={this.handleBlur('password')}
            onFocus={this.handleFocus('password')}
            ref={(input) => this.passwordInput = input} 
            secureTextEntry
          />
          <Text style={styles.errmsg}>{this.errmsg('password', 0)}</Text>
        </View>

        <View style={styles.floatingLabelInputContainer}>
          <Animated.Text style={this.labelStyle('passwordAgain')}>
            Password Again
          </Animated.Text>
          <TextInput
            style={shouldMarkError('passwordAgain') ||
              (this.state.focused['passwordAgain'] || this.state.touched['passwordAgain']) && badInput['passwordAgain'] ?
              styles.badInput : styles.input}
            returnKeyType="go" 
            onChangeText={(text) => this.setState({fields: {...this.state.fields, passwordAgain: text}})}
            onBlur={this.handleBlur('passwordAgain')}
            onFocus={this.handleFocus('passwordAgain')}
            ref={(input) => this.passwordAgainInput = input}
            secureTextEntry
          />
          <Text style={styles.errmsg}>{this.errmsg('passwordAgain', 0)}</Text>
        </View>

        <PrimaryButton onPress={this.onSignIn}>
          Sign Up
        </PrimaryButton>
        
      </View>
    );
  }
}
