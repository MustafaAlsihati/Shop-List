import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import Divider from '../../components/Divider';
import { MenuItem } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import { colors, styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Tags from './Tags';
import AccountHeader from './AccountHeader';
import MenuPopup from '../../components/MenuPopup';
import Loading from '../../components/Loading';
import { signOut, getUserInfo, getMyLists } from '../../firebase/index';
import { AuthContext } from '../../contexts/AuthContext';

const Account = ({ navigation }) => {
  const refMenu = useRef();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await getUserInfo(user.uid);
        setUserData(result);
      } catch (err) {
        console.log('ERR: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getUserData();
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuPopup
          {...{ refMenu }}
          menuItems={
            <MenuItem onPress={signOut}>
              <Text style={styles.menuItemText}>Sign Out</Text>
            </MenuItem>
          }
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => refMenu.current.show()}
          >
            <View style={{ paddingHorizontal: 15 }}>
              <Ionicons name="md-more" size={24} color={colors.blueish_grey} />
            </View>
          </TouchableOpacity>
        </MenuPopup>
      ),
    });
  }, [navigation]);

  if (isLoading) return <Loading />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ ...styles.View, ...styles.column }}>
        <AccountHeader {...{ userData, setUserData }} />
        <Divider />
        <OwnedLists {...{ userData }} />
        <Divider />
        <TagLists />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const TagLists = () => {
  return (
    <View style={{ ...styles.column, marginBottom: 75 }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={styles.ownedLists}>Tags</Text>
        <Text style={styles.addTags}>Add Tags</Text>
      </View>
      <View style={{ ...styles.row, flexWrap: 'wrap' }}>
        <Tags name="PC" />
        <Tags name="Newegg" />
        <Tags name="Gaming" />
        <Tags name="Clothes" />
        <Tags name="Stuff" />
        <Tags name="Phones" />
        <Tags name="PlayStation" />
        <Tags name="Xbox Series X" />
        <Tags name="Mobile" />
      </View>
    </View>
  );
};

const OwnedLists = ({ userData }) => {
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserLists = async () => {
      try {
        const result = await getMyLists(userData.uid);
        setUserLists(result);
      } catch (err) {
        console.log('ERR: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) getUserLists();
  }, [userData]);

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

export default Account;
