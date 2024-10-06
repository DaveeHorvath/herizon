import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './profile';
import Index from './index';
import Map from './map';
import ChallengeView from './challenge';
import Friend from './friend';
import Init from './initial';


// init is an overlay above all others, might not need to be here
const Tab = createBottomTabNavigator();
export default function RootLayout() {
  useFonts();
  return (
    <NavigationContainer independent={true}>
      <Init/>
      <Tab.Navigator initialRouteName={"index"} screenOptions={{headerShown: false}}>
        <Tab.Screen name="profile" component={Profile} />
        <Tab.Screen name="index" component={Index} />
        <Tab.Screen name="map" component={Map} />
        <Tab.Screen name="challenge" component={ChallengeView} />
        <Tab.Screen name="fight" component={Friend}  />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

import * as Font from 'expo-font';

let useFonts = () =>
  Font.loadAsync({
    Hagrid: require('../assets/fonts/Hagrid-Variable-trial.ttf'),
  });