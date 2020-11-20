import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Loading from '../../components/Loading';

const AccountContent = ({ userLists, isLoading }) => {
  return (
    <>
      <Text style={styles.ownedLists}>Owned Lists</Text>
      <View style={styles.row}>
        {isLoading ? (
          <Loading size={8} containerStyle={{ paddingVertical: 10 }} />
        ) : userLists && userLists.length > 0 ? (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={userLists}
            keyExtractor={(list) => list.list_id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
                  <OwnedListTile item={item} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text style={styles.emptyListText}>No lists available</Text>
        )}
      </View>
    </>
  );
};

export default AccountContent;
