import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const colors = {
  background: '#1A202C',
  cardBackground: '#2D3748',
  border: '#4A5568',
  delete: '#F56565',
  green: '#3EBB70',
  blueish_grey: '#A0AEC0',
  grayish_white: '#D9D9D9',
  textfieldInput: '#C4C4C4',
  black: '#000000',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  View: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    height: '100%',
    color: colors.blueish_grey,
  },
  fullW: {
    width: '100%',
  },
  fullH: {
    width: '100%',
  },
  divider: {
    backgroundColor: colors.white,
    opacity: 0.5,
    marginVertical: 10,
  },
  fullWH: {
    height: '100%',
    width: '100%',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerLabel: {
    color: colors.blueish_grey,
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 191,
    resizeMode: 'contain',
  },
  authContainer: {
    width: '100%',
    height: 450,
    marginTop: 'auto',
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  authLabel: {
    color: colors.blueish_grey,
    fontSize: 30,
    fontFamily: 'Montserrat-Medium',
    marginTop: 5,
  },
  authInputContainer: {
    marginTop: 30,
  },
  textfieldContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: -5,
  },
  textfield: {
    marginVertical: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    height: 55,
    borderRadius: 10,
  },
  textfieldInput: {
    color: colors.textfieldInput,
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
  },
  priceUnit: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.blueish_grey,
  },
  linkContainer: {
    marginBottom: 25,
  },
  link: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },
  toSignUplink: {
    marginTop: 25,
    fontSize: 14,
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },
  btn: {
    height: 50,
    backgroundColor: colors.green,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grayish_white,
  },
  uploadBtn: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  btnTitle: {
    fontSize: 15,
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },
  tiles: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  tile: {
    height: 230,
    width: '100%',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
  },
  tileInfo: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.white,
  },
  tileTitle: {
    color: colors.grayish_white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  tileDesc: {
    color: colors.grayish_white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
  tileMembers: {
    color: colors.green,
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    textAlign: 'right',
    marginVertical: 5,
  },
  itemTile: {
    height: 80,
    width: '100%',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  itemTileInfoContainer: {
    marginTop: 10,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTileInfo: {
    color: colors.blueish_grey,
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
  },
  BSInputFieldContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export const bottomSheetStyle = {
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  draggableIcon: {
    backgroundColor: colors.blueish_grey,
  },
  container: {
    backgroundColor: colors.cardBackground,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 5,
  },
};

export const stackOptions = {
  headerTitleAlign: 'center',
  headerBackTitle: ' ',
  headerBackImage: () => (
    <MaterialIcons
      name="keyboard-backspace"
      size={34}
      color={colors.blueish_grey}
    />
  ),
  headerTitleStyle: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 19,
  },
  headerTintColor: colors.blueish_grey,
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  gestureEnabled: true,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export const bottomTabsStyle = {
  backgroundColor: colors.cardBackground,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderColor: 'transparent',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: 65,
};
