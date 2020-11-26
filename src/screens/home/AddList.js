import React, { useState, useContext, useEffect } from 'react';
import _ from 'lodash';
import { View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Divider from '../../components/Divider';
import { Upload } from '../../components/icons';
import { styles, colors } from '../../constants/Theme';
import BottomSheet from '../../components/BottomSheet';
import * as ImagePicker from 'expo-image-picker';
import { addList, editList } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';

const inputInitState = {
  listName: 0.3,
  listDesc: 0.3,
};

const loadingInitState = {
  upload: false,
  submit: false,
  disableSubmit: false,
};

const AddList = ({ refRBSheet, onRefresh, onClose, editSelectedList }) => {
  const { user } = useContext(AuthContext);
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(loadingInitState);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState({});

  const handleInputChange = (val, key) =>
    setList((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    if (!_.isEmpty(editSelectedList)) {
      setIsEdit(true);
      setList(editSelectedList);
    }
  }, [editSelectedList]);

  const pickImage = async () => {
    setLoading({ upload: true, disableSubmit: true });
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        handleInputChange(result.uri, 'image');
      }
    }
    setLoading({ upload: false, disableSubmit: false });
  };

  const handleSubmit = async () => {
    setLoading({ submit: true, disableSubmit: true });

    if (isEdit) {
      return editList(
        list,
        () => {
          setList({});
          onClose();
        },
        (err) => console.log('ERR @ editList (AddList.js)\n', err)
      );
    }

    return addList(
      list,
      user,
      () => {
        setList({});
        onClose();
      },
      (err) => {
        console.log('ERR at addList (AddList.js):\n', err);
        setLoading({ submit: false, disableSubmit: false });
      }
    );
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
            title={
              list.image
                ? list.image.length > 25
                  ? list.image.substring(0, 11) +
                    '...' +
                    list.image.substring(
                      list.image.length - 14,
                      list.image.length
                    )
                  : list.image
                : 'SELECT PICTURE'
            }
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
            onPress={handleSubmit}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default AddList;
