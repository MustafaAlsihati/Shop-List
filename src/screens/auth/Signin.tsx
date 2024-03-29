import React, { useState } from 'react';
import { View, Text, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { Entypo, Feather } from '@expo/vector-icons';
import { signInWithEmailAndPassword as signIn } from '../../firebase/index';
import _ from 'lodash';

const userObj = {
  email: '',
  password: '',
};

const SignIn = React.memo(({ navigation }: any) => {
  const [user, setUser] = useState(userObj);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputOpacity, setInputOpacity] = useState({
    email: 0.3,
    password: 0.3,
  });

  const handleInputChange = (val: any, key: string) => setUser(prev => ({ ...prev, [key]: val }));

  const onSubmit = async () => {
    setLoading(true);
    if (_.isEmpty(user.email) || _.isEmpty(user.password)) {
      Alert.alert(
        'Try Again',
        'Please enter your correct username and password',
        [
          {
            text: 'Dismiss',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
      setLoading(false);
      return;
    }

    try {
      await signIn(user.email.trim(), user.password);
    } catch (err: any) {
      setLoading(false);
      let title = 'Something went wrong';
      let body = 'Error occurred while logging in, please try again';

      if (err.code == 'auth/wrong-password') {
        title = "We couldn't log you in";
        body = "Sorry, we couldn't find an account matching this email address and password, please try again or create new account.";
      }

      Alert.alert(
        title,
        body,
        [
          {
            text: 'Dismiss',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ ...styles.View, paddingHorizontal: 0 }}>
            <View style={{ ...styles.logoContainer, flex: 2 }}>
              <Image style={styles.logo} source={require('../../../assets/logo.png')} />
            </View>
            <View style={styles.authContainer}>
              <Text style={styles.authLabel}>Sign In</Text>
              <View style={styles.authInputContainer}>
                <Input
                  placeholder="Email"
                  value={user.email}
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
                  }}
                  onFocus={() => setInputOpacity({ email: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ email: 0.3 } as any)}
                />
                <Input
                  placeholder="Password"
                  value={user.password}
                  onChangeText={text => handleInputChange(text, 'password')}
                  rightIcon={<Feather name="eye-off" size={16} color={colors.blueish_grey} onPress={() => setHidePassword(!hidePassword)} />}
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
                  onFocus={() => setInputOpacity({ password: 1.0 } as any)}
                  onBlur={() => setInputOpacity({ password: 0.3 } as any)}
                />
                <TouchableOpacity style={styles.linkContainer} onPress={() => {}}>
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
                  Don't have an account?{' '}
                  <Text style={{ color: colors.green }} onPress={() => navigation.navigate('SignUp')}>
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
});

export default SignIn;
