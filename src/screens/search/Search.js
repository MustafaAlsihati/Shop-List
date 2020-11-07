import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Search as SearchIcon } from '../../components/icons';
import { styles, colors } from '../../constants/Theme';
import SearchLists from '../../components/SearchLists';

const inputInitState = {
  searchList: 0.3,
};

const Search = () => {
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(false);

  const handleTileClick = (item) => {
    console.log('List pressed');
    // navigation.navigate('Items');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.View}>
        <View style={{ marginTop: 5 }}>
          <Input
            placeholder="SEARCH FOR LISTS..."
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={35}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor={colors.blueish_grey}
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.searchList})`,
            }}
            onFocus={() => setInputOpacity({ searchList: 1.0 })}
            onBlur={() => setInputOpacity({ searchList: 0.3 })}
            rightIcon={<SearchIcon size={22} color={colors.blueish_grey} />}
          />
        </View>

        <View style={{ ...styles.tiles, marginTop: -15 }}>
          <TouchableOpacity
            style={styles.fullW}
            onPress={handleTileClick}
            activeOpacity={0.5}
          >
            <SearchLists />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
