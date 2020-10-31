import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/Theme';

const ItemTile = ({ item }) => {
  return (
    <View style={styles.itemTile}>
      <Text style={{ ...styles.tileMembers, marginTop: 0, textAlign: 'left' }}>
        {item.author.username}
      </Text>
      <Text style={{ ...styles.tileTitle, fontSize: 16 }}>{item.name}</Text>
      <View style={styles.itemTileInfoContainer}>
        <Text style={styles.itemTileInfo}>
          {item.price} {item.currency}
        </Text>
        <Text style={styles.itemTileInfo}>
          {item.created.toDate().toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default ItemTile;
