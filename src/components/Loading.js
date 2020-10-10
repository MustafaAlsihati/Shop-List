import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from '../constants/Theme';

const Loading = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#3EBB70" />
    </View>
  );
};

export default Loading;
