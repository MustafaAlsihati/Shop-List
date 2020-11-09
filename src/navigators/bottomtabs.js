import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Settings,
  Profile,
  Notification,
  Search,
  Category,
} from '../components/icons';
import { bottomTabsStyle, colors, styles } from '../constants/Theme';
import {
  SearchStack,
  HomeStack,
  AccountStack,
  NotificationsStack,
  SettingsStack,
} from './stacks';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        lazy="false"
        tabBarOptions={{
          showLabel: false,
          activeTintColor: colors.green,
          inactiveTintColor: colors.blueish_grey,
          style: bottomTabsStyle,
        }}
        style={bottomTabsStyle}
      >
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Search color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Notification color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Category color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Profile color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Settings color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
