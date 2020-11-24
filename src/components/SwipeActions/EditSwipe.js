import React from 'react';
import { Animated } from 'react-native';
import { colors } from '../../constants/Theme';
import { Edit } from '../icons';
import { RectButton } from 'react-native-gesture-handler';

const EditSwipe = (progress, dragX, onEdit) => {
  const trans = dragX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });
  return (
    <Animated.View
      style={{
        width: '20%',
        transform: [{ translateX: trans }],
      }}
    >
      <RectButton
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        onPress={onEdit}
      >
        <Edit color={colors.green} />
      </RectButton>
    </Animated.View>
  );
};

export default EditSwipe;
