import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StockList from './Screens/StockList';
import AuthLoading from './Screens/AuthLoading';
import About from './Screens/About';
import DrawerSignout from './Components/DrawerSignout';
// import ManageTickers from './Screens/ManageTickers';

const AppStack = createDrawerNavigator(
  {
    StockList: StockList,
    // ManageTickers: ManageTickers, 
    About: About,  
  },
  {
    contentComponent: DrawerSignout,
    initialRouteName: 'StockList',
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
