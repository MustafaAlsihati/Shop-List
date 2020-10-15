import React, { useState, useRef, useLayoutEffect } from 'react';
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
import { signOut } from '../../firebase/index';

const Account = ({ navigation }) => {
  const refMenu = useRef();

  const [editUserName, setEditUserName] = useState(false);
  const handleOnEditClick = () => setEditUserName(true);
  const handleOnSubmit = () => {
    setEditUserName(false);
  };

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
        <AccountHeader
          {...{ editUserName, handleOnEditClick, handleOnSubmit }}
        />
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
