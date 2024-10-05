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
      <Tab.Navigator screenOptions={{headerShown: false}}  initialRouteName={"index"}>
        <Tab.Screen name="profile" component={Profile} options={{ tabBarIcon: require("@/assets/images/profile.png") }}/>
        <Tab.Screen name="index" component={Index} options={{ tabBarIcon: require("@/assets/images/index.png") }}/>
        <Tab.Screen name="map" component={Map} options={{ tabBarIcon: require("@/assets/images/map.png") }}/>
        <Tab.Screen name="challenge" component={ChallengeView} options={{ tabBarIcon: require("@/assets/images/challenge.png") }}/>
        <Tab.Screen name="fight" component={Friend}  options={{ tabBarIcon: require("@/assets/images/fight.png") }}/>
      </Tab.Navigator>
      </NavigationContainer>
  );
}

import * as Font from 'expo-font';

let useFonts = () =>
  Font.loadAsync({
    Hagrid: require('../assets/fonts/Hagrid-Variable-trial.ttf'),
  });