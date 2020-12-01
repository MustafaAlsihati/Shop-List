import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Search as SearchIcon } from '../../components/icons';
import { styles, colors } from '../../constants/Theme';
import SearchLists from '../../components/SearchLists';
import Loading from '../../components/Loading';
import { searchLists } from '../../firebase/index';

const inputInitState = {
  searchList: 0.3,
};

const Search = ({ navigation }) => {
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState([]);

  const resetValues = () => {
    setSearchTerm('');
    setList([]);
  };

  const handleTileClick = (item) => {
    navigation.navigate('List', { item });
  };

  const handleTermSearch = async (term) => {
    try {
      setLoading(true);
      const data = await searchLists(term);
      setList(data);
    } catch (err) {
      console.log('ERR @ handleTermSearch (Search.js):\n', err);
    } finally {
      setLoading(false);
    }
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
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              handleTermSearch(text);
            }}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor={colors.blueish_grey}
            inputContainerStyle={{
              ...styles.textfield,
              height: 50,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.searchList})`,
            }}
            onFocus={() => setInputOpacity({ searchList: 1.0 })}
            onBlur={() => setInputOpacity({ searchList: 0.3 })}
            rightIcon={
              searchTerm.length === 0 ? (
                <SearchIcon size={22} color={colors.blueish_grey} />
              ) : (
                <TouchableOpacity onPress={resetValues}>
                  <Entypo name="cross" size={22} color={colors.blueish_grey} />
                </TouchableOpacity>
              )
            }
          />
        </View>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            style={{ ...styles.tiles, ...styles.fullW, marginTop: -15 }}
            showsVerticalScrollIndicator={true}
            data={list}
            keyExtractor={(list) => list.list_id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.fullW}
                  onPress={() => handleTileClick(item)}
                  activeOpacity={0.6}
                  key={item.list_id}
                >
                  <SearchLists item={item} />
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              searchTerm.length > 0 && (
                <Text style={{ ...styles.emptyListText, marginTop: 20 }}>
                  {`No lists found matching this name :(`}
                </Text>
              )
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
