import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';
import AuthLoading from './Screens/AuthLoading';
import TestSignout from './Screens/TestSignout';

const AppStack = createStackNavigator(
  {
    StockList: StockList,
    TestSignout: TestSignout,
  },
  {
    // initialRouteName: 'StockList'
    initialRouteName: 'TestSignout'
  }
);

const AuthStack = createStackNavigator(
  {
    Register: Register,
    Login: Login
  },
  {
    initialRouteName: 'Register'
  }
);

export default Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoading
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
