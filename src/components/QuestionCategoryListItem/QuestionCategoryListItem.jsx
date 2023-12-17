import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './QuestionCategoryListItem.styles';
import {useNavigation} from '@react-navigation/native';
import he from 'he';
import {useDispatch} from 'react-redux';
import {selectCategoryOfCompetition} from '../../redux/slices/questionSlice';

function QuestionCategoryListItem({category}) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(selectCategoryOfCompetition(category));
        navigation.navigate('ChosenCategory');
      }}>
      <Text style={styles.text}>{he.decode(category.value.toUpperCase())}</Text>
    </TouchableOpacity>
  );
}

export default QuestionCategoryListItem;
