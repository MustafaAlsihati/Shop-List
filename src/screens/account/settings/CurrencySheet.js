import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import Divider from '../../../components/Divider';
import { Search as SearchIcon } from '../../../components/icons';
import { filterCurrencies } from '../../../js/utils';
import { styles, colors } from '../../../constants/Theme';
import BottomSheet from '../../../components/BottomSheet';
import Currencies from '../../../constants/Currencies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const inputInitState = {
  listName: 0.3,
  listDesc: 0.3,
};

const CurrencySheet = ({
  refRBSheet,
  userSettings,
  UpdateSettings,
  onClose,
  handleInputChange,
}) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  let currencies = Object.keys(Currencies).map((i) => Currencies[i]);
  currencies = currencies.sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = async () => {
    onClose();
    UpdateSettings();
  };

  return (
    <>
      <BottomSheet
        refRBSheet={refRBSheet}
        height={450}
        closeOnDragDown={false}
        dragFromTopOnly={true}
      >
        <Input
          placeholder="Search Currency"
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
          onChangeText={(term) => setSearch(term)}
          containerStyle={{
            ...styles.textfieldContainer,
            marginTop: 5,
          }}
          inputStyle={styles.textfieldInput}
          placeholderTextColor="#A0AEC0"
          inputContainerStyle={{
            ...styles.textfield,
            height: 45,
            marginHorizontal: 5,
            backgroundColor: `rgba(255, 255, 255, ${inputOpacity.listName})`,
          }}
          onFocus={() => setInputOpacity({ listName: 1.0 })}
          onBlur={() => setInputOpacity({ listName: 0.3 })}
          rightIcon={
            search.length === 0 ? (
              <SearchIcon size={22} color={colors.blueish_grey} />
            ) : (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Entypo name="cross" size={22} color={colors.blueish_grey} />
              </TouchableOpacity>
            )
          }
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={currencies.filter((c) => filterCurrencies(c, search))}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => handleInputChange(item, 'currency')}
              activeOpacity={0.6}
            >
              <List.Item
                key={item.code}
                title={item.code}
                description={item.name}
                titleStyle={styles.settingsListTitleText}
                descriptionStyle={styles.settingsListDescriptionText}
                right={() => (
                  <Text style={{ ...styles.centerVH, ...styles.settingText }}>
                    {item.symbol}
                  </Text>
                )}
                style={[
                  {
                    paddingVertical: 0,
                  },
                  userSettings.currency === item
                    ? {
                        backgroundColor: colors.border,
                        borderWidth: 1,
                        borderColor: colors.blueish_grey,
                        borderRadius: 15,
                      }
                    : {},
                ]}
              />
              <Divider style={{ marginVertical: 3 }} />
            </TouchableOpacity>
          )}
          style={{ marginTop: -10 }}
        />

        <Divider />

        <View
          style={[
            styles.BSInputFieldContainer,
            { marginBottom: insets.bottom },
          ]}
        >
          <Button
            title="SAVE"
            buttonStyle={styles.btn}
            titleStyle={styles.btnTitle}
            onPress={handleSubmit}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default CurrencySheet;
