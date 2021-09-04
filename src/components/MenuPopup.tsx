import React from 'react';
import { View } from 'react-native';
import Menu from 'react-native-material-menu';
import { styles } from '../constants/Theme';

const MenuPopup = React.memo(({ refMenu, children, menuItems }: any) => {
  return (
    <View style={styles.menu}>
      <Menu ref={refMenu} button={children} style={styles.menuItem}>
        {menuItems}
      </Menu>
    </View>
  );
});

export default MenuPopup;
