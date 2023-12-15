import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './ChosenCategory.styles';
import {
  useFocusEffect,
} from '@react-navigation/native';
import questionMarkImage from '../../../assets/images/questionMark.png';
import {useCallback} from 'react';
import {fetchQuestions} from '../../services/QuizAPIService';
import {useDispatch} from 'react-redux';
import {
  setQuestions,
  setTotalQuestionOfCompetition,
} from '../../redux/slices/questionSlice';
import he from 'he';

function ChosenCategory({navigation,route}) {

  const {category, selectedOptions} = route.params;

  const dispatch = useDispatch();

  const getQuestions = async () => {
    fetchQuestions(
      selectedOptions.questionCount,
      selectedOptions.difficult,
      category.id,
    )
      .then(response => {
        const responseResult = response.data;
        dispatch(setQuestions(responseResult.results));
        dispatch(setTotalQuestionOfCompetition(selectedOptions.questionCount));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getQuestions();
    }, []),
  );

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton.container}>
              <Text style={styles.goBackButton.text}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.header.container}>
            <Text style={styles.header.text}>
              Category : {he.decode(category.value)}
            </Text>

            <Image
              source={questionMarkImage}
              style={{borderRadius: 50, marginTop: 40}}
            />

            <Text style={styles.header.questionCount}>
              {selectedOptions.questionCount} Quiz
            </Text>
          </View>

          <View style={styles.instructions.container}>
            <Text style={styles.instructions.text}>Duration: 2 min each</Text>
            <Text style={styles.instructions.text}>
              Total question: {selectedOptions.questionCount}
            </Text>
            <Text style={styles.instructions.text}>
              Difficult: {selectedOptions.difficult}
            </Text>
          </View>
        </View>

        <View style={styles.buttonGroup.container}>
          <TouchableOpacity
            style={styles.buttonGroup.submitButton.container}
            onPress={() =>
              navigation.navigate('QuizSolving', {
                quizInformations: {
                  ...selectedOptions,
                  category,
                },
              })
            }>
            <Text style={styles.buttonGroup.submitButton.text}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonGroup.submitButton.container}
            onPress={() =>
              navigation.navigate('Scoreboard', {
                quizInformations: {
                  ...selectedOptions,
                  category,
                },
              })
            }>
            <Text style={styles.buttonGroup.submitButton.text}>Scoreboard</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </View>
  );
}

export default ChosenCategory;
