import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
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
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        labeled={false}
        activeColor={colors.green}
        inactiveColor={colors.blueish_grey}
        initialRouteName="Home"
        barStyle={bottomTabsStyle}
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
          name="Notifications"
          component={NotificationsStack}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="notification" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  borderRadius: 65 / 2,
                  backgroundColor: colors.green,
                  position: 'absolute',
                  height: 65,
                  width: 65,
                  bottom: -5,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 1,
                  zIndex: 99,
                }}
              >
                <Entypo name="list" size={24} color={colors.border} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
