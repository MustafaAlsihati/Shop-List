import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/Theme';

const SearchLists = () => {
  return (
    <View style={{ ...styles.itemTile, ...styles.searchListTile }}>
      <View
        style={{
          ...styles.column,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.tileTitle}>
          {/* Title */}
          Amazon
        </Text>
        <Text
          style={{
            ...styles.tileMembers,
            marginTop: 0,
            textAlign: 'left',
          }}
        >
          {/* Author name + others*/}
          Mustafa + 1 other(s)
        </Text>
      </View>
      <View
        style={{
          ...styles.column,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.itemTileInfo}>
          {/* Date */}
          25/09/2020
        </Text>
        <Text style={styles.itemTileInfo}>
          {/* Number of Items */}
          15 Item(s)
        </Text>
      </View>
    </View>
  );
};

export default SearchLists;
