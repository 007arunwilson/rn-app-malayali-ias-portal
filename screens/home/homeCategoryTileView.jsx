/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { color } from '../../config';
import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../../navigation';

const HomeCategoryTileView = (props) => {
  const { categories } = props;

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={`-${category.category_id}`} style={styles.item}>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '40%',
    backgroundColor: '#0A1E42',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    height: 100,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    color: '#EFF0F3',
    fontWeight: 'bold',
  },
});

export default HomeCategoryTileView;
