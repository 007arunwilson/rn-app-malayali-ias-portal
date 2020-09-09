/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { color } from '../../config';

const NoteCard = ({ noteItem, onNoteSelect }) => {
  let { title, description } = noteItem;

  let titleText = '';
  const titleSplitted = title.split(' ');
  if (titleSplitted.length > 6) {
    titleText = `${titleSplitted.slice(0, 4).join(' ')} ...`;
  } else {
    titleText = title;
  }

  let descriptionText = '';
  const descriptionSplitted = description.split(' ');
  if (descriptionSplitted.length > 10) {
    descriptionText = `${descriptionSplitted.slice(0, 14).join(' ')} ...`;
  } else {
    descriptionText = description;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => onNoteSelect(noteItem)}
        style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.description}>{descriptionText}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
  },
  top: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 18,
  },
  description: {
    color: color.text,
    fontSize: 12,
  },
});

export default NoteCard;
