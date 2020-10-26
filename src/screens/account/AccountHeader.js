import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import { Feather, Entypo } from '@expo/vector-icons';
import { colors, styles } from '../../constants/Theme';
import UserInfoTile from '../../components/UserInfoTile';

const AccountHeader = ({ userData, setUserData }) => {
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      <View style={{ ...styles.row, alignItems: 'center' }}>
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
        {enableEdit ? (
          <View style={{ ...styles.row, alignItems: 'center' }}>
            <Input
              containerStyle={{ width: 230, marginTop: 5 }}
              inputContainerStyle={{ borderBottomColor: colors.green }}
              inputStyle={{ ...styles.textfieldInput, fontSize: 20 }}
              placeholder={userData.username}
            />
            <TouchableOpacity
              style={{ paddingHorizontal: 5 }}
              activeOpacity={0.5}
              onPress={() => setEnableEdit(false)}
            >
              <Entypo name="check" size={30} color={colors.green} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{ ...styles.row, alignItems: 'center' }}
            activeOpacity={0.7}
            onPress={() => setEnableEdit(true)}
          >
            <Text style={styles.userName}>{userData.username}</Text>
            <Feather name="edit-3" size={18} color={colors.green} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          ...styles.row,
          width: '100%',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <UserInfoTile number={4} name="List(s)" />
        <UserInfoTile number={15} name="Item(s)" />
      </View>
    </>
  );
};

export default AccountHeader;
