import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors, styles } from '../../constants/Theme';
import UserInfoTile from '../../components/UserInfoTile';

const AccountHeader = ({ user, userLists, userItems, isLoading }) => {
  return (
    <>
      <View style={{ ...styles.column, alignItems: 'center' }}>
        <Avatar
          rounded
          title="ME"
          size="large"
          // source={{ uri: '' }}
          onPress={() => console.log('Avatar Clicked!')}
          activeOpacity={0.7}
          containerStyle={{
            borderWidth: 1,
            backgroundColor: colors.grayish_white,
          }}
        />
        <Text style={{ ...styles.userName, marginVertical: 10 }}>
          {user.username}
        </Text>
      </View>
      <View
        style={{
          ...styles.row,
          width: '100%',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <UserInfoTile
          number={userLists.length}
          name="List(s)"
          loading={isLoading}
        />
        <UserInfoTile
          number={userItems.length}
          name="Item(s)"
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default AccountHeader;
