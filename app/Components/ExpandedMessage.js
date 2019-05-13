import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert, TouchableOpacity, Dimensions,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ExpandedMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  togglePress() {
    const { expanded } = this.state;
    if (expanded) {
      this.setState({ expanded: false })
    }
    else {
      this.setState({ expanded: true })
    }
  }

  render() {
    const { title, message } = this.props;
    const { expanded } = this.state;

    // TODO: Add arrows so it looks like it can be expanded
    // Card is currently collapsed 
    if (expanded) {
      arrowIcon = <Ionicon color="black" name="ios-arrow-up" size={25} />
    }
    else {
      arrowIcon = <Ionicon color="black" name="ios-arrow-down" size={25} />
    }

    // Expanded View
    if (expanded) {
      return (
        <View style={localStyles.expanded}>
          <TouchableOpacity onPress={() => {
            this.togglePress()
          }}>
            <Text style={localStyles.expandedTitle}>{title}</Text>
            <Text style={localStyles.expandedText}>{message}</Text>
            <View alignItems='center'>
              {arrowIcon}
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    // Collapsed View
    else {
      return (
        <View style={localStyles.collapsed}>
          <TouchableOpacity onPress={() => {
            this.togglePress()
          }}>
            <Text style={localStyles.collapsedText}>{title}</Text>
            <View alignItems='center'>
              {arrowIcon}
            </View>
          </TouchableOpacity>
        </View>
      );
    }


  }
}

const { width, height } = Dimensions.get('window');

const localStyles = StyleSheet.create({
  expanded: {
    backgroundColor: '#D0CDD7',
    width,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  expandedTitle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  expandedText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  collapsed: {
    backgroundColor: '#D0CDD7',
    width,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  collapsedText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  }
});