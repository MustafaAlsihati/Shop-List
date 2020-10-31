import React from 'react';
import { View, Text } from 'react-native';
import { styles, colors } from '../constants/Theme';
import Loading from '../components/Loading';

const UserInfoTile = ({ number, name, loading }) => {
  return (
    <View style={styles.userInfoTile}>
      {!loading ? (
        <Text
          style={{
            color: colors.white,
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
          }}
        >
          {number}
        </Text>
      ) : (
        <Loading containerStyle={{ backgroundColor: 'transparent' }} size={5} />
      )}
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
