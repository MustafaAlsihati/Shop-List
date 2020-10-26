import React, { useContext } from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Loading from './src/components/Loading';
import { useFont } from './src/hooks/useFont';
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';
import { styles } from './src/constants/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

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
    <AuthProvider>
      {fontsLoaded ? (
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      ) : (
        <Loading />
      )}
    </AuthProvider>
  );
};
