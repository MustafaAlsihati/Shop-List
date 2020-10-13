import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { styles, colors } from '../constants/Theme';

const Dialog = ({ open, onClose, message, isSuccess, isError, isAlert }) => {
  return (
    <View style={styles.modalView}>
      <Modal isVisible={open} onBackdropPress={onClose}>
        <View style={styles.modalContainer}>
          {isSuccess ? (
            <AntDesign name="checkcircle" size={60} color={colors.green} />
          ) : null}
          {isError ? (
            <AntDesign name="closecircle" size={60} color={colors.delete} />
          ) : null}
          {isAlert ? (
            <AntDesign
              name="exclamationcircle"
              size={60}
              color={colors.alert}
            />
          ) : null}
          <Text style={styles.modalMessage}>{message}</Text>
          <Button
            title="CLOSE"
            buttonStyle={{ ...styles.uploadBtn, width: 200, height: 40 }}
            titleStyle={{ ...styles.btnTitle, fontSize: 14 }}
            onPress={onClose}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Dialog;
