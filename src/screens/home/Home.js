import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { getUserInfo, getJoinedList } from '../../firebase/index';
import { AuthContext } from '../../contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListTile from '../../components/ListTile';
import AddList from './AddList';
import Loading from '../../components/Loading';

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refRBSheet = useRef();
  const insets = useSafeAreaInsets();

  const handleTileClick = (item) => {
    navigation.navigate('List', { item });
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
          onPress={() => refRBSheet.current.open()}
        />
      ),
    });
  }, [navigation]);

  const getData = async () => {
    try {
      const userData = await getUserInfo(user.uid);
      const listsResult = await getJoinedList(user.uid);
      setUsername(userData.username);
      setLists(listsResult);
    } catch (err) {
      console.log('ERR: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getData();
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
      <Text style={styles.headerLabel}>Welcome, {username}!</Text>
      <FlatList
        style={{
          ...styles.tiles,
          marginBottom: 70 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        data={lists}
        keyExtractor={(list) => list.list_id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.fullW}
              onPress={() => handleTileClick(item)}
              activeOpacity={0.5}
            >
              <ListTile key={item.list_id} item={item} />
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.green]}
            progressBackgroundColor={colors.border}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={
          lists && lists.length === 0
            ? { flexGrow: 1, justifyContent: 'center' }
            : {}
        }
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            Tap 'Add List' button to create new list, or search and join
            existing lists :)
          </Text>
        }
      />

      <AddList refRBSheet={refRBSheet} />
    </View>
  );
};

export default Home;
