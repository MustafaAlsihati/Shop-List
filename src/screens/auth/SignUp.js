import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { signUpWithEmailAndPassword as signUp } from '../../firebase/index';
import Dialog from '../../components/Dialog';

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    show: false,
    message: '',
    isSuccess: false,
    isError: false,
    isAlert: false,
  });
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [inputOpacity, setInputOpacity] = useState({
    username: 0.3,
    email: 0.3,
    password: 0.3,
    confirmPassword: 0.3,
  });

  const onSubmit = async () => {
    setLoading(true);
    // if (true) {
    //   setDialogProps({
    //     show: true,
    //     message: 'User registered successfully',
    //     isSuccess: true,
    //   });
    //   return;
    // }

    return await signUp(user).then(() => {
      setLoading(false);
    });
  };

  const handleInputChange = (val, key) =>
    setUser((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...styles.View, paddingHorizontal: 0 }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/logo.png')}
            />
          </View>
          <View style={styles.authContainer}>
            <Text style={styles.authLabel}>Sign Up</Text>
            <View style={styles.authInputContainer}>
              <Input
                placeholder="Username"
                value={user.username}
                onChangeText={(text) => handleInputChange(text, 'username')}
                rightIcon={
                  <AntDesign
                    name="user"
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
                  backgroundColor: `rgba(255, 255, 255, ${inputOpacity.username})`,
                }}
                onFocus={() => setInputOpacity({ username: 1.0 })}
                onBlur={() => setInputOpacity({ username: 0.3 })}
              />
              <Input
                placeholder="Email"
                value={user.email}
                onChangeText={(text) => handleInputChange(text, 'email')}
                rightIcon={
                  <Entypo name="email" size={16} color={colors.blueish_grey} />
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
                    color={colors.textfieldInput}
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
              <Input
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange(text, 'confirmPassword')
                }
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
                  backgroundColor: `rgba(255, 255, 255, ${inputOpacity.confirmPassword})`,
                }}
                secureTextEntry={hidePassword}
                onFocus={() => setInputOpacity({ confirmPassword: 1.0 })}
                onBlur={() => setInputOpacity({ confirmPassword: 0.3 })}
              />
              <Button
                title="SIGN UP"
                buttonStyle={styles.btn}
                titleStyle={styles.btnTitle}
                onPress={onSubmit}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Dialog
        open={dialogProps.show}
        onClose={() => setDialogProps({ show: false })}
        message={dialogProps.message}
        isSuccess={dialogProps.isSuccess}
        isError={dialogProps.isError}
        isAlert={dialogProps.isAlert}
      />
    </>
  );
};

export default SignUp;
