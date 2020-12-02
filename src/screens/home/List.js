import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { Image, Button } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, colors, stackOptions } from '../../constants/Theme';
import ItemTile from '../../components/ItemTile';
import AddItem from './AddItem';
import Constants from 'expo-constants';
import Loading from '../../components/Loading';
import { useHeaderHeight } from '@react-navigation/stack';
import { getListItems, deleteItem, joinList } from '../../firebase';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DeleteSwipe from '../../components/SwipeActions/DeleteSwipe';

const List = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const { item } = route.params;
  const headerImage = item.image;
  const refRBSheet = useRef();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const [list, setList] = useState(item);
  const [listItems, setListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleItemClick = (item) => {
    const is_user_joined = list.userIds.includes(user.uid);
    if (!is_user_joined) {
      return Alert.alert(
        'Join first!',
        'You need to join this list first in order to view items details',
        [
          {
            text: 'Dismiss',
            onPress: () => null,
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
    navigation.navigate('Item', { item });
  };

  const getData = async () => {
    try {
      const res = await getListItems(list.list_id);
      setListItems(res);
    } catch (err) {
      console.log('ERR: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinList = async () => {
    return joinList(user, list.list_id)
      .then(() => {
        const userIds = list.userIds;
        const users = list.users;
        userIds.push(user.uid);
        users.push({
          id: user.uid,
          name: user.username,
        });
        console.log('New Obj:\n', { ...list, userIds, users });
        setList({ ...list, userIds, users });
      })
      .catch((err) => {
        console.log('ERR @ handleJoinList (List.js)\n', err);
      });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (list) getData();
  }, [list]);

  useLayoutEffect(() => {
    const is_user_joined = list.userIds.includes(user.uid);

    navigation.setOptions({
      headerTitle: ' ',
      headerTransparent: true,
      headerRight: () => (
        <Button
          titleStyle={{
            ...styles.btnTitle,
            color: colors.green,
            fontSize: 14,
            paddingHorizontal: 5,
          }}
          title={is_user_joined ? 'Add Item' : 'Join'}
          type="clear"
          onPress={() =>
            is_user_joined ? refRBSheet.current.open() : handleJoinList()
          }
        />
      ),
    });
  }, [navigation, list]);

  return (
    <View
      style={{
        ...styles.View,
        paddingHorizontal: 0,
      }}
    >
      <ParallaxScrollView
        backgroundColor={colors.background}
        contentBackgroundColor={colors.background}
        parallaxHeaderHeight={250}
        style={{ marginBottom: 70 + insets.bottom }}
        fadeOutForeground
        stickyHeaderHeight={headerHeight}
        refreshControl={
          <RefreshControl
            colors={[colors.green]}
            progressBackgroundColor={colors.border}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderStickyHeader={() => {
          return (
            <View style={{ height: headerHeight, justifyContent: 'flex-end' }}>
              <Text
                style={{
                  ...stackOptions.headerTitleStyle,
                  marginBottom: 15,
                  color: colors.blueish_grey,
                }}
              >
                {list.name}
              </Text>
            </View>
          );
        }}
        renderForeground={() => {
          return (
            <Image
              source={{ uri: headerImage }}
              resizeMode="contain"
              style={{
                ...styles.fullWH,
                marginTop: Constants.statusBarHeight,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          );
        }}
      >
        <View style={{ ...styles.View, marginTop: 5 }}>
          {isLoading ? (
            <Loading size={8} />
          ) : listItems && listItems.length > 0 ? (
            listItems.map((item) => {
              const refSwipe = React.createRef();
              const is_user_joined = list.userIds.includes(user.uid);
              const is_author = item.author.id === user.uid;

              return (
                <Swipeable
                  ref={refSwipe}
                  key={item.item_id}
                  renderRightActions={(progress, dragX) =>
                    is_user_joined && is_author
                      ? DeleteSwipe(progress, dragX, () => {
                          refSwipe.current.close();
                          return deleteItem(
                            item.item_id,
                            item.list_id,
                            () => onRefresh(),
                            (err) =>
                              console.log('ERR @ deleteItem (List.js):\n', err)
                          );
                        })
                      : null
                  }
                >
                  <TouchableOpacity
                    style={styles.fullW}
                    onPress={() => handleItemClick(item)}
                    activeOpacity={0.5}
                    key={item.item_id}
                  >
                    <ItemTile key={item.item_id} item={item} />
                  </TouchableOpacity>
                </Swipeable>
              );
            })
          ) : (
            <Text style={styles.emptyListText}>List is empty</Text>
          )}
        </View>
      </ParallaxScrollView>

      <AddItem
        {...{ refRBSheet, list_id: item.list_id }}
        onClose={() => {
          refRBSheet.current.close();
          onRefresh();
        }}
      />
    </View>
  );
};

export default List;
