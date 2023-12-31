import {useEffect, useMemo, useRef, useState} from 'react';
import {View, TouchableOpacity, Text, useWindowDimensions} from 'react-native';
import makeStyles from './QuizSolving.styles';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import ResultQuizType from '../../enums/ResultQuizType';
import AnswerState from '../../enums/AnswerState';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {shuffleArray} from '../../helpers/arrayMethods';
import he from 'he';
import {
  increaseCorrectQuestion,
  increaseTotalEstimated,
  moveToNextQuestion,
  setResultTypeOfCompetition,
} from '../../redux/slices/questionSlice';
import {formatTime} from '../../helpers/timerMethods';
import GoBackButton from '../../components/GoBackButton';
import {openModalByType} from '../../redux/slices/modalSlice';
import ModalType from '../../enums/ModalType';
import makeBaseStyles from '../../styles/baseStyles';

function QuizSolving() {
  const initialQuizTimer = 120;

  const [secondsOfTimer, setSecondsOfTimer] = useState(initialQuizTimer);
  const [answerState, setAnswerState] = useState(AnswerState.NotAnswered);

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const timerIntervalRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {questions, competition} = useSelector(state => state.question);

  const checkCorrectAnswer = selectedAnswer => {
    const correctAnswer = currentQuestion.correct_answer;
    clearInterval(timerIntervalRef.current);

    if (selectedAnswer === he.decode(correctAnswer)) {
      setAnswerState(AnswerState.Correct);
      dispatch(increaseCorrectQuestion());
    } else {
      setAnswerState(AnswerState.Wrong);
    }

    dispatch(increaseTotalEstimated(initialQuizTimer - secondsOfTimer));
  };

  const currentQuestion = useMemo(() => {
    return questions[competition.currentQuestion];
  }, [competition.currentQuestion]);

  const answerStateText = useMemo(() => {
    if (answerState === AnswerState.Correct) {
      return 'Bravo. You answered correct.';
    } else {
      return 'Sorry. You answered wrong.';
    }
  }, [answerState]);

  const answersOfQuestion = useMemo(() => {
    const answers = [...currentQuestion.incorrect_answers];
    answers.push(currentQuestion.correct_answer);
    return shuffleArray(answers);
  }, [currentQuestion]);

  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setSecondsOfTimer(prevSeconds => {
        if (prevSeconds === 0) {
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsOfTimer === 0) {
      dispatch(setResultTypeOfCompetition(ResultQuizType.RunOutTimer));
      navigation.navigate('ResultOfQuiz');
    }
  }, [secondsOfTimer]);

  const prepareToNextQuestion = () => {
    if (competition.currentQuestion !== 9) {
      dispatch(moveToNextQuestion());
      timerIntervalRef.current = setInterval(() => {
        setSecondsOfTimer(prevSeconds => {
          if (prevSeconds === 0) {
            stopTimer();
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
      setSecondsOfTimer(initialQuizTimer);
      setAnswerState(AnswerState.NotAnswered);
    } else {
      dispatch(setResultTypeOfCompetition(ResultQuizType.FinishedSuccessfully));
      navigation.navigate('ResultOfQuiz');
    }
  };

  const widthRemainingViewBySeconds = useMemo(() => {
    return (100 * secondsOfTimer) / initialQuizTimer;
  }, [secondsOfTimer]);

  return (
    <View style={baseStyles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <GoBackButton
          action={() => dispatch(openModalByType(ModalType.VerifyQuitQuiz))}
        />

        <View style={styles.header.container}>
          <Text style={styles.header.text}>
            QUESTION {competition.currentQuestion + 1} TO{' '}
            {competition.totalQuestion}
          </Text>
        </View>

        <View style={styles.content.container}>
          <Text style={styles.content.quiz}>
            {he.decode(currentQuestion.question)}
          </Text>

          {answersOfQuestion.map((answer, index) => {
            return (
              <TouchableOpacity
                disabled={answerState !== AnswerState.NotAnswered}
                onPress={() => checkCorrectAnswer(answer)}
                style={styles.content.answers.container}
                key={index}>
                <Text style={styles.content.answers.mark}>
                  {String.fromCharCode(65 + index)}.
                </Text>
                <Text style={styles.content.answers.text}>
                  {he.decode(answer)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.answerResult.container}>
          {answerState !== AnswerState.NotAnswered && (
            <Text
              style={[
                styles.answerResult.text.normal,
                answerState === AnswerState.Correct
                  ? styles.answerResult.text.correct
                  : styles.answerResult.text.wrong,
              ]}>
              {answerStateText}
            </Text>
          )}
        </View>

        <View style={styles.timer.container}>
          <View
            style={[
              styles.timer.remaining,
              {width: `${widthRemainingViewBySeconds}%`},
            ]}></View>
          <View
            style={{
              position: 'absolute',
              marginTop: 13,
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={prepareToNextQuestion}
              disabled={answerState === AnswerState.NotAnswered}>
              <Text style={styles.timer.text}>
                {answerState === AnswerState.NotAnswered
                  ? `${formatTime(secondsOfTimer)} minutes left`
                  : 'NEXT QUESTION ?'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default QuizSolving;
