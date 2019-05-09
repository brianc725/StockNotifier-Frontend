import React, {  Component } from 'react';
import {
  Text, View, TouchableOpacity
} from 'react-native';
import styles from '../styles'

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonDisabledContainer}
        activeOpacity={1}>
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
