import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { getJoinedList, deleteList, leaveList } from '../../firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListTile from '../../components/ListTile';
import AddList from './AddList';
import Loading from '../../components/Loading';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DeleteSwipe from '../../components/SwipeActions/DeleteSwipe';
import EditSwipe from '../../components/SwipeActions/EditSwipe';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ReduxState } from '../../constants/types';

const Home = React.memo(({ navigation }: any) => {
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const refRBSheet = useRef<RBSheet>(null);
  const insets = useSafeAreaInsets();

  const [lists, setLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editSelectedList, setEditSelectedList] = useState({});
  const handleTileClick = (item: any) => navigation.navigate('List', { item });

  const handleLeaveList = (list_id: string) => {
    return Alert.alert(
      'Confirm',
      'Are you sure you want to leave this list?',
      [
        { text: 'Dismiss', onPress: () => {}, style: 'cancel' },
        {
          text: 'Leave',
          onPress: () => {
            leaveList(
              user,
              list_id,
              () => onRefresh(),
              err => console.log('ERR @ leaving list\n', err)
            );
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteList = (list_id: string) => {
    return Alert.alert(
      'Confirm',
      'Are you sure you want to delete this list?',
      [
        { text: 'Dismiss', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            return deleteList(
              list_id,
              () => onRefresh(),
              err => console.log('ERR @ deleteList (Home.js):\n', err)
            );
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          titleStyle={{
            ...styles.btnTitle,
            color: colors.green,
            fontSize: 14,
            paddingHorizontal: 5,
          }}
          title="Add List"
          type="clear"
          onPress={() => refRBSheet.current?.open()}
        />
      ),
    });
  }, [navigation]);

  const getData = async () => {
    try {
      const listsResult = await getJoinedList((user as any).uid);
      setLists(listsResult);
    } catch (err) {
      console.log('ERR @ getData (Home.js): ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) getData();
    });

    return unsubscribe;
  }, [user]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View style={styles.View}>
      <Text style={styles.headerLabel}>Welcome, {user && user.username ? user.username : ''}!</Text>
      <FlatList
        style={{
          ...styles.tiles,
          marginBottom: 60 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        data={lists}
        keyExtractor={list => list.list_id}
        renderItem={({ item }) => {
          const refSwipe = React.createRef<any>();
          const is_author = item.author === user?.uid;

          return (
            <Swipeable
              ref={refSwipe}
              key={item.list_id}
              renderLeftActions={(progress, dragX) =>
                is_author ? (
                  <EditSwipe
                    {...{ progress, dragX }}
                    onEdit={() => {
                      setEditSelectedList(item);
                      refSwipe.current.close();
                      refRBSheet.current?.open();
                    }}
                  />
                ) : null
              }
              renderRightActions={(progress, dragX) => (
                <DeleteSwipe
                  {...{ progress, dragX }}
                  onDelete={() => {
                    refSwipe.current.close();
                    is_author ? handleDeleteList(item.list_id) : handleLeaveList(item.list_id);
                  }}
                />
              )}
            >
              <TouchableOpacity style={styles.fullW} onPress={() => handleTileClick(item)} activeOpacity={0.5}>
                <ListTile key={item.list_id} item={item} />
              </TouchableOpacity>
            </Swipeable>
          );
        }}
        refreshControl={
          <RefreshControl colors={[colors.green]} progressBackgroundColor={colors.border} refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={lists && lists.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}}
        ListEmptyComponent={<Text style={styles.emptyListText}>Tap 'Add List' button to create new list, or search and join existing lists :)</Text>}
      />

      <AddList
        {...{ refRBSheet, onRefresh, editSelectedList }}
        onClose={() => {
          refRBSheet.current?.close();
          onRefresh();
        }}
      />
    </View>
  );
});

export default Home;
