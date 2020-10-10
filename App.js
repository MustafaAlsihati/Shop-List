import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Loading from './src/components/Loading';
import { useFont } from './src/js/hooks';
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';
import { styles } from './src/constants/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAuth from './src/hooks/useAuth';

export const UserContext = React.createContext();

const App = () => {
  const { user, loading } = useAuth();

  // Show Loading:
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

  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    );
  } else {
    return <Loading />;
  }
};
