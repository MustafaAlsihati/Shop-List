import React, { useRef, useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import ItemTile from '../../components/ItemTile';
import AddItem from './AddItem';

const Items = ({ navigation }) => {
  const refRBSheet = useRef();

  const handleItemClick = (item) => {
    console.log('Item pressed');
    // navigation.navigate('Item');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Amazon',
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
      <View style={styles.tiles}>
        <TouchableOpacity
          style={styles.fullW}
          onPress={handleItemClick}
          activeOpacity={0.5}
        >
          <ItemTile />
        </TouchableOpacity>
      </View>

      <AddItem refRBSheet={refRBSheet} />
    </View>
  );
};

export default Items;
