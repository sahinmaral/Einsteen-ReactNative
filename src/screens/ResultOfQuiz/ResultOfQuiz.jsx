import React, {useCallback, useEffect} from 'react';
import BackgroundType from '../../enums/BackgroundType';
import makeStyles from './ResultOfQuiz.styles';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import Background from '../../components/Background';
import {useSelector} from 'react-redux';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ResultQuizType from '../../enums/ResultQuizType';
import wonQuizBanner from '../../../assets/images/wonQuizBanner.png';
import lostQuizBanner from '../../../assets/images/lostQuizBanner.png';
import ranOutTimer from '../../../assets/images/ranOutTimer.png';
import makeBaseStyles from '../../styles/baseStyles';

function ResultOfQuiz() {
  const {competition} = useSelector(state => state.question);
  const {user} = useSelector(state => state.auth);

  const navigation = useNavigation();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

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
          category: competition.selected.category,
          difficult: competition.selected.difficult,
          questionCount: competition.selected.questionCount,
        },
      });
  };

  const renderResultTextByResultType = useCallback(() => {
    if (competition.result === ResultQuizType.FinishedSuccessfully) {
      return (
        <Text style={[styles.header.text, {fontSize: 20 / fontScale}]}>
          {competition.correctQuestion} of {competition.totalQuestion} correct
        </Text>
      );
    } else if (competition.result === ResultQuizType.RunOutTimer) {
      return (
        <Text style={[styles.header.text, {fontSize: 20 / fontScale}]}>
          You ran out of time. Score won't be saved.
        </Text>
      );
    }
  }, [competition.result]);

  const renderResultBannerByResultType = useCallback(() => {
    if (competition.result === ResultQuizType.FinishedSuccessfully) {
      if (competition.totalQuestion / 2 >= competition.correctQuestion) {
        return <Image style={styles.banner} source={lostQuizBanner} />;
      } else {
        return <Image style={styles.banner} source={wonQuizBanner} />;
      }
    } else if (competition.result === ResultQuizType.RunOutTimer) {
      return <Image style={styles.banner} source={ranOutTimer} />;
    }
  }, [competition.result]);

  useEffect(() => {
    if (competition.result === ResultQuizType.FinishedSuccessfully) {
      sendScore();
    }
  }, [competition.result]);

  return (
    <View style={baseStyles.mainContainer}>
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
                navigation.navigate('ChosenCategory');
              }}>
              <Text style={styles.buttonGroup.button.text}>Try again ?</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={styles.buttonGroup.button.container}
                onPress={() => navigation.navigate('Scoreboard')}>
                <FeatherIcon name={'list'} color={'white'} size={36} />

                <Text style={styles.buttonGroup.button.text}>Scoreboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonGroup.button.container}
                onPress={() => navigation.navigate('Homepage')}>
                <FeatherIcon name={'home'} color={'white'} size={36} />

                <Text style={styles.buttonGroup.button.text}>Homepage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default ResultOfQuiz;
