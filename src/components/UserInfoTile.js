import React from 'react';
import { View, Text } from 'react-native';
import { styles, colors } from '../constants/Theme';

const UserInfoTile = ({ number, name }) => {
  return (
    <View style={styles.userInfoTile}>
      <Text
        style={{
          color: colors.white,
          fontFamily: 'Montserrat-Regular',
          fontSize: 18,
        }}
      >
        {number}
      </Text>
      <Text
        style={{
          color: colors.white,
          fontSize: 12,
          fontFamily: 'Montserrat-Medium',
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default UserInfoTile;
