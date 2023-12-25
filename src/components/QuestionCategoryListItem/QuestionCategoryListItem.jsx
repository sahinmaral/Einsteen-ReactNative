import React from 'react';
import {TouchableOpacity, Text, useWindowDimensions} from 'react-native';
import makeStyles from './QuestionCategoryListItem.styles';
import {useNavigation} from '@react-navigation/native';
import he from 'he';
import {useDispatch} from 'react-redux';
import {selectCategoryOfCompetition} from '../../redux/slices/questionSlice';

function QuestionCategoryListItem({category}) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(selectCategoryOfCompetition(category));
        navigation.navigate('ChosenCategory');
      }}>
      <Text style={styles.text}>
        {he.decode(category.value.toLocaleUpperCase('en-US'))}
      </Text>
    </TouchableOpacity>
  );
}

export default QuestionCategoryListItem;
