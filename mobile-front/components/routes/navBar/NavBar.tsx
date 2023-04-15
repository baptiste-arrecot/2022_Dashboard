import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native'

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StoreContext } from '../../utils/Store';
import Home from '../home/Home';
import Setting from '../settings/Setting';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#41B883',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderBottomColor: '#41B883',
          position: 'absolute',
          height: 60,
          borderRadius: 30,
          bottom: 20,
          left: 20,
          right: 20
        }
      }}
    >
      <Tab.Screen
        name={`Home`}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={`Settings`}
        component={Setting}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderRadius: 10,
          },
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const NavBar = () => {
  const { isDarkMode } = useContext(StoreContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>

  );
}

export default NavBar;