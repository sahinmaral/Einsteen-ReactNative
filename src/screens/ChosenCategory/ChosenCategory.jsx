import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './ChosenCategory.styles';

import questionMarkImage from '../../../assets/images/questionMark.png';
import {useState} from 'react';
import {fetchQuestions} from '../../services/QuizAPIService';
import {useDispatch, useSelector} from 'react-redux';
import {
  setQuestions,
  setTotalQuestionOfCompetition,
} from '../../redux/slices/questionSlice';
import he from 'he';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';

function ChosenCategory({navigation}) {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();
  const toast = useToast();

  const [fetchLoading, setFetchLoading] = useState(false);

  const loadingIndicator = useLoadingIndicator(fetchLoading);

  const getQuestions = async () => {
    setFetchLoading(true);

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

        setFetchLoading(false);

        navigation.navigate('QuizSolving');
      })
      .catch(error => {
        setFetchLoading(false);

        switch (error.response.status) {
          case 429:
            toast.show(
              "You are trying to enter quiz several times. It's time to slow down.",
              {
                type: 'warning',
                placement: 'top',
              },
            );
            break;
          case 500:
            toast.show(
              'There is a problem during fetching questions. Please try again later.',
              {
                type: 'warning',
                placement: 'top',
              },
            );
            break;
          default:
            toast.show(error, {
              type: 'warning',
              placement: 'top',
            });
            break;
        }
      });
  };

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
            onPress={getQuestions}>
            <Text style={styles.buttonGroup.submitButton.text}>Start</Text>
            {fetchLoading && (
              <View
                style={{
                  transform: [{rotate: `${loadingIndicator.rotation}deg`}],
                }}>
                <FeatherIcon name="rotate-cw" color={'white'} size={24} />
              </View>
            )}
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
