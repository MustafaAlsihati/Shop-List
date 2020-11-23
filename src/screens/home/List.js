import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Image, Button } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, colors, stackOptions } from '../../constants/Theme';
import ItemTile from '../../components/ItemTile';
import AddItem from './AddItem';
import Constants from 'expo-constants';
import Loading from '../../components/Loading';
import { useHeaderHeight } from '@react-navigation/stack';
import { getListItems } from '../../firebase/index';

const List = ({ navigation, route }) => {
  const { item } = route.params;
  const headerImage = item.image;
  const refRBSheet = useRef();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const [listItems, setListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleItemClick = (item) => {
    navigation.navigate('Item', { item });
  };

  const getData = async () => {
    try {
      const res = await getListItems(item.list_id);
      setListItems(res);
    } catch (err) {
      console.log('ERR: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (item) getData();
  }, [item]);

  useLayoutEffect(() => {
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
          title="Add Item"
          type="clear"
          onPress={() => refRBSheet.current.open()}
        />
      ),
    });
  }, [navigation]);

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
                {item.name}
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
            listItems.map((item) => (
              <TouchableOpacity
                style={styles.fullW}
                onPress={() => handleItemClick(item)}
                activeOpacity={0.5}
                key={item.item_id}
              >
                <ItemTile key={item.item_id} item={item} />
              </TouchableOpacity>
            ))
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
