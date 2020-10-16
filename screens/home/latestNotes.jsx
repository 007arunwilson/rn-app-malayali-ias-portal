/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as notesApi from '../../services/notes';
import * as notesActions from '../../store/actions/notes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { truncate } from '../../helpers/utils';
import { useDispatch } from 'react-redux';

const Item = (props) => {
  const dispatch = useDispatch();
  const {
    item,
    item: { title },
  } = props;

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            notesActions.navigateToNote({
              noteItem: item,
              navigation: { from: 'home' },
            }),
          );
        }}
        activeOpacity={0.6}
        style={styles.card}>
        <View style={styles.lhs}>
          <View style={styles.iconContainer}>
            <Icon color={'#555E73'} size={64} name="file-document" />
          </View>
        </View>
        <View style={styles.rhs}>
          <Text style={styles.cardTitle}>{truncate(title, { limit: 32 })}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const LatestNotes = (props) => {
  const [data, setData] = useState(null);
  const { packageId } = props;

  React.useEffect(() => {
    const requestOptions = {
      urlParams: { packageId },
      params: { limit: 10, page: 1 },
    };
    notesApi
      .getPackageNotes(requestOptions)
      .then((response) => response.data)
      .then(setData);
  }, [packageId]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Recent Items</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => `-${item.learning_material_id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        snapToInterval={wp(50)}
        decelerationRate={'fast'}
        pagingEnabled
      />
      {/* <Text onPress={onExplorePress} style={styles.exploreText}>
        View all
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 16,
  },
  titleContainer: {
    alignSelf: 'stretch',
    marginLeft: 26,
  },
  title: {
    marginTop: 22,
    paddingBottom: 12,
    fontSize: 16,
    color: '#4D5C76',
    fontWeight: 'bold',
  },
  exploreText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  item: {
    position: 'relative',
    justifyContent: 'center',
    width: wp(50),
    marginHorizontal: 10,
    height: 90,
  },
  card: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#C5C6CA',
    flexDirection: 'row',
  },
  lhs: {},
  iconContainer: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F5FA',
  },
  rhs: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardTitle: {
    color: '#354258',
    fontSize: 12,
  },
});

export default LatestNotes;
