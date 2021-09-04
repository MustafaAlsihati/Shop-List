import React, { useState } from 'react';
import { View, Text, Image, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { signUpWithEmailAndPassword as signUp } from '../../firebase/index';
import _ from 'lodash';
import { signUpValidator } from '../../js/validators';

const userObj = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = React.memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userObj);
  const [inputErrs, setInputErrs] = useState(userObj);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputOpacity, setInputOpacity] = useState({
    username: 0.3,
    email: 0.3,
    password: 0.3,
    confirmPassword: 0.3,
  });

  const onSubmit = async () => {
    setLoading(true);
    if (!signUpValidator(user, setInputErrs)) {
      setLoading(false);
      return;
    }

    return await signUp(user).catch(err => {
      setLoading(false);
      Alert.alert(
        'Something went wrong',
        'Error occurred while logging in, please try again',
        [
          {
            text: 'Dismiss',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    });
  };

  const handleInputChange = (val: any, key: string) => setUser(prev => ({ ...prev, [key]: val }));

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ ...styles.View, paddingHorizontal: 0 }}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../../assets/logo.png')} />
            </View>
            <View style={styles.authContainer}>
              <Text style={styles.authLabel}>Sign Up</Text>
              <View style={styles.authInputContainer}>
                <Input
                  placeholder="Username"
                  value={user.username}
                  errorStyle={{ marginTop: 0, marginBottom: 10 }}
                  errorMessage={inputErrs.username && inputErrs.username.length > 0 ? inputErrs.username : ''}
                  onChangeText={text => handleInputChange(text, 'username')}
                  rightIcon={<AntDesign name="user" size={16} color={colors.blueish_grey} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.username})`,
                    borderColor: inputErrs.username && inputErrs.username.length > 0 ? colors.delete : 'rgba(255, 255, 255, 0.3)',
                  }}
                  onFocus={() => setInputOpacity({ username: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ username: 0.3 } as any)}
                />
                <Input
                  placeholder="Email"
                  value={user.email}
                  errorStyle={{ marginTop: 0, marginBottom: 10 }}
                  errorMessage={inputErrs.email && inputErrs.email.length > 0 ? inputErrs.email : ''}
                  onChangeText={text => handleInputChange(text, 'email')}
                  rightIcon={<Entypo name="email" size={16} color={colors.blueish_grey} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.email})`,
                    borderColor: inputErrs.email && inputErrs.email.length > 0 ? colors.delete : 'rgba(255, 255, 255, 0.3)',
                  }}
                  onFocus={() => setInputOpacity({ email: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ email: 0.3 } as any)}
                />
                <Input
                  placeholder="Password"
                  value={user.password}
                  errorStyle={{ marginTop: 0, marginBottom: 10 }}
                  errorMessage={inputErrs.password && inputErrs.password.length > 0 ? inputErrs.password : ''}
                  onChangeText={text => handleInputChange(text, 'password')}
                  rightIcon={<Feather name="eye-off" size={16} color={colors.textfieldInput} onPress={() => setHidePassword(!hidePassword)} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.password})`,
                    borderColor: inputErrs.password && inputErrs.password.length > 0 ? colors.delete : 'rgba(255, 255, 255, 0.3)',
                  }}
                  secureTextEntry={hidePassword}
                  onFocus={() => setInputOpacity({ password: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ password: 0.3 } as any)}
                />
                <Input
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  errorStyle={{ marginTop: 0, marginBottom: 10 }}
                  errorMessage={inputErrs.confirmPassword && inputErrs.confirmPassword.length > 0 ? inputErrs.confirmPassword : ''}
                  onChangeText={text => handleInputChange(text, 'confirmPassword')}
                  rightIcon={<Feather name="eye-off" size={16} color={colors.blueish_grey} onPress={() => setHidePassword(!hidePassword)} />}
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.textfieldContainer}
                  inputStyle={styles.textfieldInput}
                  placeholderTextColor={colors.blueish_grey}
                  inputContainerStyle={{
                    ...styles.textfield,
                    backgroundColor: `rgba(255, 255, 255, ${inputOpacity.confirmPassword})`,
                    borderColor: inputErrs.confirmPassword && inputErrs.confirmPassword.length > 0 ? colors.delete : 'rgba(255, 255, 255, 0.3)',
                  }}
                  secureTextEntry={hidePassword}
                  onFocus={() => setInputOpacity({ confirmPassword: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ confirmPassword: 0.3 } as any)}
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
      </KeyboardAvoidingView>
    </>
  );
});

export default SignUp;
