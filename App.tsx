import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import Loading from './src/components/Loading';
import { useFont } from './src/hooks/useFont';
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { NotificationsProvider } from './src/contexts/NotificationsContext';
import { AppearanceProvider } from 'react-native-appearance';

function App() {
  let fontsLoaded = useFont();
  const { user, loading } = useContext(AuthContext);

  return (
    <AppearanceProvider>
      <AuthProvider>
        {fontsLoaded ? (
          <SafeAreaProvider>
            <StatusBar style="light" translucent />
            {loading ? (
              <Loading />
            ) : user ? (
              <NotificationsProvider {...{ user }}>
                <BottomTabs />
              </NotificationsProvider>
            ) : (
              <AuthStack />
            )}
          </SafeAreaProvider>
        ) : (
          <Loading />
        )}
      </AuthProvider>
    </AppearanceProvider>
  );
}

export default React.memo(App);
