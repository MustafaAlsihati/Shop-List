import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image, Button } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, colors, stackOptions } from '../../constants/Theme';
import ItemTile from '../../components/ItemTile';
import AddItem from './AddItem';
import Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/stack';

const Items = ({ navigation }) => {
  const refRBSheet = useRef();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const handleItemClick = (item) => {
    console.log('Item pressed');
    navigation.navigate('Item');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ' ',
      headerTransparent: true,
      headerRight: () => (
        <Button
          titleStyle={{ ...styles.btnTitle, color: colors.green, fontSize: 14 }}
          title="Add List"
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
                Amazon
              </Text>
            </View>
          );
        }}
        renderForeground={() => {
          return (
            <Image
              source={require('../../../assets/amazon.png')}
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
          <TouchableOpacity
            style={styles.fullW}
            onPress={handleItemClick}
            activeOpacity={0.5}
          >
            <ItemTile />
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>

      <AddItem refRBSheet={refRBSheet} />
    </View>
  );
};

export default Items;
