import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../constants/Theme';

const Home = () => {
  return (
    <View style={styles.View}>
      <Text style={styles.headerLabel}>This is My Account Page</Text>
    </View>
  );
};

export default Home;
