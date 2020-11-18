import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Divider from '../../components/Divider';
import { Upload } from '../../components/icons';
import { styles, colors } from '../../constants/Theme';
import BottomSheet from '../../components/BottomSheet';
import * as ImagePicker from 'expo-image-picker';

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

  const [list, setList] = useState({});

  const handleInputChange = (val, key) =>
    setList((prev) => ({ ...prev, [key]: val }));

  const pickImage = async () => {
    setLoading({ upload: true, disableSubmit: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    setLoading({ upload: false, disableSubmit: false });
  };

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
            placeholder="List Name"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={35}
            value={list.name}
            onChangeText={(text) => handleInputChange(text, 'name')}
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
            placeholder="List Description"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={150}
            multiline
            numberOfLines={3}
            value={list.description}
            onChangeText={(text) => handleInputChange(text, 'description')}
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
            title={list.image ? list.image : 'SELECT PICTURE'}
            buttonStyle={styles.uploadBtn}
            titleStyle={styles.btnTitle}
            loading={loading.upload}
            icon={
              <Upload
                style={{ marginHorizontal: 5 }}
                size={24}
                color={colors.white}
              />
            }
            onPress={pickImage}
          />
        </View>

        <Divider />

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
