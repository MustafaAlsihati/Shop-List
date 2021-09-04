import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from '../constants/Theme';

const Divider = React.memo<{ style?: StyleProp<ViewStyle> }>(({ style }) => {
  return <View style={[styles.divider, style]} />;
});

export default Divider;
