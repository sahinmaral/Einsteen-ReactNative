import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  goBackButton: {
    container: {
      paddingLeft: 15,
      paddingTop: 25,
    },
    text: {
      fontFamily: 'AbeeZee-Regular',
      fontSize: 15,
      color: theme.colors.white,
    },
  },
  header: {
    container: {marginTop: 25, marginLeft: 25},
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
    container: {marginLeft: 25, marginTop: 25},
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
    container: {marginLeft: 25, marginTop: 25},
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
      backgroundColor: theme.colors.darkGray,
      width: '100%',
      height: 80,
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
