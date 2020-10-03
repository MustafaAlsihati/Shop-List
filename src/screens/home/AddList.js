import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { styles, colors } from '../../constants/Theme';
import BottomSheet from '../../components/BottomSheet';

const inputInitState = {
  listName: 0.3,
  listDesc: 0.3,
};

const loadingInitState = {
  upload: false,
  submit: false,
  disableSubmit: false,
};

const AddList = ({ refRBSheet }) => {
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(loadingInitState);

  return (
    <>
      <BottomSheet
        refRBSheet={refRBSheet}
        height={400}
        onClose={() => {
          setInputOpacity(inputInitState);
          setLoading(loadingInitState);
        }}
      >
        <View style={styles.BSInputFieldContainer}>
          <Input
            placeholder="LIST NAME"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={35}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.listName})`,
            }}
            onFocus={() => setInputOpacity({ listName: 1.0 })}
            onBlur={() => setInputOpacity({ listName: 0.3 })}
          />
          <Input
            placeholder="LIST DESCRIPTION"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={150}
            multiline
            numberOfLines={3}
            containerStyle={styles.textfieldContainer}
            inputStyle={{
              ...styles.textfieldInput,
              textAlignVertical: 'top',
            }}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.listDesc})`,
              height: 100,
            }}
            onFocus={() => setInputOpacity({ listDesc: 1.0 })}
            onBlur={() => setInputOpacity({ listDesc: 0.3 })}
          />
          <Button
            title="UPLOAD PICTURE"
            buttonStyle={styles.uploadBtn}
            titleStyle={styles.btnTitle}
            loading={loading.upload}
            icon={<Feather name="upload" size={24} color={colors.white} />}
            onPress={() => {
              setLoading({ upload: true, disableSubmit: true });
            }}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.BSInputFieldContainer}>
          <Button
            title="SUBMIT"
            buttonStyle={styles.btn}
            titleStyle={styles.btnTitle}
            loading={loading.submit}
            disabled={loading.disableSubmit}
            onPress={() => {
              setLoading({ submit: true });
            }}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default AddList;
