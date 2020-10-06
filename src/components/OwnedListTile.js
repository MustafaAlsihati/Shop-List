import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles, colors } from '../constants/Theme';

const OwnedListTile = () => {
  return (
    <View style={{ ...styles.tile, width: 120, height: 130, marginRight: 10 }}>
      <ImageBackground
        style={styles.fullWH}
        source={
          // Image URL:
          require('../../assets/amazon.png')
        }
      >
        <View style={{ ...styles.tileInfo, justifyContent: 'center' }}>
          <Text style={styles.tileTitle}>
            {/* Title */}
            Amazon
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OwnedListTile;
