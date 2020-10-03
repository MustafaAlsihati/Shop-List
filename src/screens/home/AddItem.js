import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { styles, colors } from '../../constants/Theme';
import BottomSheet from '../../components/BottomSheet';

const inputInitState = {
  ItemName: 0.3,
  ItemLink: 0.3,
  ItemPrice: 0.3,
};

const loadingInitState = {
  submit: false,
};

const AddList = ({ refRBSheet }) => {
  const [inputOpacity, setInputOpacity] = useState(inputInitState);
  const [loading, setLoading] = useState(loadingInitState);

  return (
    <>
      <BottomSheet
        refRBSheet={refRBSheet}
        height={350}
        onClose={() => {
          setInputOpacity(inputInitState);
          setLoading(loadingInitState);
        }}
      >
        <View style={styles.BSInputFieldContainer}>
          <Input
            placeholder="ITEM NAME"
            autoCapitalize="sentences"
            autoCorrect={false}
            maxLength={35}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemName})`,
            }}
            onFocus={() => setInputOpacity({ ItemName: 1.0 })}
            onBlur={() => setInputOpacity({ ItemName: 0.3 })}
          />
          <Input
            placeholder="ITEM LINK"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={35}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemLink})`,
            }}
            onFocus={() => setInputOpacity({ ItemLink: 1.0 })}
            onBlur={() => setInputOpacity({ ItemLink: 0.3 })}
            rightIcon={
              <Feather name="link" size={18} color={colors.blueish_grey} />
            }
          />
          <Input
            placeholder="ITEM PRICE"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={35}
            containerStyle={styles.textfieldContainer}
            inputStyle={styles.textfieldInput}
            placeholderTextColor="#A0AEC0"
            inputContainerStyle={{
              ...styles.textfield,
              backgroundColor: `rgba(255, 255, 255, ${inputOpacity.ItemPrice})`,
            }}
            onFocus={() => setInputOpacity({ ItemPrice: 1.0 })}
            onBlur={() => setInputOpacity({ ItemPrice: 0.3 })}
            rightIcon={
              <Text style={styles.priceUnit}>
                {/* PRICE UNIT */}
                USD
              </Text>
            }
          />
        </View>

        <Divider style={{ ...styles.divider, marginTop: -5 }} />

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
