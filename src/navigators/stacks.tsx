import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { stackOptions } from '../constants/Theme';
import Home from '../screens/home/Home';
import List from '../screens/home/List';
import Item from '../screens/home/Item';
import Search from '../screens/search/Search';
import Account from '../screens/account/Account';
import SignIn from '../screens/auth/Signin';
import SignUp from '../screens/auth/SignUp';
import Settings from '../screens/account/settings/Settings';
import Notifications from '../screens/notifications/Notifications';

const Stack = createStackNavigator();

export const HomeStack = React.memo(props => {
  return (
    <Stack.Navigator mode="card" screenOptions={stackOptions}>
      <Stack.Screen
        name="Home"
        options={{
          title: 'My Lists',
        }}
        component={Home}
      />
      <Stack.Screen
        name="List"
        options={{
          title: 'List',
        }}
        component={List}
      />
      <Stack.Screen
        name="Item"
        options={{
          title: 'Item',
        }}
        component={Item}
      />
    </Stack.Navigator>
  );
});

export const SearchStack = React.memo(props => {
  return (
    <Stack.Navigator mode="card" screenOptions={stackOptions}>
      <Stack.Screen
        name="Search"
        options={{
          title: 'Search',
        }}
        component={Search}
      />
    </Stack.Navigator>
  );
});

export const AccountStack = React.memo(props => {
  return (
    <Stack.Navigator mode="card" screenOptions={stackOptions}>
      <Stack.Screen
        name="Account"
        options={{
          title: 'My Account',
        }}
        component={Account}
      />
      <Stack.Screen
        name="Settings"
        options={{
          title: 'Settings',
        }}
        component={Settings}
      />
    </Stack.Navigator>
  );
});

export const NotificationsStack = React.memo(props => {
  return (
    <Stack.Navigator mode="card" screenOptions={stackOptions}>
      <Stack.Screen
        name="Notifications"
        options={{
          title: 'Notifications',
        }}
        component={Notifications}
      />
    </Stack.Navigator>
  );
});

export const AuthStack = React.memo(props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" mode="card" screenOptions={{ ...stackOptions, headerShown: false }}>
        <Stack.Screen
          name="SignIn"
          options={{
            title: 'Sign In',
          }}
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            title: 'Sign Up',
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ' ',
          }}
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
