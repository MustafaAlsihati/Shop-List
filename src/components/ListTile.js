import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { styles } from '../constants/Theme';

const ListTile = ({ item }) => {
  const image = item.image;
  const authorName = item.users.map((user) =>
    user.id === item.author ? user.name : null
  );

  return (
    <View style={styles.tile}>
      <ImageBackground style={styles.fullWH} source={{ uri: image }}>
        <View style={styles.tileInfo}>
          <Text style={styles.tileTitle}>{item.name}</Text>
          <Text style={styles.tileDesc}>{item.description}</Text>
          <Text style={styles.tileMembers}>
            {authorName}
            {item.users.length > 1
              ? `+ ${item.users.length - 1} other(s)`
              : null}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ListTile;
