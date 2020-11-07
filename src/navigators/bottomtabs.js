import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  Settings,
  Profile,
  Notification,
  Search,
  Category,
} from '../components/icons';
import { bottomTabsStyle, colors } from '../constants/Theme';
import {
  SearchStack,
  HomeStack,
  AccountStack,
  NotificationsStack,
  SettingsStack,
} from './stacks';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        labeled={false}
        activeColor={colors.green}
        inactiveColor={colors.blueish_grey}
        initialRouteName="Home"
        shifting="false"
        barStyle={bottomTabsStyle}
      >
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color }) => <Search color={color} />,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsStack}
          options={{
            tabBarIcon: ({ color }) => <Notification color={color} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => <Category color={color} />,
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color }) => <Profile color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
