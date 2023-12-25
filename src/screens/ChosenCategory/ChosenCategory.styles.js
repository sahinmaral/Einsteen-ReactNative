import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
  header: {
    container: {padding: 25, alignItems: 'center'},
    text: {
      fontSize: 28,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    questionCount: {
      marginTop: 10,
      fontSize: 30,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.darkGray,
    },
  },
  instructions: {
    container: {
      alignItems: 'center',
    },
    text: {
      fontSize: 23,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.white,
    },
  },
  buttonGroup: {
    container: {
      width: '100%',
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: 30,
    },
    submitButton: {
      container: {
        ...baseStyles.button.submitButton.container,
        ...theme.shadows.larger,
        flex: 0.45,
      },
      text: {
        ...baseStyles.button.submitButton.text,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
      },
    },
  },
});

export default styles;
