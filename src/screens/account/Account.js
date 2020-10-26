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
} from 'react-native';
import Divider from '../../components/Divider';
import { MenuItem } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import { colors, styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Tags from './Tags';
import AccountHeader from './AccountHeader';
import MenuPopup from '../../components/MenuPopup';
import { signOut, getUserInfo } from '../../firebase/index';
import { AuthContext } from '../../contexts/AuthContext';

const Account = ({ navigation }) => {
  const refMenu = useRef();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const result = await getUserInfo(user.uid);
      setUserData(result);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ ...styles.View, ...styles.column }}>
        <AccountHeader {...{ userData, setUserData }} />
        <Divider />
        <OwnedLists />
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

const OwnedLists = () => {
  return (
    <>
      <Text style={styles.ownedLists}>Owned Lists</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
          <OwnedListTile />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Account;
