import React from 'react';
import { View } from 'react-native';
import { styles } from '../constants/Theme';

const Divider = ({ style }) => {
  return <View style={{ ...styles.divider, ...style }} />;
};

export default Divider;
