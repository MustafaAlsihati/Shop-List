import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles, colors } from '../constants/Theme';

const OwnedListTile = ({ item }) => {
  const image = item.image;

  return (
    <View
      style={{
        ...styles.tile,
        width: 120,
        height: 130,
        minHeight: 130,
        marginRight: 10,
      }}
    >
      <ImageBackground style={styles.fullWH} source={{ uri: image }}>
        <View style={{ ...styles.tileInfo, justifyContent: 'center' }}>
          <Text style={{ ...styles.tileTitle, fontSize: 14 }}>{item.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OwnedListTile;
