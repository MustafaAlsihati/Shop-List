import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Divider from '../../components/Divider';
import { styles, colors } from '../../constants/Theme';
import Loading from '../../components/Loading';
import { getNotifications } from '../../firebase';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../constants/types';

const Notifications = React.memo(props => {
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNotificationsList();
    setRefreshing(false);
  }, []);

  const getNotificationsList = async () => {
    try {
      if (user) {
        const res = await getNotifications(user.uid);
        setNotifications(res);
      }
    } catch (err) {
      console.log('ERR @ getNotifications\n', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getNotificationsList();
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <View style={styles.View}>
      <FlatList
        style={{
          ...styles.tiles,
          marginBottom: 60 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={item => item.notification_id}
        renderItem={({ item }) => {
          return (
            <>
              <List.Item
                title={item.title}
                description={item.body}
                titleStyle={styles.settingsListTitleText}
                descriptionStyle={styles.settingsListDescriptionText}
                style={{ paddingVertical: 0 }}
              />
              <Divider style={{ marginVertical: 3 }} />
            </>
          );
        }}
        refreshControl={
          <RefreshControl colors={[colors.green]} progressBackgroundColor={colors.border} refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={notifications && notifications.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}}
        ListEmptyComponent={<Text style={styles.emptyListText}>You have no notifications</Text>}
      />
    </View>
  );
});

export default Notifications;
