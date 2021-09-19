import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Divider from '../../components/Divider';
import { Feather } from '@expo/vector-icons';
import { Upload } from '../../components/icons';
import { styles, colors } from '../../constants/Theme';
import BottomSheet from '../../components/BottomSheet';
import * as ImagePicker from 'expo-image-picker';
import { addItem } from '../../firebase/index';
import { ReduxState, User } from '../../constants/types';
import { useSelector } from 'react-redux';

const inputInitState = {
  ItemName: 0.3,
  ItemDesc: 0.3,
  ItemLink: 0.3,
  ItemPrice: 0.3,
};

const loadingInitState = {
  upload: false,
  submit: false,
  disableSubmit: false,
};

const AddItem = React.memo(({ refRBSheet, onClose, list_id }: any) => {
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(loadingInitState);

  const [item, setItem] = useState<any>({});

  const handleInputChange = (val: any, key: string) => setItem((prev: any) => ({ ...prev, [key]: val }));

  const pickImage = async () => {
    setLoading({ upload: true, disableSubmit: true } as any);
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 6],
        quality: 1,
      });

      if (!result.cancelled) {
        handleInputChange(result.uri, 'image');
      }
    }
    setLoading({ upload: false, disableSubmit: false } as any);
  };

  const handleSubmit = async () => {
    if (user) {
      setLoading({ submit: true, disableSubmit: true } as any);
      addItem(
        item,
        list_id,
        user as unknown as User,
        () => {
          setItem({});
          onClose();
        },
        err => {
          console.log('ERR at addItem:\n', err);
          setLoading({ upload: false, disableSubmit: false } as any);
        }
      );
    }
  };

  return (
    <>
      <BottomSheet
        refRBSheet={refRBSheet}
        height={465}
        onClose={() => {
          setInputOpacity(inputInitState);
          setLoading(loadingInitState);
        }}
      >
        <View style={styles.BSInputFieldContainer}>
          <Input
            placeholder="Item Name"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={35}
            value={item.name as any}
            onChangeText={text => handleInputChange(text, 'name')}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemName})`,
            }}
            onFocus={() => setInputOpacity({ ItemName: 1.0 } as any)}
            onBlur={() => setInputOpacity({ ItemName: 0.3 } as any)}
          />
          <Input
            placeholder="Item Short Description (Optional)"
            autoCapitalize="sentences"
            autoCorrect={false}
            value={item.description as any}
            onChangeText={text => handleInputChange(text, 'description')}
            maxLength={80}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemDesc})`,
            }}
            onFocus={() => setInputOpacity({ ItemDesc: 1.0 } as any)}
            onBlur={() => setInputOpacity({ ItemDesc: 0.3 } as any)}
          />
          <Input
            placeholder="Item Link"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={35}
            value={item.link as any}
            onChangeText={text => handleInputChange(text, 'link')}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemLink})`,
            }}
            onFocus={() => setInputOpacity({ ItemLink: 1.0 } as any)}
            onBlur={() => setInputOpacity({ ItemLink: 0.3 } as any)}
            rightIcon={<Feather name="link" size={18} color={colors.blueish_grey} />}
          />
          <Input
            placeholder="Item Price"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={35}
            value={item.price as any}
            onChangeText={text => handleInputChange(text, 'price')}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemPrice})`,
            }}
            onFocus={() => setInputOpacity({ ItemPrice: 1.0 } as any)}
            onBlur={() => setInputOpacity({ ItemPrice: 0.3 } as any)}
            rightIcon={<Text style={styles.priceUnit}>{(user as any).settings.currency.symbol}</Text>}
          />
          <Button
            title={
              (item as any).image
                ? (item as any).image.length > 25
                  ? (item as any).image.substring(0, 11) +
                    '...' +
                    (item as any).image.substring((item as any).image.length - 14, (item as any).image.length)
                  : (item as any).image
                : 'SELECT PICTURE'
            }
            buttonStyle={styles.uploadBtn}
            titleStyle={styles.btnTitle}
            loading={loading.upload}
            icon={<Upload style={{ marginHorizontal: 5 }} size={24} color={colors.white} />}
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
});

export default AddItem;
