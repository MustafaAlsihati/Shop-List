import React, { useRef, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import ListTile from '../../components/ListTile';
import AddList from './AddList';

const Home = ({ navigation }) => {
  const refRBSheet = useRef();

  const handleTileClick = (item) => {
    console.log('Tile pressed');
    navigation.navigate('List');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          titleStyle={{ ...styles.btnTitle, color: colors.green, fontSize: 14 }}
          title="Add List"
          type="clear"
          onPress={() => refRBSheet.current.open()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.View}>
      <Text style={styles.headerLabel}>
        {/* Logged user's username: */}
        Welcome, Mustafa!
      </Text>
      <View style={styles.tiles}>
        <TouchableOpacity
          style={styles.fullW}
          onPress={handleTileClick}
          activeOpacity={0.5}
        >
          <ListTile />
        </TouchableOpacity>
      </View>

      <AddList refRBSheet={refRBSheet} />
    </View>
  );
};

export default Home;
