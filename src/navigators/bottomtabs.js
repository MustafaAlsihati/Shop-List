import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AntDesign,
  Foundation,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { bottomTabsStyle, colors } from '../constants/Theme';
import { SearchStack, HomeStack, AccountStack } from './stacks';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        labeled={false}
        activeColor={colors.green}
        inactiveColor={colors.blueish_grey}
        initialRouteName="Home"
        barStyle={{ ...bottomTabsStyle, height: 65 + insets.bottom }}
      >
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Foundation name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
