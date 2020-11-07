import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors, styles } from '../../constants/Theme';
import UserInfoTile from '../../components/UserInfoTile';
import { getMyListsNumber, getMyItemsNumber } from '../../firebase/index';

const AccountHeader = ({ userData }) => {
  const [userLists, setUserLists] = useState(0);
  const [userItems, setUserItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const listsResult = await getMyListsNumber(userData.uid);
        const itemsResult = await getMyItemsNumber(userData.uid);
        setUserLists(listsResult);
        setUserItems(itemsResult);
      } catch (err) {
        console.log('ERR: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) getUserData();
  }, [userData]);

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
          {userData.username}
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
        <UserInfoTile number={userLists} name="List(s)" loading={isLoading} />
        <UserInfoTile number={userItems} name="Item(s)" loading={isLoading} />
      </View>
    </>
  );
};

export default AccountHeader;
