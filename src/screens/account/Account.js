import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { colors, styles } from '../../constants/Theme';
import OwnedListTile from '../../components/OwnedListTile';
import Tags from './Tags';
import AccountHeader from './AccountHeader';

const Account = () => {
  const [editUserName, setEditUserName] = useState(false);

  const handleOnEditClick = () => setEditUserName(true);
  const handleOnSubmit = () => {
    setEditUserName(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ ...styles.View, ...styles.column }}>
        <AccountHeader
          {...{ editUserName, handleOnEditClick, handleOnSubmit }}
        />
        <Divider style={styles.divider} />
        <OwnedLists />
        <Divider style={{ ...styles.divider, marginTop: 15 }} />
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
