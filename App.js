import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFont } from './src/js/hooks';
import BottomTabs from './src/navigators/bottomtabs';
import { AuthStack } from './src/navigators/stacks';
import { styles } from './src/constants/Theme';

const App = () => {
  let firebaseAuth = true;

  return (
    <>
      {firebaseAuth ? <BottomTabs /> : <AuthStack />}
      <StatusBar style="light" backgroundColor="#1A202C" />
    </>
  );
};

export default () => {
  let [fontsLoaded] = useFont();

  if (fontsLoaded) {
    return <App />;
  } else {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size="large" color="#3EBB70" />
      </View>
    );
  }
};
