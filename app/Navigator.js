import {
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import React from 'react';
import { Button, Text } from 'react-native'
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';
import AuthLoading from './Screens/AuthLoading';
import About from './Screens/About';
import Landing from './Screens/Landing';
import DrawerSignout from './Components/DrawerSignout';
import ManageTickers from './Screens/ManageTickers';
import styles, { Colors } from './styles';

const AppScreens = createDrawerNavigator(
  {
    StockList: StockList,
    ManageTickers: ManageTickers, 
    About: About,  
  },
  {
    contentComponent: DrawerSignout,
    initialRouteName: 'StockList',
  }
);

const AuthScreens = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: ({navigation}) => {
        return {
          title: "Welcome to Stock Notifier!",
          headerTitleStyle: {fontWeight: 'normal', fontFamily: "sans-serif-medium" },
          headerRight: (
            <Text style={{color: Colors.TEXT_LIGHT}} onPress={() => navigation.navigate('Login')}>Sign In</Text>
          ),
          headerRightContainerStyle: styles.headerRightContainerStyle,
        }
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: "Sign Up",
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Sign In",
      },
    },
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerMode: 'screen',
      headerStyle: styles.headerStyle,
      headerTintColor: Colors.TEXT_LIGHT
    },
  }
);

export default Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppScreens,
    Auth: AuthScreens,
    AuthLoading: AuthLoading
  },
  {
    initialRouteName: 'Auth'
  }
));
