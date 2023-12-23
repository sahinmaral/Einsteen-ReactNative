import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    text: {
      fontSize: 28,
      fontFamily: 'Anton',
      color: theme.colors.white,
    },
  },
  goBackButton: {
    container: {
      paddingTop: 25,
      paddingLeft: 25,
    },
    text: {
      fontSize: 13,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.white,
    },
  },
  form: {
    container: {gap: 10, padding: 25},
    input: {
      container: {
        borderBottomColor: theme.colors.darkGrayishRed,
        borderBottomWidth: 2,
        borderRadius: 5,
        color: theme.colors.white
      },
    },
    error: {
      marginTop: 5,
      fontSize: 14,
      color: theme.colors.strongRed,
      fontFamily: 'ABeeZee-Regular',
    },
    submitButton: {
      container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.darkPurple,
        justifyContent: 'center',
        alignItems:'center',
        gap:10,
        padding: 10,
      },
      text: {
        fontSize: 28,
        fontFamily: 'Anton',
        color: theme.colors.white,
      },
    },
  },
});

export default styles;
