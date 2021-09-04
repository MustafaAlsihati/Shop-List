import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/Theme';
import Currencies from '../constants/Currencies';

const ItemTile = React.memo<any>(({ item }: any) => {
  let date = item.created.toDate();
  date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  return (
    <View style={styles.itemTile}>
      <Text style={{ ...styles.tileMembers, marginTop: 0, textAlign: 'left' }}>{item.author.username}</Text>
      <Text style={{ ...styles.tileTitle, fontSize: 16 }}>{item.name}</Text>
      <View style={styles.itemTileInfoContainer}>
        <Text style={styles.itemTileInfo}>
          {item.price} {Currencies[item.currency_code].symbol}
        </Text>
        <Text style={styles.itemTileInfo}>{date}</Text>
      </View>
    </View>
  );
});

export default ItemTile;
