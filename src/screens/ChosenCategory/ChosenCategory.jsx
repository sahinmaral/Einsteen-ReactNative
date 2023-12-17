import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './ChosenCategory.styles';
import {useFocusEffect} from '@react-navigation/native';
import questionMarkImage from '../../../assets/images/questionMark.png';
import {useCallback} from 'react';
import {fetchQuestions} from '../../services/QuizAPIService';
import {useDispatch, useSelector} from 'react-redux';
import {
  setQuestions,
  setTotalQuestionOfCompetition,
} from '../../redux/slices/questionSlice';
import he from 'he';

function ChosenCategory({navigation}) {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const getQuestions = async () => {
    fetchQuestions(
      competition.selected.questionCount,
      competition.selected.difficult,
      competition.selected.category.id,
    )
      .then(response => {
        const responseResult = response.data;
        dispatch(setQuestions(responseResult.results));
        dispatch(
          setTotalQuestionOfCompetition(competition.selected.questionCount),
        );
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
              Category : {he.decode(competition.selected.category.value)}
            </Text>

            <Image
              source={questionMarkImage}
              style={{borderRadius: 50, marginTop: 40}}
            />

            <Text style={styles.header.questionCount}>
              {competition.selected.questionCount} Quiz
            </Text>
          </View>

          <View style={styles.instructions.container}>
            <Text style={styles.instructions.text}>Duration: 2 min each</Text>
            <Text style={styles.instructions.text}>
              Total question: {competition.selected.questionCount}
            </Text>
            <Text style={styles.instructions.text}>
              Difficult: {competition.selected.difficult}
            </Text>
          </View>
        </View>

        <View style={styles.buttonGroup.container}>
          <TouchableOpacity
            style={styles.buttonGroup.submitButton.container}
            onPress={() => navigation.navigate('QuizSolving')}>
            <Text style={styles.buttonGroup.submitButton.text}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonGroup.submitButton.container}
            onPress={() => navigation.navigate('Scoreboard')}>
            <Text style={styles.buttonGroup.submitButton.text}>Scoreboard</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </View>
  );
}

export default ChosenCategory;
