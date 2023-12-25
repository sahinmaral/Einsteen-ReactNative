import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
    header: {
      container: {flex: 0.1, paddingHorizontal: 25},
      text: {
        fontFamily: 'Anton',
        fontSize: 25 / fontScale,
        color: theme.colors.white,
        letterSpacing: 2,
      },
      questionCount: {
        fontFamily: 'AbeeZee-Regular',
        fontSize: 30,
        paddingTop: 10,
        color: theme.colors.darkGray,
      },
    },
    content: {
      container: {flex: 0.5, paddingHorizontal: 25},
      quiz: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 22 / fontScale,
        color: theme.colors.white,
        paddingBottom: 10,
      },
      answers: {
        container: {
          gap: 10,
          flexDirection: 'row',
          paddingVertical: 10,
          borderBottomColor: theme.colors.darkGray,
          borderBottomWidth: 1,
        },
        mark: {
          fontFamily: 'ABeeZee-Regular',
          fontSize: 20 / fontScale,
          color: theme.colors.white,
        },
        text: {
          fontFamily: 'ABeeZee-Regular',
          fontSize: 20 / fontScale,
          color: theme.colors.white,
        },
      },
    },
    answerResult: {
      container: {flex: 0.15, paddingHorizontal: 25, justifyContent: 'flex-end'},
      text: {
        normal: {
          fontFamily: 'ABeeZee-Regular',
          fontSize: 20 / fontScale,
        },
        correct: {
          color: theme.colors.lightGreen,
        },
        wrong: {
          color: theme.colors.lightRed,
        },
      },
    },
    timer: {
      container: {
        flex: 0.2,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: theme.colors.darkGray,
        ...theme.shadows.larger,
      },
      remaining: {
        height: 80,
        backgroundColor: theme.colors.darkPurple,
      },
      text: {
        fontSize: 28 / fontScale,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        color: theme.colors.white,
      },
    },
  });

export default makeStyles;
