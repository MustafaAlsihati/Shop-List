import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Notification, Search, Home } from '../components/icons';
import { bottomTabsStyle, colors, styles } from '../constants/Theme';
import { SearchStack, HomeStack, AccountStack, NotificationsStack } from './stacks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.blueish_grey,
          lazy: false,
          tabBarStyle: { ...bottomTabsStyle, height: 60 + insets.bottom } as any,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Home color={color} />
                {focused ? <View style={styles.bottomTabsCircle} /> : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="NotificationsTab"
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
          name="SearchTab"
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
          name="AccountTab"
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
