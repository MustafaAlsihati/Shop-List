import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from '../constants/Theme';
import { DotIndicator } from 'react-native-indicators';

interface Props {
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Loading = React.memo<Props>(({ size, containerStyle }) => {
  return (
    <View style={[styles.spinnerView, containerStyle]}>
      <DotIndicator count={3} size={size ? size : 10} color="#3EBB70" />
    </View>
  );
});

export default Loading;
