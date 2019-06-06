import React, { Component } from 'react';
import {
  Text, View, Image,
} from 'react-native';
import styles from '../styles';
import PrimaryButton from '../Components/PrimaryButton';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.landingInputContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../icon.png')}
              style={{width: 300, height: 300}}
            />
          </View>
          <PrimaryButton
            onPress={() => this.props.navigation.navigate('Register')}>
            Sign Up
          </PrimaryButton>
        </View>
      </View>
    );
  }
}
