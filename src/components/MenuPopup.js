import React from 'react';
import { View } from 'react-native';
import Menu from 'react-native-material-menu';
import { colors, styles } from '../constants/Theme';

const MenuPopup = ({ refMenu, children, menuItems }) => {
  return (
    <View style={styles.menu}>
      <Menu ref={refMenu} button={children} style={styles.menuItem}>
        {menuItems}
      </Menu>
    </View>
  );
};

export default MenuPopup;
