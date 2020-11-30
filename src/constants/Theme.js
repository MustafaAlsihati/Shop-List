import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { ArrowLeft } from '../components/icons';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const colors = {
  background: '#1A202C',
  cardBackground: '#2D3748',
  border: '#4A5568',
  delete: '#EC5D57',
  green: '#3EBB70',
  red: '#ff0000',
  alert: '#F7B119',
  blueish_grey: '#A0AEC0',
  grayish_white: '#D9D9D9',
  textfieldInput: '#ABABAB',
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
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.white,
    opacity: 0.3,
    marginVertical: 10,
  },
  fullWH: {
    height: '100%',
    width: '100%',
  },
  chip: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    borderRadius: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    paddingHorizontal: 10,
  },
  chipText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.white,
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
  userName: {
    color: colors.white,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  userInfoTile: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
    paddingVertical: 0,
    height: 55,
    borderRadius: 10,
  },
  textfieldInput: {
    color: colors.cardBackground,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
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
  },
  tile: {
    height: 230,
    width: '100%',
    alignSelf: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
  },
  ownedLists: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  addTags: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.blueish_grey,
    textDecorationLine: 'underline',
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
    marginTop: 5,
  },
  itemTile: {
    minHeight: 75,
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
  searchListTile: {
    minHeight: 55,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
  itemTileInfoContainer: {
    marginTop: 10,
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
  modalView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
  },
  modalMessage: {
    color: colors.blueish_grey,
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 20,
    textAlign: 'center',
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.border,
    borderColor: colors.border,
    elevation: 0,
  },
  menuItemText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    marginHorizontal: 10,
  },
  emptyListText: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: colors.blueish_grey,
    opacity: 0.7,
    fontSize: 16,
  },
  bottomTabsCircle: {
    backgroundColor: colors.green,
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    alignSelf: 'center',
    marginTop: 3,
  },
  menuItemsWithIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    <View>
      <ArrowLeft size={28} />
    </View>
  ),
  headerTitleStyle: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
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
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: 60,
  borderColor: colors.cardBackground,
  position: 'absolute',
  bottom: 0,
  elevation: 0,
  borderTopWidth: 0,
};
