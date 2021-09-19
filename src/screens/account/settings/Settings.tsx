import React, { useState, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles, colors } from '../../../constants/Theme';
import Divider from '../../../components/Divider';
import CurrencySheet from './CurrencySheet';
import { updateSettings } from '../../../firebase';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ReduxState, Settings } from '../../../constants/types';
import { useSelector } from 'react-redux';

export default React.memo(function () {
  const currencySheet = useRef<RBSheet>(null);
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const [userSettings, setUserSettings] = useState<Settings>(user?.settings || {});

  const handleInputChange = (val: any, key: string) => setUserSettings(prev => ({ ...prev, [key]: val }));

  const UpdateSettings = () => {
    if (user) {
      updateSettings(
        user.uid,
        userSettings,
        () => {},
        err => {
          console.log('ERR @ UpdateSettings (Settings.js):\n', err);
        }
      );
    }
  };

  return (
    <ScrollView style={styles.View}>
      <TouchableOpacity onPress={() => currencySheet.current?.open()} activeOpacity={0.6}>
        <List.Item
          title="Currency"
          description="Currency that will be used by default when adding lists and items."
          titleStyle={styles.settingsListTitleText}
          descriptionStyle={styles.settingsListDescriptionText}
          left={() => <MaterialCommunityIcons name="currency-usd" size={24} style={styles.settingsIcon} color={colors.blueish_grey} />}
          right={() => <Text style={{ ...styles.centerVH, ...styles.settingText }}>{userSettings.currency ? userSettings.currency.code : null}</Text>}
          style={{ paddingVertical: 0 }}
        />
        <Divider style={{ marginVertical: 3 }} />
      </TouchableOpacity>

      <CurrencySheet
        {...{
          refRBSheet: currencySheet,
          userSettings,
          UpdateSettings,
          handleInputChange,
        }}
        onClose={() => currencySheet.current?.close()}
      />
    </ScrollView>
  );
});
