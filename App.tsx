import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import AppLoading from 'expo-app-loading';
// Redux:
import { store } from './src/redux';
import { Provider } from 'react-redux';
import AuthProvider from './src/redux/AuthProvider';
// Hooks:
import useNotifications from './src/hooks/useNotifications';
import { useFont } from './src/hooks/useFont';
// Constants:
import { User } from './src/constants/types';
// Navigators:
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';

function App() {
  LogBox.ignoreLogs(['Setting a timer']);

  useNotifications();
  const fontsLoaded = useFont();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <AppearanceProvider>
      <AuthProvider {...{ setUser, setLoading }}>
        <SafeAreaProvider>
          {fontsLoaded && !loading ? (
            <>
              {/* <StatusBar style="light" translucent /> */}
              {user ? <BottomTabs /> : <AuthStack />}
            </>
          ) : (
            <AppLoading />
          )}
        </SafeAreaProvider>
      </AuthProvider>
    </AppearanceProvider>
  );
}

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
