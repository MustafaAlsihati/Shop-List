import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, colors } from '../../constants/Theme';
import { Entypo, Feather } from '@expo/vector-icons';

const SignIn = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [inputOpacity, setInputOpacity] = useState({
    email: 0.3,
    password: 0.3,
  });

  console.log('Nav: ', navigation);

  return (
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
              placeholder="EMAIL"
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
              placeholder="PASSWORD"
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
            <TouchableOpacity style={styles.linkContainer} onPress={() => {}}>
              <Text style={styles.link}>Forgot Your Password?</Text>
            </TouchableOpacity>
            <Button
              title="SIGN IN"
              buttonStyle={styles.btn}
              titleStyle={styles.btnTitle}
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
  );
};

export default SignIn;
