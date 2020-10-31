import React from 'react';
import { View } from 'react-native';
import { styles } from '../constants/Theme';
import { DotIndicator } from 'react-native-indicators';

const Loading = ({ size, containerStyle }) => {
  return (
    <View style={{ ...styles.spinnerView, ...containerStyle }}>
      <DotIndicator count={3} size={size ? size : 10} color="#3EBB70" />
    </View>
  );
};

export default Loading;
