import {
  createSwitchNavigator,
  createAnimatedStackNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';

const AppStack = createStackNavigator(
  {
    StockList: StockList
  },
  {
    initialRouteName: 'StockList'
  }
);

const AuthStack = createAnimatedStackNavigator(
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
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }
));
