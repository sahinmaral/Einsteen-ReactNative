import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import makeStyles from './CategoriesOfQuestion.styles';
import QuestionCategoryListItem from '../../components/QuestionCategoryListItem';
import categories from '../../constants/CategoryOfQuestion';
import {useDispatch, useSelector} from 'react-redux';
import ModalType from '../../enums/ModalType';
import {useMemo} from 'react';
import {openModalByType} from '../../redux/slices/modalSlice';
import makeBaseStyles from '../../styles/baseStyles';

function CategoriesOfQuestion() {
  const {user} = useSelector(state => state.auth);
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const sortedCategories = useMemo(() => {
    return categories.sort(function (a, b) {
      var textA = a.value.toUpperCase();
      var textB = b.value.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }, [categories]);

  return (
    <Pressable style={baseStyles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={styles.container}>
          <View style={{paddingVertical: 50}}>
            <Text style={styles.header.username}>
              We are glad to have you {user.firstName}!
            </Text>
            <View style={styles.header.optionsButtonGroup.container}>
              <TouchableOpacity
                style={styles.header.optionsButtonGroup.optionsButton.container}
                onPress={() =>
                  dispatch(openModalByType(ModalType.ChooseDifficult))
                }>
                <Text
                  style={styles.header.optionsButtonGroup.optionsButton.text}>
                  Level: {competition.selected.difficult}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.header.optionsButtonGroup.optionsButton.container}
                onPress={() =>
                  dispatch(openModalByType(ModalType.ChooseQuestionCount))
                }>
                <Text
                  style={styles.header.optionsButtonGroup.optionsButton.text}>
                  Question Count: {competition.selected.questionCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subHeader}>Select Category</Text>
          <FlatList
            data={sortedCategories}
            keyExtractor={item => item.id}
            renderItem={({item: category}) => (
              <QuestionCategoryListItem category={category} />
            )}
          />
        </View>
      </Background>
    </Pressable>
  );
}

export default CategoriesOfQuestion;
