import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  container: {
    justifyContent: 'center',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap:10,
    backgroundColor: theme.colors.veryDarkGrayFaded,
    width: 300,
    height: 370,
  },
  header: {
    fontSize: 40,
    color: theme.colors.white,
    fontFamily: 'ABeeZee-Regular',
  },
  information: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontFamily: 'ABeeZee-Regular',
  },
  form: {
    input: {
      borderBottomColor: theme.colors.darkGrayishRed,
      borderBottomWidth: 1,
      fontSize: 18,
      paddingHorizontal: 0,
      paddingBottom: 5,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.white,
    },
    error: {
      marginTop: 5,
      fontSize: 20,
      color: theme.colors.strongRed,
      fontFamily: 'ABeeZee-Regular',
    },
  },
  submitButton: {
    container: {
      flex: 0.1,
      gap: 10,
      flexDirection: 'row',
      backgroundColor: theme.colors.darkPurple,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 28,
      fontFamily: 'Anton',
      color: theme.colors.white,
    },
  },
});

export default styles;
