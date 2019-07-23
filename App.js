import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import SearchScreen from './src/Screens/searchScreen';
import HomeScreen from './src/Screens/homeScreen';
import UserScreen from './src/Screens/userScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import BeerScreen from './src/Screens/beerScreen';

const SearchScreenNavigator = createStackNavigator({
  Search: SearchScreen,
  Beer: BeerScreen,
  },
  {
    initialRouteName: 'Search',
  }
);

const navigation = createMaterialBottomTabNavigator({
    Home: {
    screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon:({tintColor}) =>(
        <Icon name = "ios-beer" color={tintColor} size={24}/>
      )
    }
  },
  Search: { 
    screen: SearchScreenNavigator,
    navigationOptions:{
      tabBarLabel: 'Search',
      tabBarIcon:({tintColor}) =>(
        <Icon name = "ios-search" color={tintColor} size={24}/>
      )
    }
  },
  User: { 
    screen: UserScreen,
    navigationOptions:{
      tabBarLabel: 'Login',
      tabBarIcon:({tintColor}) =>(
        <Icon name = "ios-contact" color={tintColor} size={24}/>
      )
    }
  },
}, {
  initialRouteName: 'Home',
  inactiveColor: '#ffe6cc',
  activeTintColor: '#3e2465',
  barStyle: { backgroundColor: '#ff9933' },
  shifting: true,
});


const App = createAppContainer(navigation);

export default App;