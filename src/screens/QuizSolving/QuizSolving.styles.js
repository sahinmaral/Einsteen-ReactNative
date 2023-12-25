import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    container: {flex: 0.1, paddingLeft:25},
    text: {
      fontFamily: 'Anton',
      fontSize: 25,
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    questionCount: {
      fontFamily: 'AbeeZee-Regular',
      fontSize: 30,
      marginTop: 10,
      color: theme.colors.darkGray,
    },
  },
  content: {
    container: {flex: 0.5, paddingLeft:25},
    quiz: {
      width: '85%',
      fontFamily: 'ABeeZee-Regular',
      fontSize: 22,
      color: theme.colors.white,
      marginBottom: 40,
    },
    answers: {
      container: {
        gap: 40,
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomColor: theme.colors.darkGray,
        borderBottomWidth: 1,
        paddingBottom: 20,
        width: '80%',
      },
      mark: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 22,
        color: theme.colors.white,
      },
      text: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 22,
        color: theme.colors.white,
      },
    },
  },
  answerResult: {
    container: {flex: 0.1},
    text: {
      normal: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 22,
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
      fontSize: 28,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
    },
  },
});

export default styles;
