import React, { useState, useRef, useLayoutEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import { Button, Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, colors } from '../../constants/Theme';
import EditItem from './EditItem';
import Currencies from '../../constants/Currencies';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../constants/types';

const Item = React.memo(({ navigation, route }: any) => {
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const { item }: any = route.params;
  const [listItem, setListItem] = useState(item);
  const headerImage = listItem.image;
  const refRBSheet = useRef<RBSheet>(null);
  const insets = useSafeAreaInsets();

  let date = listItem.created.toDate();
  date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  const handleInputChange = (val: any, key: string) => setListItem((prev: any) => ({ ...prev, [key]: val }));

  useLayoutEffect(() => {
    const is_author = user && listItem.author.id === user.uid;

    navigation.setOptions({
      headerTitle: ' ',
      headerRight: () =>
        is_author ? (
          <Button
            titleStyle={{
              ...styles.btnTitle,
              color: colors.green,
              fontSize: 14,
              paddingHorizontal: 5,
            }}
            title="Edit Item"
            type="clear"
            onPress={() => refRBSheet.current?.open()}
          />
        ) : null,
    });
  }, [navigation, listItem]);

  return (
    <View
      style={{
        ...styles.View,
        paddingBottom: 70 + insets.bottom,
      }}
    >
      <View
        style={{
          ...styles.tile,
          borderWidth: 0,
          backgroundColor: colors.cardBackground,
          padding: 15,
          flex: 1,
        }}
      >
        <Image
          source={{ uri: headerImage }}
          style={{
            width: 'auto',
            height: 300,
            marginBottom: 15,
            borderRadius: 15,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              ...styles.headerLabel,
              color: colors.grayish_white,
              marginBottom: 5,
            }}
          >
            {listItem.name}
          </Text>
          <Text
            style={{
              ...styles.tileDesc,
              color: colors.blueish_grey,
              fontSize: 14,
              marginBottom: 15,
            }}
          >
            {listItem.description ? listItem.description : null}
          </Text>
          <View
            style={{
              ...styles.row,
              alignItems: 'flex-start',
            }}
          >
            <Text
              style={{
                ...styles.tileMembers,
                textAlign: 'left',
                fontSize: 18,
                textAlignVertical: 'top',
              }}
            >
              {`${Currencies[listItem.currency_code].symbol} `}
            </Text>
            <Text
              style={{
                ...styles.tileMembers,
                textAlign: 'left',
                fontSize: 30,
                textAlignVertical: 'bottom',
              }}
            >
              {listItem.price}
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ ...styles.itemTileInfo, marginBottom: 10 }}>Added on {date}</Text>
            <Button
              onPress={() => Linking.openURL(listItem.link)}
              title="VISIT THIS ITEM WEBSITE"
              type="outline"
              buttonStyle={{
                backgroundColor: colors.green,
                height: 50,
                borderRadius: 10,
                borderWidth: 0,
              }}
              titleStyle={{
                fontSize: 15,
                color: colors.white,
                fontFamily: 'Montserrat-Medium',
                textDecorationLine: 'underline',
              }}
              iconRight
              icon={
                <View style={{ paddingHorizontal: 5 }}>
                  <Feather name="link" size={18} color={colors.white} />
                </View>
              }
            />
          </View>
        </View>
      </View>

      <EditItem {...{ refRBSheet, setListItem, handleInputChange, item: listItem }} onClose={() => refRBSheet.current?.close()} />
    </View>
  );
});

export default Item;
