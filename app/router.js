import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';

const AppStack = createStackNavigator({ StockList: StockList });
const AuthStack = createStackNavigator({ Register: Register, Login: Login });

export const Authenticator = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));
