import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/Theme';

const SearchLists = React.memo(({ item }: any) => {
  const authorName = item.users.map((user: any) => (user.id === item.author ? user.name : null));
  let date = item.created.toDate();
  date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  return (
    <View style={{ ...styles.itemTile, ...styles.searchListTile }}>
      <View
        style={{
          ...styles.column,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.tileTitle}>{item.name}</Text>
        <Text
          style={{
            ...styles.tileMembers,
            marginTop: 0,
            textAlign: 'left',
          }}
        >
          {authorName}
          {item.users.length > 1 ? `+ ${item.users.length - 1} other(s)` : null}
        </Text>
      </View>
      <View
        style={{
          ...styles.column,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.itemTileInfo}>{date}</Text>
        {/* <Text style={styles.itemTileInfo}> */}
        {/* Number of Items */}
        {/* </Text> */}
      </View>
    </View>
  );
});

export default SearchLists;
