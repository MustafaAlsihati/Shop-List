import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, RefreshControl, Text, Platform } from 'react-native';
import Divider from '../../components/Divider';
import { Feather } from '@expo/vector-icons';
import { Settings, Logout } from '../../components/icons';
import { colors, styles } from '../../constants/Theme';
import AccountHeader from './AccountHeader';
import AccountContent from './AccountContent';
import { signOut, getMyLists, getMyItems } from '../../firebase/index';
// import MenuPopup from '../../components/MenuPopup';
// import { MenuItem, MenuDivider } from 'react-native-material-menu';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Item, List, ReduxState } from '../../constants/types';
import { useSelector } from 'react-redux';

const Account = React.memo(({ navigation }: any) => {
  const refMenu = useRef<RBSheet>(null);
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const [userLists, setUserLists] = useState<List[]>([]);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openSettings = () => {
    refMenu.current?.close();
    navigation.navigate('Settings');
  };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <MenuPopup
  //         {...{ refMenu }}
  //         menuItems={
  //           <>
  //             <MenuItem onPress={openSettings}>
  //               <View style={[styles.menuItemsWithIcon, Platform.OS === 'ios' ? { paddingHorizontal: 15 } : {}]}>
  //                 <Settings size={22} color={colors.blueish_grey} />
  //                 <Text style={styles.menuItemText}>Settings</Text>
  //               </View>
  //             </MenuItem>
  //             <View style={{ marginHorizontal: 5 }}>
  //               <MenuDivider color={colors.blueish_grey} />
  //             </View>
  //             <MenuItem onPress={signOutClickHandle}>
  //               <View style={[styles.menuItemsWithIcon, Platform.OS === 'ios' ? { paddingHorizontal: 15 } : {}]}>
  //                 <Logout size={22} color={colors.blueish_grey} />
  //                 <Text style={styles.menuItemText}>Sign Out</Text>
  //               </View>
  //             </MenuItem>
  //           </>
  //         }
  //       >
  //         <TouchableOpacity activeOpacity={0.7} onPress={() => refMenu.current?.open()}>
  //           <View style={{ paddingHorizontal: 15 }}>
  //             <Feather name="more-vertical" size={24} color={colors.blueish_grey} />
  //           </View>
  //         </TouchableOpacity>
  //       </MenuPopup>
  //     ),
  //   });
  // }, [navigation]);

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
      const result: List[] = await getMyLists(user?.uid!);
      setUserLists(result);
    } catch (err) {
      console.log('ERR @ getUserLists: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserItems = async () => {
    try {
      const itemsResult = await getMyItems(user?.uid!);
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
          <RefreshControl colors={[colors.green]} progressBackgroundColor={colors.border} refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AccountHeader {...{ navigation, user, userLists, userItems, isLoading }} />
        <Divider />
        <AccountContent {...{ navigation, user, userLists, isLoading }} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
});

export default Account;
