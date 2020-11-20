import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  RefreshControl,
} from 'react-native';
import Divider from '../../components/Divider';
import { Logout } from '../../components/icons';
import { colors, styles } from '../../constants/Theme';
import AccountHeader from './AccountHeader';
import AccountContent from './AccountContent';
import { signOut, getMyLists, getMyItems } from '../../firebase/index';
import { AuthContext } from '../../contexts/AuthContext';

const Account = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  const [userItems, setUserItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const getUserLists = async () => {
    try {
      const result = await getMyLists(user.uid);
      setUserLists(result);
    } catch (err) {
      console.log('ERR @ getUserLists: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserItems = async () => {
    try {
      const itemsResult = await getMyItems(user.uid);
      setUserItems(itemsResult);
    } catch (err) {
      console.log('ERR @ getUserItems: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUserLists();
      getUserItems();
    }
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user) {
      await getUserLists();
      await getUserItems();
    }
    setRefreshing(false);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ ...styles.View, ...styles.column }}
        refreshControl={
          <RefreshControl
            colors={[colors.green]}
            progressBackgroundColor={colors.border}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <AccountHeader {...{ user, userLists, userItems, isLoading }} />
        <Divider />
        <AccountContent {...{ user, userLists, isLoading }} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Account;
