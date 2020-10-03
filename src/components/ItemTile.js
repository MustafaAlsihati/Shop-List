import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/Theme';

const ItemTile = () => {
  return (
    <View style={styles.itemTile}>
      <Text
        style={{ ...styles.tileMembers, marginVertical: 0, textAlign: 'left' }}
      >
        {/* Author name */}
        Mustafa
      </Text>
      <Text style={styles.tileTitle}>
        {/* Title */}
        Amazon
      </Text>
      <View style={styles.itemTileInfoContainer}>
        <Text style={styles.itemTileInfo}>
          {/* Price */}
          499.99 $
        </Text>
        <Text style={styles.itemTileInfo}>
          {/* Date */}
          9/25/2020
        </Text>
      </View>
    </View>
  );
};

export default ItemTile;
