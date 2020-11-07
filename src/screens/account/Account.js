import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import Divider from '../../components/Divider';
import { Logout } from '../../components/icons';
import { colors, styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Tags from './Tags';
import AccountHeader from './AccountHeader';
import Loading from '../../components/Loading';
import { signOut, getUserInfo, getMyLists } from '../../firebase/index';
import { AuthContext } from '../../contexts/AuthContext';

const Account = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await getUserInfo(user.uid);
        setUserData(result);
      } catch (err) {
        console.log('ERR: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getUserData();
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={signOutClickHandle}>
          <View style={{ paddingHorizontal: 15 }}>
            <Logout size={24} color={colors.blueish_grey} />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const signOutClickHandle = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to sign out from this account?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ ...styles.View, ...styles.column }}>
        <AccountHeader {...{ userData, setUserData }} />
        <Divider />
        <OwnedLists {...{ userData }} />
        <Divider />
        <TagLists />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const TagLists = () => {
  return (
    <View style={{ ...styles.column, marginBottom: 75 }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={styles.ownedLists}>Tags</Text>
        <Text style={styles.addTags}>Add Tags</Text>
      </View>
      <View style={{ ...styles.row, flexWrap: 'wrap' }}>
        <Tags name="PC" />
        <Tags name="Newegg" />
        <Tags name="Gaming" />
        <Tags name="Clothes" />
        <Tags name="Stuff" />
        <Tags name="Phones" />
        <Tags name="PlayStation" />
        <Tags name="Xbox Series X" />
        <Tags name="Mobile" />
      </View>
    </View>
  );
};

const OwnedLists = ({ userData }) => {
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserLists = async () => {
      try {
        const result = await getMyLists(userData.uid);
        setUserLists(result);
      } catch (err) {
        console.log('ERR: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) getUserLists();
  }, [userData]);

  return (
    <>
      <Text style={styles.ownedLists}>Owned Lists</Text>
      <View style={styles.row}>
        {isLoading ? (
          <Loading size={8} containerStyle={{ paddingVertical: 10 }} />
        ) : userLists && userLists.length > 0 ? (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={userLists}
            keyExtractor={(list) => list.list_id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
                  <OwnedListTile item={item} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text style={styles.emptyListText}>No lists available</Text>
        )}
      </View>
    </>
  );
};

export default Account;
