/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'

import {
  SwitchNavigator,
} from 'react-navigation';

console.ignoredYellowBox = ['Remote debugger'];


const App = SwitchNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false, 
  }
});


export default App;
