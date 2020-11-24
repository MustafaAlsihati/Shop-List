import React from 'react';
import { Animated } from 'react-native';
import { colors } from '../../constants/Theme';
import { Delete } from '../icons';
import { RectButton } from 'react-native-gesture-handler';

const DeleteSwipe = (progress, dragX, onDelete) => {
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
        onPress={onDelete}
      >
        <Delete color={colors.delete} />
      </RectButton>
    </Animated.View>
  );
};

export default DeleteSwipe;
