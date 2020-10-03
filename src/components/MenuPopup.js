import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';

const MenuPopup = ({ visible, closeMenu, children }) => {
  return (
    <Provider>
      <View style={styles.menu}>
        <Menu visible={visible} onDismiss={closeMenu} anchor={children}>
          <Menu.Item onPress={() => {}} title="Sign Out" />
          {/* <Divider /> */}
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MenuPopup;
