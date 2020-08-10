import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen'
import ExchangeScreen from './screens/ExchangeScreen';
import SettingScreen from './screens/SettingScreen.js';
import customSidebarMenu from './components/customSidebarMenu.js'


export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator = createBottomTabNavigator({
    HomeScreen: {screen: HomeScreen},
    ExchangeScreen: {screen: ExchangeScreen},
  },
  {
    defaultNavigationOptions: ({navigation})=>({
      tabBarIcon: ()=>{
        const routeName = navigation.state.routeName;
        if(routeName === "HomeScreen"){
          return(
           <Text> HomeScreen</Text>
          )

        }
        else if(routeName === "Exchange"){
          return(
           <Text> Exchange screen </Text>
            )

        }
      }
    })
  }
);


const AppDrawNavigator = createDrawerNavigator({
  HomeScreen : {
    screen : TabNavigator
    },
  Settings : {
    screen : SettingScreen
    }
  },
  {
    contentComponent:customSidebarMenu
  },
  {
    initialRouteName : 'HomeScreen'
  })

  
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  AppDrawNavigator : AppDrawNavigator,
})

const AppContainer =  createAppContainer(switchNavigator);