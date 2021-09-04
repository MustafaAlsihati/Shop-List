import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors, styles } from '../../constants/Theme';
import UserInfoTile from '../../components/UserInfoTile';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePic } from '../../firebase';

const AccountHeader = React.memo(({ user, userLists, userItems, isLoading }: any) => {
  const image = user.image ? { uri: user.image } : null;

  const pickImage = async () => {
    let image_url = null;
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.4,
      });

      if (result.cancelled) {
        return;
      }
      image_url = result.uri;

      return updateProfilePic(
        user,
        image_url,
        () => {},
        err => {
          console.log('ERR @ pickImage (AccountHeader.js)\n', err.message);
        }
      );
    }
  };

  return (
    <>
      <View style={{ ...styles.column, alignItems: 'center' }}>
        <Avatar
          rounded
          title={user.username ? user.username.substring(0, 2).toUpperCase() : ''}
          size="large"
          source={image as any}
          onPress={pickImage}
          activeOpacity={0.7}
          containerStyle={{
            borderWidth: 1,
            backgroundColor: colors.grayish_white,
          }}
        />
        <Text style={{ ...styles.userName, marginVertical: 10 }}>{user.username}</Text>
      </View>
      <View
        style={{
          ...styles.row,
          width: '100%',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <UserInfoTile number={userLists.length} name="List(s)" loading={isLoading} />
        <UserInfoTile number={userItems.length} name="Item(s)" loading={isLoading} />
      </View>
    </>
  );
});

export default AccountHeader;
