import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { colors, styles } from '../constants/Theme';

const Tags = React.memo(({ name }: any) => {
  const [editChip, setEditChip] = useState(false);
  const handleChipEditClick = () => setEditChip(true);
  const handleChipDelete = () => {};

  return (
    <View style={{ ...styles.row, margin: 3 }}>
      <View style={styles.chip}>
        {!editChip ? (
          <>
            <Text onPress={handleChipEditClick} style={styles.chipText}>
              {name}
            </Text>
            <Entypo name="circle-with-cross" size={22} style={{ paddingLeft: 5 }} color={colors.grayish_white} onPress={handleChipDelete} />
          </>
        ) : (
          <>
            <TextInput autoFocus style={styles.chipText} />
            <AntDesign name="checkcircle" size={22} style={{ paddingLeft: 5 }} color={colors.grayish_white} onPress={() => setEditChip(false)} />
          </>
        )}
      </View>
    </View>
  );
});

export default Tags;
