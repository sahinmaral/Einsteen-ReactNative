import React, {useCallback, useEffect} from 'react';
import BackgroundType from '../../enums/BackgroundType';
import styles from './ResultOfQuiz.styles';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import {useDispatch, useSelector} from 'react-redux';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ResultQuizType from '../../enums/ResultQuizType';
import wonQuizBanner from '../../../assets/images/wonQuizBanner.png';
import lostQuizBanner from '../../../assets/images/lostQuizBanner.png';
import ranOutTimer from '../../../assets/images/ranOutTimer.png';
import {resetCompetitionState} from '../../redux/slices/questionSlice';

function ResultOfQuiz({route}) {
  const {competition} = useSelector(state => state.question);
  const {user} = useSelector(state => state.auth);

  const {resultType, quizInformations} = route.params;

  const navigation = useNavigation();

  const sendScore = async () => {
    return firestore()
      .collection('scores')
      .doc()
      .set({
        userId: user.id,
        date: new Date(),
        quizInformations: {
          totalEstimated: competition.totalEstimated,
          correctQuestionCount: competition.correctQuestion,
          category: quizInformations.category,
          difficult: quizInformations.difficult,
          questionCount: quizInformations.questionCount,
        },
      });
  };

  const renderResultTextByResultType = useCallback(() => {
    if (resultType === ResultQuizType.FinishedSuccessfully) {
      return (
        <Text style={styles.header.text}>
          {competition.correctQuestion} of {competition.totalQuestion} correct
        </Text>
      );
    } else if (resultType === ResultQuizType.RunOutTimer) {
      return (
        <Text style={styles.header.text}>
          You ran out of time. Score won't be saved.
        </Text>
      );
    }
  }, [resultType]);

  const renderResultBannerByResultType = useCallback(() => {
    if (resultType === ResultQuizType.FinishedSuccessfully) {
      if (competition.totalQuestion / 2 >= competition.correctQuestion) {
        return <Image style={styles.banner} source={lostQuizBanner} />;
      } else {
        return <Image style={styles.banner} source={wonQuizBanner} />;
      }
    } else if (resultType === ResultQuizType.RunOutTimer) {
      return <Image style={styles.banner} source={ranOutTimer} />;
    }
  }, [resultType]);

  useEffect(() => {
    //dispatch(resetCompetitionState());

    if (resultType === ResultQuizType.FinishedSuccessfully) {
      sendScore();
    }
  }, [resultType]);

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1}}>
          <View style={styles.header.container}>
            <View style={{flex: 0.2}}>
              <Text style={styles.header.text}>Result</Text>

              {renderResultTextByResultType()}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.8,
              }}>
              {renderResultBannerByResultType()}
            </View>
          </View>

          <View style={styles.buttonGroup.container}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('ChosenCategory', {
                  category: quizInformations.category,
                  selectedOptions: {
                    difficult: quizInformations.difficult,
                    questionCount: quizInformations.questionCount,
                  },
                });
              }}>
              <Text style={styles.buttonGroup.button.text}>Try again ?</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={styles.buttonGroup.button.container}
                onPress={() =>
                  navigation.navigate('Scoreboard', {
                    quizInformations,
                  })
                }>
                <FeatherIcon name={'list'} color={'white'} size={36} />

                <Text style={styles.buttonGroup.button.text}>Scoreboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonGroup.button.container}
                onPress={() => navigation.navigate('Homepage')}>
                <FeatherIcon name={'home'} color={'white'} size={36} />

                <Text style={styles.buttonGroup.button.text}>Go Homepage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default ResultOfQuiz;
