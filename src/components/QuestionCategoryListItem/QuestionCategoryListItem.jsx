import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './QuestionCategoryListItem.styles';
import {useNavigation} from '@react-navigation/native';
import he from 'he';

function QuestionCategoryListItem({category, selectedOptions}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ChosenCategory', {
          selectedOptions,
          category,
        })
      }>
      <Text style={styles.text}>{he.decode(category.value.toUpperCase())}</Text>
    </TouchableOpacity>
  );
}

export default QuestionCategoryListItem;
