import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Loading from './src/components/Loading';
import { useFont } from './src/hooks/useFont';
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { AppearanceProvider } from 'react-native-appearance';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  // Show loading:
  if (loading) return <Loading />;

  // check Auth and redirect:
  return (
    <>
      {user ? <BottomTabs /> : <AuthStack />}
      <StatusBar style="light" translucent />
    </>
  );
};

export default () => {
  let [fontsLoaded] = useFont();

  return (
    <AppearanceProvider>
      <AuthProvider>
        {fontsLoaded ? (
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        ) : (
          <Loading />
        )}
      </AuthProvider>
    </AppearanceProvider>
  );
};
