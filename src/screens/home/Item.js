import React, { useState, useRef, useLayoutEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, colors } from '../../constants/Theme';
import AddItem from './AddItem';

const Items = ({ navigation }) => {
  const refRBSheet = useRef();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ' ',
      headerRight: () => (
        <Button
          titleStyle={{
            ...styles.btnTitle,
            color: colors.green,
            fontSize: 14,
            paddingHorizontal: 5,
          }}
          title="Edit Item"
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
        paddingBottom: 75 + insets.bottom,
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
          source={require('../../../assets/amazon.png')}
          style={{
            width: 'auto',
            height: 250,
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
          <Text style={{ ...styles.headerLabel, marginBottom: 5 }}>Amazon</Text>
          <Text style={{ ...styles.tileDesc, fontSize: 13, marginBottom: 15 }}>
            Product to do something for someone which will benefit him blah blah
            blah...
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
              ${' '}
            </Text>
            <Text
              style={{
                ...styles.tileMembers,
                textAlign: 'left',
                fontSize: 30,
                textAlignVertical: 'bottom',
              }}
            >
              399.99
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button
              title="VISIT THIS ITEM WEBSITE"
              type="outline"
              buttonStyle={{ height: 50, borderRadius: 10, borderWidth: 0 }}
              titleStyle={{
                fontSize: 15,
                color: colors.green,
                fontFamily: 'Montserrat-Medium',
                textDecorationLine: 'underline',
              }}
              iconRight
              icon={
                <View style={{ paddingHorizontal: 5 }}>
                  <Feather name="link" size={18} color={colors.green} />
                </View>
              }
            />
          </View>
        </View>
      </View>

      <AddItem refRBSheet={refRBSheet} />
    </View>
  );
};

export default Items;
