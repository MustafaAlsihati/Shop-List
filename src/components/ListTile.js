import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { styles } from '../constants/Theme';

const ListTile = () => {
  return (
    <View style={styles.tile}>
      <ImageBackground
        style={styles.fullWH}
        source={
          // Image URL:
          require('../../assets/amazon.png')
        }
      >
        <View style={styles.tileInfo}>
          <Text style={styles.tileTitle}>
            {/* Title */}
            Amazon
          </Text>
          <Text style={styles.tileDesc}>
            {/* Description */}
            International online shopping website for everything.
          </Text>
          <Text style={styles.tileMembers}>
            {/* Author name + (number of members - 1) other(s) */}
            Mustafa + 1 other(s)
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ListTile;
