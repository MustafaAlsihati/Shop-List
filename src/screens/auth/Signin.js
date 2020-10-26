import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { Entypo, Feather } from '@expo/vector-icons';
import { signInWithEmailAndPassword as signIn } from '../../firebase/index';
import Dialog from '../../components/Dialog';
import _ from 'lodash';

const userObj = {
  email: '',
  password: '',
};

const SignIn = ({ navigation }) => {
  const [user, setUser] = useState(userObj);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [dialogProps, setDialogProps] = useState({
    show: false,
    message: '',
    isSuccess: false,
    isError: false,
    isAlert: false,
  });
  const [inputOpacity, setInputOpacity] = useState({
    email: 0.3,
    password: 0.3,
  });

  const handleInputChange = (val, key) =>
    setUser((prev) => ({ ...prev, [key]: val }));

  const onSubmit = async () => {
    setLoading(true);
    if (_.isEmpty(user.email) || _.isEmpty(user.password)) {
      setDialogProps({
        show: true,
        message: 'Please enter your correct username and password',
        isAlert: true,
      });
      setLoading(false);
      return;
    }

    return await signIn(user.email.trim(), user.password).catch((err) => {
      setLoading(false);
      setDialogProps({
        show: true,
        message: 'Error occurred while logging in, please try again',
        isError: true,
      });
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ ...styles.View, paddingHorizontal: 0 }}>
            <View style={{ ...styles.logoContainer, flex: 2 }}>
              <Image
                style={styles.logo}
                source={require('../../../assets/logo.png')}
              />
            </View>
            <View style={styles.authContainer}>
              <Text style={styles.authLabel}>Sign In</Text>
              <View style={styles.authInputContainer}>
                <Input
                  placeholder="Email"
                  value={user.email}
                  onChangeText={(text) => handleInputChange(text, 'email')}
                  rightIcon={
                    <Entypo
                      name="email"
                      size={16}
                      color={colors.blueish_grey}
                    />
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.email})`,
                  }}
                  onFocus={() => setInputOpacity({ email: 1.0 })}
                  onBlur={() => setInputOpacity({ email: 0.3 })}
                />
                <Input
                  placeholder="Password"
                  value={user.password}
                  onChangeText={(text) => handleInputChange(text, 'password')}
                  rightIcon={
                    <Feather
                      name="eye-off"
                      size={16}
                      color={colors.blueish_grey}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.password})`,
                  }}
                  secureTextEntry={hidePassword}
                  onFocus={() => setInputOpacity({ password: 1.0 })}
                  onBlur={() => setInputOpacity({ password: 0.3 })}
                />
                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={() => {}}
                >
                  <Text style={styles.link}>Forgot Your Password?</Text>
                </TouchableOpacity>
                <Button
                  title="SIGN IN"
                  onPress={onSubmit}
                  buttonStyle={styles.btn}
                  titleStyle={styles.btnTitle}
                  loading={loading}
                  disabled={loading}
                />
                <Text style={styles.toSignUplink}>
                  Forgot Your Password?{' '}
                  <Text
                    style={{ color: colors.green }}
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* <Dialog
        open={dialogProps.show}
        onClose={() => setDialogProps({ show: false })}
        message={dialogProps.message}
        isSuccess={dialogProps.isSuccess}
        isError={dialogProps.isError}
        isAlert={dialogProps.isAlert}
      /> */}
    </>
  );
};

export default SignIn;
