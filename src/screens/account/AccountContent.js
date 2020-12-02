import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Loading from '../../components/Loading';

const AccountContent = ({ navigation, user, userLists, isLoading }) => {
  const handleListClick = (item) => navigation.navigate('List', { item });

  return (
    <>
      <Text style={styles.ownedLists}>Owned Lists</Text>
      <View style={styles.row}>
        {isLoading ? (
          <Loading size={8} containerStyle={{ paddingVertical: 10 }} />
        ) : (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={userLists}
            keyExtractor={(list) => list.list_id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => handleListClick(item)}
                  activeOpacity={0.6}
                >
                  <OwnedListTile item={item} />
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No lists owned</Text>
            }
          />
        )}
      </View>
    </>
  );
};

export default AccountContent;
