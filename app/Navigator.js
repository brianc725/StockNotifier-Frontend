import {
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';
import AuthLoading from './Screens/AuthLoading';
import About from './Screens/About';
import DrawerSignout from './Components/DrawerSignout';
import ManageTickers from './Screens/ManageTickers';

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

const AuthScreens = createBottomTabNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        tabBarLabel: 'Sign Up'
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Sign In'
      }
    },
  },
  {
    initialRouteName: 'Register',
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export default Navigator = createAppContainer(createSwitchNavigator(
  {
    App: AppScreens,
    Auth: AuthScreens,
    AuthLoading: AuthLoading
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
