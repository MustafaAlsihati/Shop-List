import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { stackOptions } from '../constants/Theme';
import Home from '../screens/home/Home';
import Items from '../screens/home/Items';
import Search from '../screens/search/Search';
import Account from '../screens/account/Account';
import SignIn from '../screens/auth/Signin';
import SignUp from '../screens/auth/SignUp';

const Stack = createStackNavigator();

export const HomeStack = () => {
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
        name="Items"
        options={{
          title: 'Items',
        }}
        component={Items}
      />
    </Stack.Navigator>
  );
};

export const SearchStack = () => {
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
};

export const AccountStack = () => {
  return (
    <Stack.Navigator mode="card" screenOptions={stackOptions}>
      <Stack.Screen
        name="Account"
        options={{
          title: 'My Account',
        }}
        component={Account}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        mode="card"
        screenOptions={{ ...stackOptions, headerShown: false }}
      >
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
};
